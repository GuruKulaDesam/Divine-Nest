<script>
  import { onMount } from "svelte";
  import { db, getAll, addMany, table } from "../utils/dexie-db.js";
  let notes = [];
  let newNote = "";
  let editing = null;

  onMount(async () => {
    notes = await getAll("notes");
    if (!notes || notes.length === 0) {
      const sample = Array.from({ length: 50 }, (_, i) => ({ text: `Note ${i + 1}` }));
      await addMany("notes", sample);
      notes = await getAll("notes");
    }
  });

  async function addNote() {
    if (!newNote.trim()) return;
    const payload = { text: newNote.trim(), pinned: false, updatedAt: new Date().toISOString() };
    if (editing) {
      await table("notes").update(editing, { text: newNote.trim(), updatedAt: payload.updatedAt });
      editing = null;
    } else {
      await table("notes").add(payload);
    }
    notes = await getAll("notes");
    newNote = "";
  }

  async function removeNote(id) {
    await table("notes").delete(id);
    notes = await getAll("notes");
  }

  async function togglePin(id) {
    const item = await table("notes").get(id);
    if (!item) return;
    await table("notes").update(id, { pinned: !item.pinned, updatedAt: new Date().toISOString() });
    notes = await getAll("notes");
  }

  function editNote(note) {
    editing = note.id;
    newNote = note.text || "";
  }
</script>

<div class="card glass p-4">
  <h2 class="font-bold text-lg mb-2">Family Notes</h2>
  <div class="mb-3 flex gap-2">
    <input class="input input-sm flex-1" placeholder="Write a note" bind:value={newNote} />
    <button class="btn btn-sm" on:click={addNote}>{editing ? "Save" : "Add"}</button>
  </div>

  <div class="notes-grid">
    {#each notes.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) as note}
      <div class={`note-card mb-3 p-3 rounded ${note.pinned ? "note-pinned" : ""}`}>
        <div class="note-header flex items-center justify-between">
          <div class="font-medium">{note.text.slice(0, 40)}</div>
          {#if note.pinned}
            <div class="text-xs">📌</div>
          {/if}
        </div>
        <div class="note-body text-sm mt-2">{note.text}</div>
        <div class="note-footer mt-3 text-xs text-base-content/60 flex items-center justify-between">
          <div>{note.updatedAt}</div>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-xs" on:click={() => togglePin(note.id)}>{note.pinned ? "Unpin" : "Pin"}</button>
            <button class="btn btn-ghost btn-xs" on:click={() => editNote(note)}>Edit</button>
            <button class="btn btn-ghost btn-xs" on:click={() => removeNote(note.id)}>Delete</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .notes-grid {
    column-count: 3;
    column-gap: 1rem;
  }
  .note-card {
    display: inline-block;
    width: 100%;
    break-inside: avoid;
    background: var(--tw-bg-opacity, #fff);
  }
  .note-pinned {
    border: 1px solid var(--tw-ring-color, #ffd54f);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  @media (max-width: 900px) {
    .notes-grid {
      column-count: 2;
    }
  }
  @media (max-width: 600px) {
    .notes-grid {
      column-count: 1;
    }
  }
</style>
