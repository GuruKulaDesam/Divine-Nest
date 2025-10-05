<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";
  import { writable } from "svelte/store";

  // Extend window type for gapi
  /** @type {any} */ (window).gapi = /** @type {any} */ (window).gapi || {};
  if (typeof window !== "undefined") {
    /** @type {any} */ (window).gapi = /** @type {any} */ (window).gapi || {};
  }

  // Global timeout variable for calendar import
  let googleCalendarTimeout = null;

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 0-based

  const view = writable("month");
  let events = [];
  let selectedDay = null;
  let showModal = false;
  let editing = null;
  // active category filters (by id)
  let categories = [
    { id: "holiday", label: "Holiday", color: "#f97316" },
    { id: "work", label: "Work", color: "#0ea5e9" },
    { id: "personal", label: "Personal", color: "#f59e0b" },
    { id: "family", label: "Family", color: "#10b981" },
  ];
  let activeFilters = categories.map((c) => c.id);

  let form = {
    title: "",
    date: "",
    time: "",
    color: "#0ea5e9",
    description: "",
    category: "personal",
    // recurrence UI: none | weekly | monthly | yearly
    recurringType: "none",
    recurringInterval: 1,
    recurringUntil: "",
    reminderMinutes: 0,
  };

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  function firstWeekday(y, m) {
    return new Date(y, m, 1).getDay();
  }

  function formatISO(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  // Build a curated set of Indian public holidays + Tamil festivals for a given year.
  function makeHolidaysForYear(y) {
    return [
      { title: "Pongal", date: `${y}-01-15`, color: "#f97316", description: "Thai Pongal", category: "holiday" },
      { title: "Republic Day", date: `${y}-01-26`, color: "#ef4444", description: "National holiday", category: "holiday" },
      { title: "Holi", date: `${y}-03-08`, color: "#f97316", category: "holiday" },
      { title: "Good Friday", date: `${y}-04-02`, color: "#0ea5e9", category: "holiday" },
      { title: "Tamil New Year", date: `${y}-04-14`, color: "#10b981", category: "holiday" },
      { title: "Labour Day", date: `${y}-05-01`, color: "#06b6d4", category: "holiday" },
      { title: "Aadi Pooram", date: `${y}-07-21`, color: "#06b6d4", category: "holiday" },
      { title: "Independence Day", date: `${y}-08-15`, color: "#ef4444", category: "holiday" },
      { title: "Ganesh Chaturthi", date: `${y}-09-19`, color: "#f59e0b", category: "holiday" },
      { title: "Navaratri", date: `${y}-10-15`, color: "#f43f5e", category: "holiday" },
      { title: "Gandhi Jayanti", date: `${y}-10-02`, color: "#f59e0b", category: "holiday" },
      { title: "Diwali", date: `${y}-11-04`, color: "#8b5cf6", category: "holiday" },
      { title: "Christmas", date: `${y}-12-25`, color: "#06b6d4", category: "holiday" },
    ];
  }

  // Clear all existing calendar events and seed curated holidays for current and next year.
  onMount(async () => {
    // Request persistent storage (best-effort) so data is less likely to be evicted
    try {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        console.log("Storage persist granted:", granted);
      }
    } catch (e) {
      console.warn("persist request failed", e);
    }

    // One-time seeding guard: only seed if not seeded for this year. This prevents wiping
    // user imports on every mount. If you want to force reseed, clear the localStorage flag.
    const seedFlag = `calendarSeeded_${year}`;
    const seeded = localStorage.getItem(seedFlag);
    if (!seeded) {
      // clear existing and seed curated holidays for current and next year
      await table("calendar").clear();
      const y1 = year;
      const y2 = year + 1;
      const seed = [...makeHolidaysForYear(y1), ...makeHolidaysForYear(y2)];
      await addMany("calendar", seed);
      localStorage.setItem(seedFlag, String(Date.now()));
    }
    events = await getAll("calendar");

    // Deduplicate existing events (same title+date+time). Run once on load.
    try {
      const removed = await dedupeEvents();
      if (removed > 0) {
        events = await getAll("calendar");
        alert(`Removed ${removed} duplicate event(s)`);
      }
    } catch (err) {
      console.error("Failed to dedupe events on load", err);
    }
  });

  // Return a nicer inline style for event pills (gradient + subtle shadow)
  function pillStyle(ev) {
    const c1 = ev.color || "#0ea5e9";
    const c2 = hexToRgba(c1, 0.9);
    const shadow = hexToRgba(c1, 0.18);
    return `background: linear-gradient(135deg, ${c1}, ${c2}); box-shadow: 0 4px 10px ${shadow};`;
  }

  // Utilities for recurrence
  function parseISODate(iso) {
    const [y, m, d] = (iso || "").split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }

  function dateToISO(dt) {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }

  function occursOn(ev, iso) {
    if (!ev) return false;
    if (ev.date === iso) return true;
    if (!ev.recurring) return false;
    const start = parseISODate(ev.date);
    const target = parseISODate(iso);
    if (ev.recurring.until) {
      const until = parseISODate(ev.recurring.until);
      if (target > until) return false;
    }
    if (target < start) return false;
    const freq = ev.recurring.freq;
    const interval = ev.recurring.interval || 1;
    if (freq === "yearly") {
      return start.getDate() === target.getDate() && start.getMonth() === target.getMonth();
    }
    if (freq === "monthly") {
      return start.getDate() === target.getDate();
    }
    if (freq === "weekly") {
      const diffDays = Math.floor((target.getTime() - start.getTime()) / 86400000);
      if (target.getDay() !== start.getDay()) return false;
      return Math.floor(diffDays / 7) % interval === 0;
    }
    return false;
  }

  // compute occurrences for the upcoming window
  function getOccurrencesBetween(ev, startDate, endDate) {
    const instances = [];
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    for (let d = new Date(sd); d <= ed; d.setDate(d.getDate() + 1)) {
      const iso = dateToISO(d);
      if (occursOn(ev, iso)) instances.push({ date: iso, event: ev });
    }
    return instances;
  }

  // --- Google Calendar sync helpers (UI + stubs) ---
  let showSyncModal = false;
  let oauthToken = "";
  let isAuthenticated = false;
  let gapiLoaded = false;
  let isLoading = false;
  let authError = "";
  let gapiLoadTimeout;
  let gapiLoadAttempted = false; // Track if we've attempted to load GAPI

  // Helper function to safely access gapi
  function isGapiAvailable() {
    return /** @type {any} */ (window).gapi && /** @type {any} */ (window).gapi.auth2;
  }

  // Clear any existing timeout
  function clearGapiTimeout() {
    if (gapiLoadTimeout) {
      clearTimeout(gapiLoadTimeout);
      gapiLoadTimeout = null;
    }
  }

  // Attempt to fetch events from Google Calendar using OAuth or pasted token.
  async function importFromGoogle() {
    console.log("Starting Google Calendar import...");
    isLoading = true;
    authError = "";
    showSyncModal = true; // Ensure modal stays open

    if (!gapiLoaded && !gapiLoadAttempted) {
      console.log("GAPI not loaded, loading script...");
      gapiLoadAttempted = true; // Mark that we've attempted to load
      // Load Google API client only when needed
      if (!(/** @type {any} */ (window).gapi)) {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";

        // Set a timeout for API loading (15 seconds)
        gapiLoadTimeout = setTimeout(() => {
          console.error("Google API loading timeout");
          authError = "Google API loading timed out. Please check your internet connection and try again.";
          isLoading = false;
          gapiLoaded = false; // Explicitly set to false to show fallback UI
          gapiLoadAttempted = true; // Keep as attempted
        }, 15000);

        script.onload = () => {
          clearGapiTimeout();
          console.log("GAPI script loaded, initializing...");
          /** @type {any} */ (window).gapi.load("client:auth2", () => {
            // Initialize with your client ID (user needs to replace)
            /** @type {any} */ (window).gapi.client
              .init({
                apiKey: "AIzaSyBhBN7BX9v36dqp-sGClHNc4ngoTMUeIJQ", // Replace with your API key from Google Cloud Console
                clientId: "472322435541-1f0f7cje8gicrlamqar1p5p3agbtd0rd.apps.googleusercontent.com", // Replace with your OAuth client ID
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar.readonly",
              })
              .then(() => {
                console.log("GAPI initialized successfully");
                gapiLoaded = true;
                isAuthenticated = /** @type {any} */ (window).gapi.auth2.getAuthInstance().isSignedIn.get();
                console.log("Initial auth state:", isAuthenticated);
                isLoading = false;
                // Don't auto-proceed, let user click again
              })
              .catch((error) => {
                console.error("GAPI initialization failed:", error);
                authError = "Failed to initialize Google API. Please check your API key and client ID configuration.";
                isLoading = false;
                gapiLoaded = false; // Ensure fallback UI is shown
                gapiLoadAttempted = true; // Mark as attempted
              });
          });
        };
        script.onerror = () => {
          clearGapiTimeout();
          console.error("Failed to load Google API script");
          authError = "Failed to load Google API script. Check your internet connection.";
          isLoading = false;
          gapiLoaded = false; // Ensure fallback UI is shown
          gapiLoadAttempted = true; // Mark as attempted
        };
        document.head.appendChild(script);
      }
    } else {
      console.log("GAPI already loaded, proceeding with sync...");
      proceedWithSync();
    }
  }

  function proceedWithSync() {
    console.log("Proceeding with sync...");
    isLoading = true;
    if (/** @type {any} */ (window).gapi && /** @type {any} */ (window).gapi.auth2) {
      console.log("GAPI available, checking authentication...");
      const auth = /** @type {any} */ (window).gapi.auth2.getAuthInstance();
      if (!auth.isSignedIn.get()) {
        console.log("User not signed in, initiating sign in...");
        auth
          .signIn({
            prompt: "select_account", // Force account selection
          })
          .then(() => {
            console.log("Sign in successful, fetching events...");
            isAuthenticated = true;
            fetchGoogleEvents();
          })
          .catch((error) => {
            console.error("Sign in failed:", error);
            authError = "Google sign-in failed. Please try again or use an OAuth token instead.";
            isLoading = false;
          });
      } else {
        console.log("User already signed in, fetching events...");
        isAuthenticated = true;
        fetchGoogleEvents();
      }
    } else {
      console.log("GAPI not available, falling back to OAuth token...");
      // Fallback to pasted token
      if (!oauthToken) {
        authError = "Please paste an OAuth access token or set up OAuth.";
        isLoading = false;
        return;
      }
      fetchGoogleEvents(oauthToken);
    }
  }

  async function fetchGoogleEvents(token) {
    console.log("Fetching Google events...", { tokenProvided: !!token });
    isLoading = true;
    authError = "";

    // Set a timeout to prevent infinite loading
    googleCalendarTimeout = setTimeout(() => {
      console.error("Google Calendar import timed out");
      authError = "Import timed out after 30 seconds. Please check your internet connection and try again.";
      isLoading = false;
      googleCalendarTimeout = null;
    }, 30000); // 30 second timeout

    try {
      let res;
      if (token) {
        console.log("Using OAuth token to fetch events...");
        res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=250&singleEvents=true&orderBy=startTime", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("OAuth token API response status:", res.status);

        // Check for common HTTP errors
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Invalid or expired OAuth token. Please get a new token from Google OAuth Playground.");
          } else if (res.status === 403) {
            throw new Error("Access denied. Please check that your token has Calendar API permissions.");
          } else if (res.status === 404) {
            throw new Error("Calendar not found. Please check your Google account.");
          } else if (res.status >= 500) {
            throw new Error("Google Calendar API server error. Please try again later.");
          } else {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
        }
      } else {
        console.log("Using GAPI client to fetch events...");
        try {
          res = await /** @type {any} */ (window).gapi.client.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 250,
            orderBy: "startTime",
          });
          console.log("GAPI client response received");
        } catch (gapiError) {
          console.error("GAPI client error:", gapiError);
          throw new Error(`Google API Error: ${gapiError.result?.error?.message || gapiError.message || "Authentication or API access failed"}`);
        }
      }

      clearTimeout(googleCalendarTimeout);
      googleCalendarTimeout = null;
      console.log("API response received:", res);

      const data = token ? await res.json() : res.result;
      console.log("Parsed data:", data);

      if (token && !res.ok) {
        throw new Error(data.error?.message || `HTTP ${res.status}: ${res.statusText}`);
      }

      const items = (data.items || []).map((ev) => ({
        title: ev.summary || "Event",
        date: ev.start?.date || ev.start?.dateTime?.split("T")[0] || "",
        time: ev.start?.dateTime ? ev.start.dateTime.split("T")[1]?.slice(0, 5) : ev.start?.date ? "" : "",
        color: "#0ea5e9",
        description: ev.description || "",
      }));

      console.log(`Parsed ${items.length} events:`, items);

      if (items.length) {
        console.log("Saving events to database...");
        await addMany("calendar", items);
        console.log("Events saved successfully");
      }

      events = await getAll("calendar");
      console.log(`Total events in database: ${events.length}`);

      isLoading = false;
      showSyncModal = false;
      authError = "";

      alert(`✅ Successfully imported ${items.length} events from Google Calendar!`);
    } catch (err) {
      clearTimeout(googleCalendarTimeout);
      googleCalendarTimeout = null;
      console.error("Failed to import from Google Calendar:", err);
      authError = `Failed to import from Google Calendar: ${err.message || "Unknown error"}`;
      isLoading = false;
    }
  }

  // Import simple ICS file (naive parser) — extracts VEVENT SUMMARY and DTSTART
  function handleIcsFile(e) {
    const input = /** @type {HTMLInputElement} */ (e.target);
    const f = input.files && input.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const text = String(reader.result || "");
      const vevents = text.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
      const parsed = vevents.map((v) => {
        const summary = (v.match(/SUMMARY:(.*)/) || [null, ""])[1].trim();
        const dt = (v.match(/DTSTART(?:;[^:]*)?:(.*)/) || [null, ""])[1].trim();
        const date = dt ? dt.slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") : "";
        return { title: summary || "Event", date, time: "", color: "#0ea5e9" };
      });
      if (parsed.length) await addMany("calendar", parsed);
      events = await getAll("calendar");
      alert(`Imported ${parsed.length} events from ICS.`);
    };
    reader.readAsText(f);
  }

  function eventsFor(d) {
    const iso = formatISO(year, month, d);
    return events
      .filter((e) => {
        const cat = e.category || "personal";
        if (!activeFilters.includes(cat)) return false;
        return occursOn(e, iso);
      })
      .sort((a, b) => (a.time ? -1 : 0));
  }

  // recent upcoming instances (next 30 days), respecting filters and recurrences
  function upcomingInstances() {
    const out = [];
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 30);
    for (const ev of events) {
      const cat = ev.category || "personal";
      if (!activeFilters.includes(cat)) continue;
      const occ = getOccurrencesBetween(ev, start, end);
      for (const o of occ) out.push({ ...o, ev });
    }
    // also include non-recurring events that fall in the window
    for (const ev of events) {
      const cat = ev.category || "personal";
      if (!activeFilters.includes(cat)) continue;
      if (!ev.recurring) {
        const d = parseISODate(ev.date);
        if (d >= start && d <= end) out.push({ date: ev.date, event: ev });
      }
    }
    out.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
    return out.slice(0, 6);
  }

  // convert hex color to rgba string with given alpha
  function hexToRgba(hex, alpha = 1) {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    const h = hex.replace("#", "");
    const bigint = parseInt(
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h,
      16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function prev() {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }
  function next() {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  function openAdd(d) {
    selectedDay = d;
    showModal = true;
    editing = null;
    form = {
      title: "",
      date: formatISO(year, month, d),
      time: "",
      color: "#0ea5e9",
      description: "",
      category: "personal",
      recurringType: "none",
      recurringInterval: 1,
      recurringUntil: "",
      reminderMinutes: 0,
    };
  }

  function openEdit(ev) {
    editing = ev.id;
    form = {
      title: ev.title || "",
      date: ev.date,
      time: ev.time || "",
      color: ev.color || "#0ea5e9",
      description: ev.description || "",
      category: ev.category || "personal",
      recurringType: ev.recurring ? ev.recurring.freq : "none",
      recurringInterval: ev.recurring ? ev.recurring.interval || 1 : 1,
      recurringUntil: ev.recurring ? ev.recurring.until || "" : "",
      reminderMinutes: ev.reminderMinutes || 0,
    };
    showModal = true;
  }

  async function save() {
    // Simple validation
    if (!form.title || !form.date) {
      alert("Please provide a title and date");
      return;
    }
    try {
      const recurring = form.recurringType && form.recurringType !== "none" ? { freq: form.recurringType, interval: Number(form.recurringInterval || 1), until: form.recurringUntil || null } : null;
      const payload = {
        title: String(form.title),
        date: String(form.date),
        time: form.time || "",
        color: form.color || "#0ea5e9",
        description: form.description || "",
        category: form.category || "personal",
        recurring,
        reminderMinutes: Number(form.reminderMinutes || 0),
      };
      console.log("Saving event payload:", payload, "editing:", editing);
      if (editing) {
        const updated = await table("calendar").update(editing, payload);
        console.log("Update result:", updated);
      } else {
        const id = await table("calendar").add(payload);
        console.log("Added event id:", id);
      }
      events = await getAll("calendar");
      showModal = false;
      editing = null;
      alert("Event saved");
    } catch (err) {
      console.error("Failed to save event", err);
      alert("Failed to save event — see console");
    }
  }

  async function remove(id) {
    await table("calendar").delete(id);
    events = await getAll("calendar");
  }

  // Remove duplicate events (same title + date + time). Returns number removed.
  async function dedupeEvents() {
    const all = await getAll("calendar");
    const map = new Map();
    const toDelete = [];
    for (const ev of all) {
      const key = `${(ev.title || "").trim().toLowerCase()}|${ev.date || ""}|${ev.time || ""}`;
      if (map.has(key)) {
        // Duplicate — prefer the first inserted (keep map.get(key))
        toDelete.push(ev.id);
      } else {
        map.set(key, ev.id);
      }
    }
    for (const id of toDelete) await table("calendar").delete(id);
    return toDelete.length;
  }
</script>

<div class="modern-calendar">
  <!-- Action Bar -->
  <div class="action-bar backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 shadow-xl">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-4">
        <div class="text-lg font-semibold text-white flex items-center gap-2">
          <span class="text-blue-400">📅</span>
          Calendar Actions
        </div>
        <div class="flex items-center gap-2 text-sm text-white/70">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {events.length} events loaded
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-300"
          on:click={() => {
            showSyncModal = true;
            importFromGoogle();
          }}
        >
          <span class="text-blue-400">🔄</span> Google Sync
        </button>
        <button
          class="btn btn-secondary btn-sm shadow-lg hover:shadow-xl transition-all duration-300"
          on:click={async () => {
            const all = await getAll("calendar");
            const data = JSON.stringify(all, null, 2);
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `calendar-export-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <span class="text-green-400">💾</span> Export
        </button>
        <label class="btn btn-secondary btn-sm cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
          <span class="text-purple-400">📁</span> Import
          <input
            type="file"
            accept="application/json,.ics"
            class="hidden"
            on:change={async (e) => {
              const input = /** @type {HTMLInputElement} */ (e.target);
              const f = input.files && input.files[0];
              if (!f) return;
              if (f.name.endsWith(".ics")) {
                handleIcsFile(e);
              } else {
                const text = await f.text();
                try {
                  const parsed = JSON.parse(text);
                  if (Array.isArray(parsed)) {
                    await addMany("calendar", parsed);
                    events = await getAll("calendar");
                    alert("Imported successfully");
                  }
                } catch (err) {
                  alert("Failed to import JSON");
                  console.error(err);
                }
              }
            }}
          />
        </label>
        <button
          class="btn btn-warning btn-sm shadow-lg hover:shadow-xl transition-all duration-300"
          on:click={async () => {
            const removed = await dedupeEvents();
            events = await getAll("calendar");
            alert(`Removed ${removed} duplicate event(s)`);
          }}
        >
          <span class="text-orange-400">🧹</span> Clean
        </button>
      </div>
    </div>
  </div>

  <div class="calendar-layout grid grid-cols-12 gap-6">
    <!-- Left Sidebar - Mini Calendar & Upcoming -->
    <aside class="col-span-4 p-4 bg-base-200/80 backdrop-blur-lg rounded-lg shadow-sm border border-white/20">
      <div class="flex items-center justify-between mb-4">
        <div class="font-semibold text-white">{new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}</div>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm text-white/80 hover:text-white hover:bg-white/10" on:click={prev} aria-label="Previous month">◀</button>
          <button class="btn btn-ghost btn-sm text-white/80 hover:text-white hover:bg-white/10" on:click={next} aria-label="Next month">▶</button>
        </div>
      </div>
      <div class="mini-month grid grid-cols-7 gap-1 text-xs text-center text-white/70">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as wd}
          <div class="text-white/50">{wd}</div>
        {/each}
        {#each Array(firstWeekday(year, month)).fill(0) as _}
          <div></div>
        {/each}
        {#each Array(daysInMonth(year, month)) as _, i}
          <div
            class="py-1 px-1 rounded hover:bg-white/10 cursor-pointer text-white/80 hover:text-white transition-colors"
            role="button"
            tabindex="0"
            on:click={() => {
              openAdd(i + 1);
            }}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openAdd(i + 1);
              }
            }}
          >
            {i + 1}
          </div>
        {/each}
      </div>
      <div class="mt-4">
        <h4 class="font-medium mb-2 text-white">Upcoming</h4>
        <div class="space-y-2 text-sm">
          {#each upcomingInstances() as inst}
            <div class="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <div class="w-2 h-2 rounded-full" style="background:{inst.event.color}"></div>
              <div class="truncate text-white/80">{inst.event.title} <span class="text-xs text-white/60">{inst.date}{inst.event.time ? ` • ${inst.event.time}` : ""}</span></div>
            </div>
          {/each}
        </div>
      </div>
    </aside>

    <!-- Main Calendar - Full Width -->
    <main class="col-span-8 p-6 calendar-container">
      <div class="flex items-center justify-between mb-6">
        <div class="text-2xl font-bold calendar-header">Calendar</div>
        <div class="flex items-center gap-3">
          <button class="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-300" on:click={() => (showModal = true)}>
            <span class="text-green-400">+</span> Add Event
          </button>
          <div class="text-sm text-white/70 font-medium">Month view — modern redesign</div>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-4 p-4">
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as wd, idx}
          <div class="text-xs font-medium text-white/70" style="color: var(--tw-color-slate-600);">
            <span class="inline-block px-2 py-1 rounded" style="background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0));">{wd}</span>
          </div>
        {/each}

        {#each Array(firstWeekday(year, month)).fill(0) as _}
          <div></div>
        {/each}

        {#each Array(daysInMonth(year, month)) as _, i}
          {@const dayEvents = eventsFor(i + 1)}
          <!-- Use event color for a colorful border per day; fallback to neutral border -->
          <div
            class="p-3 min-h-[100px] day-cell"
            data-has-events={dayEvents.length > 0}
            style="
              --day-border: {dayEvents.length ? hexToRgba(dayEvents[0].color || '#6366f1', 0.6) : 'rgba(255,255,255,0.1)'};
              --day-border-alt: {dayEvents.length ? hexToRgba(dayEvents[0].color || '#8b5cf6', 0.4) : 'rgba(255,255,255,0.05)'};
              --event-color: {dayEvents.length ? dayEvents[0].color || '#6366f1' : '#6366f1'};
              --event-color-alt: {dayEvents.length ? hexToRgba(dayEvents[0].color || '#8b5cf6', 0.8) : '#8b5cf6'};
            "
          >
            <div class="flex items-start justify-between">
              <div class="font-semibold text-lg calendar-header">{i + 1}</div>
              <button class="btn btn-ghost btn-xs text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-full" on:click={() => openAdd(i + 1)} aria-label="Add event">
                <span class="text-green-400">+</span>
              </button>
            </div>
            <div class="mt-2 space-y-1">
              {#each dayEvents.slice(0, 3) as ev}
                <div
                  class="cursor-pointer event-indicator"
                  on:click={() => openEdit(ev)}
                  role="button"
                  tabindex="0"
                  on:keydown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openEdit(ev);
                    }
                  }}
                >
                  <span class="inline-block rounded-full px-2 py-0.5 text-xs text-white font-medium shadow-sm" style={pillStyle(ev)}>{ev.time ? ev.time + " • " : ""}{ev.title}</span>
                </div>
              {/each}
              {#if dayEvents.length > 3}
                <div class="text-xs text-white/70 font-medium">+{dayEvents.length - 3} more</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </main>
  </div>

  {#if showModal}
    <div class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-base-100 rounded-lg p-6 w-[640px]">
        <h3 class="text-lg font-semibold mb-3">{editing ? "Edit event" : "Add event"}</h3>
        <div class="grid grid-cols-2 gap-3">
          <label class="text-sm"
            >Title
            <input class="input" placeholder="Title" bind:value={form.title} />
          </label>
          <label class="text-sm"
            >Date
            <input type="date" class="input" bind:value={form.date} />
          </label>
          <label class="text-sm"
            >Time
            <input type="time" class="input" bind:value={form.time} />
          </label>
          <label class="text-sm"
            >Color
            <input type="color" class="input p-0" bind:value={form.color} />
          </label>
          <label class="text-sm"
            >Category
            <select class="input" bind:value={form.category}>
              {#each categories as c}
                <option value={c.id}>{c.label}</option>
              {/each}
            </select>
          </label>
          <label class="text-sm"
            >Recurrence
            <select class="input" bind:value={form.recurringType}>
              <option value="none">No recurrence</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <label class="text-sm"
            >Interval
            <input type="number" min="1" class="input" bind:value={form.recurringInterval} />
          </label>
          <label class="text-sm"
            >Until
            <input type="date" class="input" bind:value={form.recurringUntil} />
          </label>
          <label class="col-span-2 text-sm"
            >Description
            <textarea class="col-span-2 textarea" rows="3" placeholder="Description" bind:value={form.description}></textarea>
          </label>
        </div>
        <div class="mt-4 flex gap-2 justify-end">
          <button class="btn btn-ghost" on:click={() => (showModal = false)}>Cancel</button>
          <button class="btn" on:click={save}>Save</button>
        </div>
      </div>
    </div>
  {/if}

  {#if showSyncModal}
    <div class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-base-100 rounded-lg p-6 w-[640px] max-h-[80vh] overflow-y-auto">
        <h3 class="text-lg font-semibold mb-3">Sync with Google Calendar</h3>

        {#if authError}
          <div class="alert alert-error mb-4">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold">Error:</p>
              <p class="text-sm">{authError}</p>
            </div>
          </div>
        {/if}

        <div class="alert alert-info mb-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">How it works:</p>
            <ul class="text-sm mt-1">
              <li>• Click "Connect to Google" to authenticate</li>
              <li>• Select your Google account when prompted</li>
              <li>• Grant calendar access permission</li>
              <li>• Your events will be imported automatically</li>
            </ul>
          </div>
        </div>

        {#if !gapiLoaded && !gapiLoadAttempted}
          <div class="text-sm mb-3 text-center">
            <div class="loading loading-spinner loading-lg text-primary mb-2"></div>
            <p>Loading Google API...</p>
          </div>
        {:else if !gapiLoaded && gapiLoadAttempted}
          <!-- Show error state when loading was attempted but failed -->
          <div class="text-sm mb-3">
            <div class="alert alert-error mb-3">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <p class="font-semibold">Google API Loading Failed</p>
                <p class="text-sm">{authError || "Unable to load Google Calendar API. Try using the OAuth token method instead."}</p>
                <button
                  class="btn btn-sm btn-outline mt-2"
                  on:click={() => {
                    gapiLoadAttempted = false;
                    authError = "";
                    importFromGoogle();
                  }}
                >
                  🔄 Retry Loading API
                </button>
              </div>
            </div>
          </div>
        {:else if isGapiAvailable()}
          <div class="text-sm mb-3">
            {#if isAuthenticated}
              <div class="alert alert-success mb-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 0016 0zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                You are signed in. Click Import to sync events.
              </div>
            {:else}
              Click "Connect to Google" to sign in and sync.
            {/if}
          </div>
          <div class="alert alert-warning mb-4">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold">Setup Required:</p>
              <ul class="text-sm mt-1">
                <li>• Create a Google Cloud Project</li>
                <li>• Enable Google Calendar API</li>
                <li>• Create OAuth 2.0 credentials</li>
                <li>• Replace the API keys in the code</li>
              </ul>
            </div>
          </div>
        {:else}
          <div class="text-sm mb-3">
            <strong>Option 1:</strong> Set up Google OAuth (requires API keys)<br />
            <strong>Option 2:</strong> Use OAuth access token (recommended for testing)
          </div>
          <div class="alert alert-info mb-4">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold">How to get OAuth token:</p>
              <ul class="text-sm mt-1">
                <li>• Go to <a href="https://developers.google.com/oauthplayground" target="_blank" class="link">Google OAuth Playground</a></li>
                <li>• Select "Google Calendar API v3"</li>
                <li>• Authorize and exchange for access token</li>
                <li>• Paste the token below</li>
              </ul>
            </div>
          </div>
          <input class="input w-full mb-3" placeholder="Paste OAuth access token here" bind:value={oauthToken} />
        {/if}

        <div class="flex gap-2 justify-end">
          <button
            class="btn btn-ghost"
            on:click={() => {
              showSyncModal = false;
              authError = "";
              isLoading = false;
              clearGapiTimeout(); // Clear any pending timeouts
              // Also clear any fetch timeouts if they exist
              if (googleCalendarTimeout) {
                clearTimeout(googleCalendarTimeout);
                googleCalendarTimeout = null;
              }
            }}>Cancel</button
          >
          {#if isGapiAvailable() && isAuthenticated}
            <button class="btn btn-primary" on:click={fetchGoogleEvents} disabled={isLoading}>
              {#if isLoading}
                <div class="loading loading-spinner loading-sm"></div>
                Importing...
              {:else}
                Import Events
              {/if}
            </button>
          {:else if isGapiAvailable()}
            <button class="btn btn-primary" on:click={proceedWithSync} disabled={isLoading}>
              {#if isLoading}
                <div class="loading loading-spinner loading-sm"></div>
                Connecting...
              {:else}
                Connect to Google
              {/if}
            </button>
          {:else}
            <button
              class="btn btn-primary"
              on:click={() => {
                if (!oauthToken) {
                  authError = "Please paste an OAuth access token.";
                } else {
                  proceedWithSync();
                }
              }}
              disabled={isLoading}
            >
              {#if isLoading}
                <div class="loading loading-spinner loading-sm"></div>
                Importing...
              {:else}
                Import with Token
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Use CSS variable set on day-cell to provide a colored border per-day */
  .day-cell {
    border-width: 2px;
    border-style: solid;
    border-color: var(--day-border, rgba(255, 255, 255, 0.1));
    border-radius: 20px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .day-cell:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04));
  }

  /* Colorful borders for days with events */
  .day-cell[data-has-events="true"] {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-image: linear-gradient(45deg, var(--day-border, #6366f1), var(--day-border-alt, #8b5cf6), var(--day-border, #ec4899)) 1;
    animation: borderGlow 2s ease-in-out infinite alternate;
  }

  @keyframes borderGlow {
    0% {
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
    }
    100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }
  }

  /* Glassmorphism calendar container with colorful gradient border */
  .calendar-container {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.08);
    border: 2px solid transparent;
    border-image: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) 1;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  /* Action bar styling */
  .action-bar {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  /* Modern typography */
  .calendar-header {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Colorful event indicators */
  .event-indicator {
    background: linear-gradient(135deg, var(--event-color, #6366f1), var(--event-color-alt, #8b5cf6));
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
</style>
