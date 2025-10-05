<script>
  import { onMount } from "svelte";
  import { db, getAll, addMany, table } from "../utils/dexie-db.js";
  let notifications = [];
  let newNotification = "";

  onMount(async () => {
    notifications = await getAll("notifications");
    if (!notifications || notifications.length === 0) {
      const sample = Array.from({ length: 50 }, (_, i) => ({ text: `Notification ${i + 1}` }));
      await addMany("notifications", sample);
      notifications = await getAll("notifications");
    }
  });

  async function addNotification() {
    if (!newNotification.trim()) return;
    await table("notifications").add({ text: newNotification.trim(), read: false, timestamp: new Date().toISOString() });
    notifications = await getAll("notifications");
    newNotification = "";
  }

  async function removeNotification(id) {
    await table("notifications").delete(id);
    notifications = await getAll("notifications");
  }

  async function markRead(id) {
    await table("notifications").update(id, { read: true });
    notifications = await getAll("notifications");
  }

  async function clearAll() {
    await table("notifications").clear();
    notifications = await getAll("notifications");
  }
</script>

<div class="card glass p-4">
  <h2 class="font-bold text-lg mb-2">Family Notifications</h2>
  <div class="mb-3 flex gap-2">
    <input class="input input-sm flex-1" placeholder="New notification" bind:value={newNotification} />
    <button class="btn btn-sm" on:click={addNotification}>Add</button>
    <button class="btn btn-sm btn-error" on:click={clearAll}>Clear All</button>
  </div>

  <ul>
    {#each notifications.slice().sort((a, b) => (a.read ? 1 : 0) - (b.read ? 1 : 0)) as notification}
      <li class={`mb-3 p-3 rounded ${notification.read ? "bg-base-200" : "bg-base-100 shadow-sm"}`}>
        <div class="flex items-start justify-between">
          <div>
            <div class={notification.read ? "text-base-content/60" : "font-medium"}>{notification.text}</div>
            <div class="text-xs text-base-content/60">{notification.timestamp}</div>
          </div>
          <div class="flex flex-col gap-2">
            {#if !notification.read}
              <button class="btn btn-ghost btn-xs" on:click={() => markRead(notification.id)}>Mark read</button>
            {/if}
            <button class="btn btn-ghost btn-xs" on:click={() => removeNotification(notification.id)}>Delete</button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
