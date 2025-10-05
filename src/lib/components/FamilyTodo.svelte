<script>
  import { onMount } from "svelte";
  import { db, getAll, addMany, table } from "../utils/dexie-db.js";
  let todos = [];
  let newTodo = "";
  let dueDate = "";
  let priority = "normal";
  let assigned = "";

  onMount(async () => {
    todos = await getAll("todo");
    if (!todos || todos.length === 0) {
      const sample = Array.from({ length: 50 }, (_, i) => ({ text: `Todo item ${i + 1}`, done: false }));
      await addMany("todo", sample);
      todos = await getAll("todo");
    }
  });

  async function addTodo() {
    if (!newTodo.trim()) return;
    const item = { text: newTodo.trim(), done: false, dueDate: dueDate || null, priority, assigned };
    await table("todo").add(item);
    todos = await getAll("todo");
    newTodo = "";
    dueDate = "";
    priority = "normal";
    assigned = "";
  }

  async function toggleDone(id) {
    const item = await db.table("todo").get(id);
    if (!item) return;
    await db.table("todo").update(id, { done: !item.done });
    todos = await getAll("todo");
  }

  async function removeTodo(id) {
    await table("todo").delete(id);
    todos = await getAll("todo");
  }
</script>

<div class="card glass p-4">
  <h2 class="font-bold text-lg mb-2">Family To-Do</h2>
  <div class="keep-style">
    <div class="keep-create mb-4">
      <input placeholder="Add a task..." bind:value={newTodo} on:keydown={(e) => e.key === "Enter" && addTodo()} class="keep-input" />
      <div class="keep-controls mt-2 flex gap-2">
        <input type="date" bind:value={dueDate} class="input input-xs" />
        <select bind:value={priority} class="select select-xs">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button class="btn btn-sm" on:click={addTodo}>Add</button>
      </div>
    </div>

    <div class="todo-grid grid gap-3">
      {#each todos.slice().sort((a, b) => +(b.priority === "high") - +(a.priority === "high")) as todo}
        <div class={`task-card p-3 rounded ${todo.done ? "opacity-60" : ""}`}>
          <div class="flex items-start gap-3">
            <input type="checkbox" bind:checked={todo.done} on:change={() => toggleDone(todo.id)} />
            <div class="flex-1">
              <div class="text-sm font-semibold">{todo.text}</div>
              <div class="text-xs text-base-content/60">{todo.dueDate ? `Due ${todo.dueDate}` : ""}</div>
            </div>
            <div class="flex flex-col gap-2">
              {#if todo.priority === "high"}<div class="badge badge-error">High</div>{/if}
              <button class="btn btn-ghost btn-xs" on:click={() => removeTodo(todo.id)}>Delete</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
