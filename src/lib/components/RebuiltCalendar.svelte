<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";

  // Month state (0-based month)
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  let events = [];
  let selectedDay = null;
  let modalOpen = false;
  let editingId = null;

  let form = { title: "", date: "", time: "", color: "#0ea5e9", notes: "" };

  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function iso(y, m, d) {
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  }

  // seed 50 realistic-ish events
  const sample = Array.from({ length: 50 }, (_, i) => {
    const d = (i % 28) + 1;
    const hour = 8 + (i % 10);
    const m = new Date();
    return { title: `Event ${i + 1}`, date: iso(year, month, d), time: `${pad(hour)}:00`, color: ["#0ea5e9", "#f97316", "#10b981", "#8b5cf6"][i % 4], notes: `Generated event ${i + 1}` };
  });

  onMount(async () => {
    events = await getAll("calendar");
    if (!events || events.length === 0) {
      await addMany("calendar", sample);
      events = await getAll("calendar");
    }
  });

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }
  function firstDayWeek(y, m) {
    return new Date(y, m, 1).getDay();
  }

  function eventsFor(d) {
    return events.filter((e) => e.date === iso(year, month, d));
  }

  function prev() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  }
  function next() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  function openAdd(day) {
    selectedDay = day;
    modalOpen = true;
    editingId = null;
    form = { title: "", date: iso(year, month, day), time: "", color: "#0ea5e9", notes: "" };
  }
  function openEdit(ev) {
    editingId = ev.id;
    modalOpen = true;
    form = { title: ev.title, date: ev.date, time: ev.time || "", color: ev.color || "#0ea5e9", notes: ev.notes || "" };
  }

  async function save() {
    const payload = { title: form.title, date: form.date, time: form.time, color: form.color, notes: form.notes };
    if (editingId) {
      await table("calendar").update(editingId, payload);
    } else {
      await table("calendar").add(payload);
    }
    events = await getAll("calendar");
    modalOpen = false;
    editingId = null;
  }

  async function remove(id) {
    await table("calendar").delete(id);
    events = await getAll("calendar");
  }
</script>

<div class="rebuilt-calendar grid grid-cols-12 gap-6">
  <aside class="col-span-3 bg-base-200 rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <div class="font-semibold">{new Date(year, month).toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm" on:click={prev} aria-label="Previous month">◀</button>
        <button class="btn btn-ghost btn-sm" on:click={next} aria-label="Next month">▶</button>
      </div>
    </div>
    <div class="mini-month grid grid-cols-7 gap-1 text-xs text-center">
      {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as wd}
        <div class="text-base-content/60">{wd}</div>
      {/each}
      {#each Array(firstDayWeek(year, month)).fill(0) as _}
        <div></div>
      {/each}
      {#each Array(daysInMonth(year, month)) as _, i}
        <div class="py-1 px-1 rounded hover:bg-base-300 cursor-pointer" on:click={() => openAdd(i + 1)}>{i + 1}</div>
      {/each}
    </div>
    <div class="mt-4">
      <h4 class="font-medium mb-2">Upcoming</h4>
      <ul class="space-y-2 text-sm">
        {#each events
          .slice()
          .sort((a, b) => (a.date > b.date ? 1 : -1))
          .slice(0, 6) as ev}
          <li class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" style="background:{ev.color}"></span>
            <span class="truncate">{ev.date} {ev.time ? `• ${ev.time}` : ""} — {ev.title}</span>
          </li>
        {/each}
      </ul>
    </div>
  </aside>

  <main class="col-span-7 bg-base-100 rounded-lg p-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-semibold">Calendar</h3>
      <div class="text-sm text-base-content/60">Month view — rebuilt design</div>
    </div>

    <div class="grid grid-cols-7 gap-3">
      {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as wd}
        <div class="text-xs text-base-content/60">{wd}</div>
      {/each}

      {#each Array(firstDayWeek(year, month)).fill(0) as _}
        <div></div>
      {/each}

      {#each Array(daysInMonth(year, month)) as _, i}
        <div class="p-2 border rounded-lg min-h-[80px]" on:click={() => (selectedDay = i + 1)}>
          <div class="flex items-start justify-between">
            <div class="font-medium">{i + 1}</div>
            <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => openAdd(i + 1)}>+</button>
          </div>
          <div class="mt-2 space-y-1">
            {#each eventsFor(i + 1).slice(0, 3) as ev}
              <div class="flex items-center gap-2 cursor-pointer" on:click|stopPropagation={() => openEdit(ev)}>
                <div class="w-2 h-2 rounded-full" style="background:{ev.color}"></div>
                <div class="truncate text-sm">{ev.time ? ev.time + " • " : ""}{ev.title}</div>
              </div>
            {/each}
            {#if eventsFor(i + 1).length > 3}
              <div class="text-xs text-base-content/60">+{eventsFor(i + 1).length - 3} more</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </main>

  <aside class="col-span-2 bg-base-200 rounded-lg p-4">
    <h4 class="font-medium mb-2">Details</h4>
    {#if selectedDay}
      <div class="text-sm">Events for {iso(year, month, selectedDay)}</div>
      <div class="mt-3 space-y-2">
        {#each eventsFor(selectedDay) as ev}
          <div class="p-2 rounded bg-base-100/80 flex items-center justify-between">
            <div>
              <div class="font-medium" style="color:{ev.color}">{ev.title}</div>
              <div class="text-xs text-base-content/60">{ev.time}{ev.notes ? ` • ${ev.notes}` : ""}</div>
            </div>
            <div class="flex gap-1">
              <button class="btn btn-ghost btn-xs" on:click={() => openEdit(ev)}>Edit</button>
              <button class="btn btn-ghost btn-xs" on:click={() => remove(ev.id)}>Delete</button>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-sm text-base-content/60">Select a day to see events.</div>
    {/if}
  </aside>

  {#if modalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-base-100 rounded-lg p-6 w-[640px]">
        <h3 class="text-lg font-semibold mb-3">{editingId ? "Edit" : "Add"} event</h3>
        <div class="grid grid-cols-2 gap-3">
          <input class="input" placeholder="Title" bind:value={form.title} />
          <input type="date" class="input" bind:value={form.date} />
          <input type="time" class="input" bind:value={form.time} />
          <input type="color" class="input p-0" bind:value={form.color} />
          <textarea class="col-span-2 textarea" rows="3" placeholder="Notes" bind:value={form.notes}></textarea>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button
            class="btn btn-ghost"
            on:click={() => {
              modalOpen = false;
              editingId = null;
            }}>Cancel</button
          >
          <button class="btn" on:click={save}>Save</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .mini-month div {
    padding: 2px 4px;
  }
</style>
