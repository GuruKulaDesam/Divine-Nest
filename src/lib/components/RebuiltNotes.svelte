<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";

  let notes = [];
  let composing = "";

  onMount(async () => {
    notes = await getAll("notes");
    if (!notes || notes.length === 0) {
      const sample = Array.from({ length: 50 }, (_, i) => ({ title: `Note ${i + 1}`, body: `This is sample note ${i + 1}`, pinned: Math.random() > 0.9, color: ["#fff7ed", "#ecfeff", "#f0fdf4", "#f5f3ff"][i % 4], updatedAt: new Date().toISOString() }));
      await addMany("notes", sample);
      notes = await getAll("notes");
    }
  });

  async function add() {
    if (!composing.trim()) return;
    await table("notes").add({ title: composing.split("\n")[0].slice(0, 30), body: composing, pinned: false, color: "#fff7ed", updatedAt: new Date().toISOString() });
    notes = await getAll("notes");
    composing = "";
  }

  async function remove(id) {
    await table("notes").delete(id);
    notes = await getAll("notes");
  }
  async function togglePin(id) {
    const it = await table("notes").get(id);
    if (!it) return;
    await table("notes").update(id, { pinned: !it.pinned, updatedAt: new Date().toISOString() });
    notes = await getAll("notes");
  }
</script>

<div class="rebuilt-notes p-4">
  <div class="mb-4 flex gap-2">
    <textarea class="flex-1 textarea" rows="2" placeholder="Take a note..." bind:value={composing}></textarea>
    <div class="flex flex-col gap-2">
      <button class="btn" on:click={add}>Add</button>
    </div>
  </div>

  <div class="grid grid-cols-4 gap-4">
    {#each notes.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) as note}
      <div class="p-3 rounded-lg shadow-sm" style="background:{note.color}">
        <div class="flex items-start justify-between">
          <div class="font-medium">{note.title}</div>
          <div class="flex gap-1">
            <button class="btn btn-ghost btn-xs" on:click={() => togglePin(note.id)}>{note.pinned ? "Unpin" : "Pin"}</button>
            <button class="btn btn-ghost btn-xs" on:click={() => remove(note.id)}>Delete</button>
          </div>
        </div>
        <div class="mt-2 text-sm whitespace-pre-wrap">{note.body}</div>
        <div class="mt-2 text-xs text-base-content/60">{note.updatedAt}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  @media (max-width: 1100px) {
    .rebuilt-notes .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 700px) {
    .rebuilt-notes .grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
