<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let vehicles = [
    {
      id: 1,
      name: "Honda City",
      type: "Car",
      registrationNumber: "TN-01-AA-1234",
      make: "Honda",
      model: "City",
      year: 2020,
      color: "White",
      fuelType: "Petrol",
      mileage: 25000,
      insuranceExpiry: "2024-03-15",
      nextService: "2024-02-01",
      status: "active"
    },
    {
      id: 2,
      name: "Royal Enfield Classic 350",
      type: "Motorcycle",
      registrationNumber: "TN-01-BB-5678",
      make: "Royal Enfield",
      model: "Classic 350",
      year: 2019,
      color: "Black",
      fuelType: "Petrol",
      mileage: 15000,
      insuranceExpiry: "2024-06-20",
      nextService: "2024-01-25",
      status: "active"
    }
  ];

  let newVehicle = {
    name: "",
    type: "",
    registrationNumber: "",
    make: "",
    model: "",
    year: "",
    color: "",
    fuelType: "",
    mileage: "",
    insuranceExpiry: "",
    nextService: ""
  };

  let showAddModal = false;
  let selectedVehicle = null;
  let showDetailsModal = false;

  function addVehicle() {
    // Add vehicle logic here
    showAddModal = false;
  }

  function viewVehicle(vehicle) {
    selectedVehicle = vehicle;
    showDetailsModal = true;
  }

  function getTypeIcon(type) {
    const icons = {
      "Car": "heroicons:truck",
      "Motorcycle": "heroicons:bolt",
      "Bicycle": "heroicons:arrow-path-rounded-square",
      "Scooter": "heroicons:bolt",
      "Truck": "heroicons:truck",
      "Bus": "heroicons:truck"
    };
    return icons[type] || "heroicons:truck";
  }

  function getStatusColor(status) {
    switch (status) {
      case "active": return "badge-success";
      case "maintenance": return "badge-warning";
      case "inactive": return "badge-neutral";
      default: return "badge-neutral";
    }
  }

  function getFuelColor(fuelType) {
    switch (fuelType) {
      case "Petrol": return "text-blue-600";
      case "Diesel": return "text-green-600";
      case "Electric": return "text-purple-600";
      case "Hybrid": return "text-orange-600";
      default: return "text-gray-600";
    }
  }

  function getUpcomingServices() {
    const today = new Date();
    return vehicles.filter(vehicle => {
      const serviceDate = new Date(vehicle.nextService);
      const daysDiff = (serviceDate - today) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30 && daysDiff >= 0;
    }).length;
  }

  function getExpiringInsurances() {
    const today = new Date();
    return vehicles.filter(vehicle => {
      const expiryDate = new Date(vehicle.insuranceExpiry);
      const daysDiff = (expiryDate - today) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30 && daysDiff >= 0;
    }).length;
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Vehicle Management</h1>
      <p class="text-base-content/70 mt-2">Track your vehicles, maintenance, and insurance</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Vehicle
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:truck" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Vehicles</h3>
            <p class="text-2xl font-bold text-blue-600">{vehicles.length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:wrench-screwdriver" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Active</h3>
            <p class="text-2xl font-bold text-green-600">{vehicles.filter(v => v.status === 'active').length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Service Due</h3>
            <p class="text-2xl font-bold text-yellow-600">{getUpcomingServices()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <Icon icon="heroicons:shield-check" class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Insurance Expiring</h3>
            <p class="text-2xl font-bold text-red-600">{getExpiringInsurances()}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Vehicles Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each vehicles as vehicle}
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg mr-4">
                <Icon icon={getTypeIcon(vehicle.type)} class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 class="font-bold text-lg">{vehicle.name}</h3>
                <p class="text-sm text-base-content/70">{vehicle.registrationNumber}</p>
              </div>
            </div>
            <span class="badge {getStatusColor(vehicle.status)}">
              {vehicle.status}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-base-content/70">Make & Model</p>
              <p class="font-semibold">{vehicle.make} {vehicle.model}</p>
            </div>
            <div>
              <p class="text-sm text-base-content/70">Year</p>
              <p class="font-semibold">{vehicle.year}</p>
            </div>
            <div>
              <p class="text-sm text-base-content/70">Fuel Type</p>
              <p class="font-semibold {getFuelColor(vehicle.fuelType)}">{vehicle.fuelType}</p>
            </div>
            <div>
              <p class="text-sm text-base-content/70">Mileage</p>
              <p class="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Insurance Expiry</span>
              <span class="text-sm font-medium">{vehicle.insuranceExpiry}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Next Service</span>
              <span class="text-sm font-medium">{vehicle.nextService}</span>
            </div>
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-sm btn-ghost" on:click={() => viewVehicle(vehicle)}>
              <Icon icon="heroicons:eye" class="w-4 h-4 mr-1" />
              View Details
            </button>
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:pencil" class="w-4 h-4 mr-1" />
              Edit
            </button>
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:wrench-screwdriver" class="w-4 h-4 mr-1" />
              Service
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Vehicles Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Registration</th>
              <th>Make/Model</th>
              <th>Year</th>
              <th>Fuel Type</th>
              <th>Mileage</th>
              <th>Insurance Expiry</th>
              <th>Next Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each vehicles as vehicle}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={getTypeIcon(vehicle.type)} class="w-4 h-4 mr-2" />
                    <div>
                      <div class="font-semibold">{vehicle.name}</div>
                      <div class="text-sm text-base-content/70">{vehicle.type}</div>
                    </div>
                  </div>
                </td>
                <td class="font-mono text-sm">{vehicle.registrationNumber}</td>
                <td>{vehicle.make} {vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>
                  <span class="{getFuelColor(vehicle.fuelType)} font-medium">{vehicle.fuelType}</span>
                </td>
                <td>{vehicle.mileage.toLocaleString()} km</td>
                <td class="text-sm">{vehicle.insuranceExpiry}</td>
                <td class="text-sm">{vehicle.nextService}</td>
                <td>
                  <span class="badge {getStatusColor(vehicle.status)}">
                    {vehicle.status}
                  </span>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" on:click={() => viewVehicle(vehicle)}>
                      <Icon icon="heroicons:eye" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:wrench-screwdriver" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Add Vehicle Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Vehicle</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addVehicle} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Vehicle Name</span>
            </label>
            <input type="text" bind:value={newVehicle.name} class="input input-bordered" placeholder="Honda City" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select bind:value={newVehicle.type} class="select select-bordered" required>
              <option value="">Select Type</option>
              <option>Car</option>
              <option>Motorcycle</option>
              <option>Scooter</option>
              <option>Bicycle</option>
              <option>Truck</option>
              <option>Bus</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Registration Number</span>
            </label>
            <input type="text" bind:value={newVehicle.registrationNumber} class="input input-bordered" placeholder="TN-01-AA-1234" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Make</span>
              </label>
              <input type="text" bind:value={newVehicle.make} class="input input-bordered" placeholder="Honda" required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Model</span>
              </label>
              <input type="text" bind:value={newVehicle.model} class="input input-bordered" placeholder="City" required />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Year</span>
              </label>
              <input type="number" bind:value={newVehicle.year} class="input input-bordered" placeholder="2020" required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Color</span>
              </label>
              <input type="text" bind:value={newVehicle.color} class="input input-bordered" placeholder="White" required />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Fuel Type</span>
            </label>
            <select bind:value={newVehicle.fuelType} class="select select-bordered" required>
              <option value="">Select Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
              <option>CNG</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Current Mileage (km)</span>
            </label>
            <input type="number" bind:value={newVehicle.mileage} class="input input-bordered" placeholder="25000" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Insurance Expiry</span>
              </label>
              <input type="date" bind:value={newVehicle.insuranceExpiry} class="input input-bordered" required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Next Service Date</span>
              </label>
              <input type="date" bind:value={newVehicle.nextService} class="input input-bordered" required />
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Vehicle Details Modal -->
{#if showDetailsModal && selectedVehicle}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">{selectedVehicle.name} Details</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => { showDetailsModal = false; selectedVehicle = null; }}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text font-semibold">Registration Number</span>
              </label>
              <p class="font-mono">{selectedVehicle.registrationNumber}</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Make & Model</span>
              </label>
              <p>{selectedVehicle.make} {selectedVehicle.model}</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Year & Color</span>
              </label>
              <p>{selectedVehicle.year} - {selectedVehicle.color}</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Fuel Type</span>
              </label>
              <p class="{getFuelColor(selectedVehicle.fuelType)}">{selectedVehicle.fuelType}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text font-semibold">Current Mileage</span>
              </label>
              <p>{selectedVehicle.mileage.toLocaleString()} km</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Insurance Expiry</span>
              </label>
              <p>{selectedVehicle.insuranceExpiry}</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Next Service</span>
              </label>
              <p>{selectedVehicle.nextService}</p>
            </div>

            <div>
              <label class="label">
                <span class="label-text font-semibold">Status</span>
              </label>
              <span class="badge {getStatusColor(selectedVehicle.status)}">
                {selectedVehicle.status}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-6 border-t mt-6">
          <button class="btn btn-ghost flex-1" on:click={() => { showDetailsModal = false; selectedVehicle = null; }}>
            Close
          </button>
          <button class="btn btn-primary flex-1">
            Edit Vehicle
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}