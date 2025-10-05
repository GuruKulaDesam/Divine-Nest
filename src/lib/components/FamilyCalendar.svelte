<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";

  let events = [];
  let year = 2025;
  let month = 9; // October (0-based)
  let daysInMonth = 31;
  let selectedDate = null;
  let showForm = false;
  let editing = null;

  let title = "";
  let date = "2025-10-01";
  let description = "";
  let color = "#0078ff";

  function iso(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  const sampleEvents = Array.from({ length: 50 }, (_, i) => ({
    title: `Event ${i + 1}`,
    date: iso(2025, 9, (i % 30) + 1),
    description: `Description for event ${i + 1}`,
    color: `hsl(${(i * 30) % 360},70%,60%)`,
  }));

  onMount(async () => {
    events = await getAll("calendar");
    if (!events || events.length === 0) {
      await addMany("calendar", sampleEvents);
      events = await getAll("calendar");
    }
    daysInMonth = new Date(year, month + 1, 0).getDate();
  });

  function getEventsForDay(d) {
    const dstr = iso(year, month, d);
    return events.filter((e) => e.date === dstr);
  }

  function selectDate(d) {
    selectedDate = d;
  }

  function startAddForDay(d) {
    date = iso(year, month, d);
    title = "";
    description = "";
    color = "#0078ff";
    editing = null;
    showForm = true;
  }

  function startEdit(ev) {
    editing = ev.id;
    title = ev.title || "";
    date = ev.date || "";
    description = ev.description || "";
    color = ev.color || "#0078ff";
    showForm = true;
  }

  async function saveEvent() {
    const payload = { title, date, description, color };
    if (editing) {
      await table("calendar").update(editing, payload);
    } else {
      await table("calendar").add(payload);
    }
    events = await getAll("calendar");
    showForm = false;
    editing = null;
  }

  async function deleteEvent(id) {
    await table("calendar").delete(id);
    events = await getAll("calendar");
  }
</script>

<div class="calendar-shell">
  <header class="calendar-topbar mb-4 flex items-center justify-between">
    <div>
      <h2 class="app-title">Calendar</h2>
      <div class="month-label">{new Date(year, month).toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
    </div>
    <div class="flex gap-2 items-center">
      <button
        class="btn btn-xs"
        on:click={() => {
          month = month - 1;
          if (month < 0) {
            month = 11;
            year -= 1;
          }
          daysInMonth = new Date(year, month + 1, 0).getDate();
        }}>Prev</button
      >
      <button
        class="btn btn-xs"
        on:click={() => {
          month = month + 1;
          if (month > 11) {
            month = 0;
            year += 1;
          }
          daysInMonth = new Date(year, month + 1, 0).getDate();
        }}>Next</button
      >
      <button
        class="btn btn-xs"
        on:click={() => {
          showForm = true;
          editing = null;
          date = iso(year, month, 1);
        }}>Add Event</button
      >
    </div>
  </header>

  <div class="card familywall-calendar-card p-4">
    <div class="calendar-grid">
      <div class="calendar-weekdays grid grid-cols-7 text-xs text-base-content/60 mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {#each Array(new Date(year, month + 1, 0).getDate()) as _, i}
        <div class="calendar-day p-3" on:click={() => selectDate(i + 1)}>
          <div class="flex items-start justify-between">
            <div class="day-number font-semibold">{i + 1}</div>
            <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => startAddForDay(i + 1)}>+</button>
          </div>
          <div class="mt-2 flex flex-col gap-1">
            {#each getEventsForDay(i + 1).slice(0, 3) as event}
              <button type="button" class="event-row flex items-center gap-2 w-full text-left" on:click|stopPropagation={() => startEdit(event)}>
                <div class="w-2 h-2 rounded-full" style="background:{event.color}"></div>
                <div class="truncate">{event.title}</div>
              </button>
            {/each}
            {#if getEventsForDay(i + 1).length > 3}
              <div class="text-xs text-base-content/60">+{getEventsForDay(i + 1).length - 3} more</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#if selectedDate}
      <div class="event-details mt-4">
        <h3 class="font-bold">Events for {iso(year, month, selectedDate)}</h3>
        {#each getEventsForDay(selectedDate) as ev}
          <div class="event-detail-card p-3 my-2 rounded bg-base-100/80">
            <div class="flex items-center justify-between">
              <div class="font-semibold" style="color:{ev.color}">{ev.title}</div>
              <div class="flex gap-2">
                <button class="btn btn-ghost btn-xs" on:click={() => startEdit(ev)}>Edit</button>
                <button class="btn btn-ghost btn-xs" on:click={() => deleteEvent(ev.id)}>Delete</button>
              </div>
            </div>
            <div class="text-xs text-base-content/70">{ev.description}</div>
          </div>
        {/each}
      </div>
    {/if}

    {#if showForm}
      <div class="mt-4 p-3 bg-base-200 rounded">
        <h3 class="font-semibold mb-2">{editing ? "Edit event" : "Add event"}</h3>
        <div class="grid grid-cols-2 gap-2">
          <input class="input input-sm" placeholder="Title" bind:value={title} />
          <input type="date" class="input input-sm" bind:value={date} />
          <input class="input input-sm col-span-2" placeholder="Description" bind:value={description} />
          <input type="color" class="input input-sm" bind:value={color} />
        </div>
        <div class="mt-3 flex gap-2">
          <button class="btn btn-sm" on:click={saveEvent}>Save</button>
          <button
            class="btn btn-sm btn-ghost"
            on:click={() => {
              showForm = false;
              editing = null;
            }}>Cancel</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .familywall-calendar-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.02));
    border-radius: 12px;
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.6rem;
  }
  .calendar-day {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 8px;
    padding: 0.5rem;
  }
  .event-row {
    padding: 2px 4px;
    border-radius: 6px;
  }
  .event-detail-card {
    border-left: 4px solid #0078ff;
  }
</style>
