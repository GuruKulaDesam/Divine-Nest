<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { getHealthRecords, addHealthRecord, updateHealthRecord, deleteHealthRecord } from "../data/wellness.js";

  const dispatch = createEventDispatcher();

  let healthRecords = [];
  let showForm = false;
  let editingRecord = null;
  let formData = {
    type: "weight",
    value: "",
    unit: "kg",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  };

  const healthTypes = [
    { value: "weight", label: "Weight", unit: "kg" },
    { value: "blood_pressure", label: "Blood Pressure", unit: "mmHg" },
    { value: "heart_rate", label: "Heart Rate", unit: "bpm" },
    { value: "blood_sugar", label: "Blood Sugar", unit: "mg/dL" },
    { value: "temperature", label: "Temperature", unit: "°C" },
    { value: "sleep_hours", label: "Sleep Hours", unit: "hours" },
    { value: "steps", label: "Steps", unit: "steps" },
    { value: "water_intake", label: "Water Intake", unit: "liters" },
  ];

  onMount(async () => {
    await loadHealthRecords();
  });

  async function loadHealthRecords() {
    healthRecords = await getHealthRecords();
    dispatch("update");
  }

  function getUnitForType(type) {
    const healthType = healthTypes.find((t) => t.value === type);
    return healthType ? healthType.unit : "";
  }

  function resetForm() {
    formData = {
      type: "weight",
      value: "",
      unit: getUnitForType("weight"),
      notes: "",
      date: new Date().toISOString().split("T")[0],
    };
    editingRecord = null;
  }

  function openForm(record = null) {
    if (record) {
      editingRecord = record;
      formData = {
        type: record.type,
        value: record.value,
        unit: record.unit || getUnitForType(record.type),
        notes: record.notes || "",
        date: record.date,
      };
    } else {
      resetForm();
    }
    showForm = true;
  }

  async function saveRecord() {
    if (!formData.value.trim()) return;

    try {
      const recordData = {
        type: formData.type,
        value: parseFloat(formData.value),
        unit: formData.unit,
        notes: formData.notes,
        date: formData.date,
      };

      if (editingRecord) {
        await updateHealthRecord(editingRecord.id, recordData);
      } else {
        await addHealthRecord(recordData);
      }

      await loadHealthRecords();
      showForm = false;
      resetForm();
    } catch (error) {
      console.error("Error saving health record:", error);
    }
  }

  async function deleteRecord(record) {
    if (confirm("Are you sure you want to delete this health record?")) {
      try {
        await deleteHealthRecord(record.id);
        await loadHealthRecords();
      } catch (error) {
        console.error("Error deleting health record:", error);
      }
    }
  }

  function getHealthTypeLabel(type) {
    const healthType = healthTypes.find((t) => t.value === type);
    return healthType ? healthType.label : type;
  }

  function formatValue(value, unit) {
    if (unit === "mmHg" && typeof value === "string") {
      return value; // Blood pressure is stored as string like "120/80"
    }
    return `${value} ${unit}`;
  }

  function getLatestRecords() {
    const grouped = {};
    healthRecords.forEach((record) => {
      if (!grouped[record.type]) {
        grouped[record.type] = [];
      }
      grouped[record.type].push(record);
    });

    // Sort each group by date descending and take latest 3
    Object.keys(grouped).forEach((type) => {
      grouped[type].sort((a, b) => new Date(b.date) - new Date(a.date));
      grouped[type] = grouped[type].slice(0, 3);
    });

    return grouped;
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-green-900 dark:text-green-100">🏥 Health Tracker</h2>
      <p class="text-green-700 dark:text-green-300 mt-1">Monitor your health metrics and wellness journey</p>
    </div>
    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" on:click={() => openForm()}> + Add Record </button>
  </div>

  <!-- Health Records by Type -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each Object.entries(getLatestRecords()) as [type, records]}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-green-200 dark:border-green-800 p-4">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          {getHealthTypeLabel(type)}
        </h3>
        <div class="space-y-2">
          {#each records as record}
            <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  {formatValue(record.value, record.unit)}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(record.date).toLocaleDateString()}
                </div>
              </div>
              <div class="flex space-x-1">
                <button class="text-blue-600 hover:text-blue-800 p-1" on:click={() => openForm(record)} title="Edit"> ✏️ </button>
                <button class="text-red-600 hover:text-red-800 p-1" on:click={() => deleteRecord(record)} title="Delete"> 🗑️ </button>
              </div>
            </div>
          {/each}
          {#if records.length === 0}
            <p class="text-gray-500 dark:text-gray-400 text-sm">No records yet</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <!-- Add/Edit Form Modal -->
  {#if showForm}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingRecord ? "Edit Health Record" : "Add Health Record"}
        </h3>

        <form on:submit|preventDefault={saveRecord} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Health Metric </label>
            <select bind:value={formData.type} on:change={() => (formData.unit = getUnitForType(formData.type))} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required>
              {#each healthTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value ({formData.unit})
            </label>
            <input type={formData.type === "blood_pressure" ? "text" : "number"} bind:value={formData.value} placeholder={formData.type === "blood_pressure" ? "120/80" : "Enter value"} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Date </label>
            <input type="date" bind:value={formData.date} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Notes (optional) </label>
            <textarea bind:value={formData.notes} placeholder="Any additional notes..." rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
          </div>

          <div class="flex space-x-3 pt-4">
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              {editingRecord ? "Update" : "Add"} Record
            </button>
            <button
              type="button"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              on:click={() => {
                showForm = false;
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
