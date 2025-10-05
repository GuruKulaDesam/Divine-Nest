<script>
  import { onMount } from "svelte";
  import { db, getAll, addMany, table } from "../utils/dexie-db.js";
  let places = [];
  let name = "";
  let address = "";
  let lat = null;
  let lng = null;

  onMount(async () => {
    places = await getAll("map");
    if (!places || places.length === 0) {
      const sample = Array.from({ length: 50 }, (_, i) => ({ name: `Place ${i + 1}`, address: `Address ${i + 1}` }));
      await addMany("map", sample);
      places = await getAll("map");
    }
  });

  async function addPlace() {
    if (!name.trim()) return;
    await table("map").add({ name: name.trim(), address: address.trim(), lat: lat || null, lng: lng || null });
    places = await getAll("map");
    name = "";
    address = "";
    lat = null;
    lng = null;
  }

  async function removePlace(id) {
    await table("map").delete(id);
    places = await getAll("map");
  }
</script>

<div class="card glass p-4">
  <div class="flex items-center justify-between mb-3">
    <h2 class="font-bold text-lg">Family Map</h2>
    <div class="text-sm text-base-content/60">Locations — {places.length}</div>
  </div>
  <div class="mb-3 flex gap-2">
    <input class="input input-sm" placeholder="Place name" bind:value={name} />
    <input class="input input-sm" placeholder="Address" bind:value={address} />
    <button class="btn btn-sm" on:click={addPlace}>Add</button>
  </div>
  <ul>
    {#each places as place}
      <li class="mb-3 p-3 rounded bg-base-200 flex items-start justify-between">
        <div>
          <div class="font-semibold">{place.name}</div>
          <div class="text-xs text-base-content/60">{place.address}</div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <a class="link text-xs" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}>Open</a>
          <button class="btn btn-ghost btn-xs" on:click={() => removePlace(place.id)}>Delete</button>
        </div>
      </li>
    {/each}
  </ul>
</div>
