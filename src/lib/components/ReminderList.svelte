<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { reminders, reminderActions } from "$lib/stores/reminders";
  import { isListening, startVoiceRecognition, stopVoiceRecognition, transcript } from "$lib/stores/voiceAssistant";

  let newReminderMessage = "";
  let newReminderTime = "";
  let selectedRepeat: "none" | "daily" | "weekly" | "monthly" = "none";

  function addReminder() {
    if (!newReminderMessage.trim() || !newReminderTime) return;

    reminderActions.add({
      message: newReminderMessage,
      time: new Date(newReminderTime).toISOString(),
      repeat: selectedRepeat,
      completed: false,
      voiceCreated: false,
    });

    newReminderMessage = "";
    newReminderTime = "";
    selectedRepeat = "none";
  }

  function toggleReminder(id: string) {
    reminderActions.toggle(id);
  }

  function removeReminder(id: string) {
    reminderActions.remove(id);
  }

  function getTimeUntil(reminderTime: string) {
    const now = new Date();
    const reminder = new Date(reminderTime);
    const diff = reminder.getTime() - now.getTime();

    if (diff <= 0) return "Overdue";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  function getRepeatIcon(repeat: string) {
    switch (repeat) {
      case "daily":
        return "heroicons:arrow-path";
      case "weekly":
        return "heroicons:calendar-days";
      case "monthly":
        return "heroicons:calendar";
      default:
        return "heroicons:clock";
    }
  }

  function getRepeatColor(repeat: string) {
    switch (repeat) {
      case "daily":
        return "text-blue-600";
      case "weekly":
        return "text-green-600";
      case "monthly":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  }

  function handleVoiceCommand() {
    if ($isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  }
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <Icon icon="heroicons:clock" class="w-8 h-8 text-orange-600" />
        <h1 class="text-2xl font-bold text-gray-800">நினைவூட்டல்கள் (Reminders)</h1>
      </div>
      <div class="flex items-center gap-3">
        <button on:click={handleVoiceCommand} class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors {$isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-600 text-white hover:bg-orange-700'}">
          <Icon icon="heroicons:microphone" class="w-5 h-5" />
          {$isListening ? "Listening..." : "Voice"}
        </button>
        <div class="text-sm text-gray-500">
          {$reminders.filter((r) => !r.completed).length} active
        </div>
      </div>
    </div>

    <!-- Voice Transcript Display -->
    {#if $isListening || $transcript}
      <div class="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <Icon icon="heroicons:microphone" class="w-4 h-4 text-orange-600" />
          <span class="text-sm font-medium text-orange-800">Voice Command</span>
        </div>
        <p class="text-orange-700">{$transcript || "Listening..."}</p>
      </div>
    {/if}

    <!-- Add Reminder Form -->
    <div class="mb-6 bg-gray-50 rounded-lg p-4">
      <form on:submit|preventDefault={addReminder}>
        <div class="grid gap-4 md:grid-cols-2">
          <input bind:value={newReminderMessage} type="text" placeholder="Reminder message... (or say 'Shivo, remind me...')" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />

          <input bind:value={newReminderTime} type="datetime-local" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            {#each ["none", "daily", "weekly", "monthly"] as repeat (repeat)}
              <button type="button" on:click={() => (selectedRepeat = repeat as "none" | "daily" | "weekly" | "monthly")} class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedRepeat === repeat ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
                {repeat === "none" ? "Once" : repeat.charAt(0).toUpperCase() + repeat.slice(1)}
              </button>
            {/each}
          </div>

          <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-1" />
            Add Reminder
          </button>
        </div>
      </form>
    </div>

    <!-- Reminders List -->
    <div class="space-y-3">
      {#each $reminders as reminder (reminder.id)}
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <!-- Checkbox -->
          <button on:click={() => toggleReminder(reminder.id)} class="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center transition-colors {reminder.completed ? 'bg-green-500 border-green-500' : 'hover:border-orange-500'}">
            {#if reminder.completed}
              <Icon icon="heroicons:check" class="w-4 h-4 text-white" />
            {/if}
          </button>

          <!-- Content -->
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-gray-800 {reminder.completed ? 'line-through text-gray-500' : ''}">
                {reminder.message}
              </p>
              {#if reminder.voiceCreated}
                <Icon icon="heroicons:microphone" class="w-4 h-4 text-orange-500" />
              {/if}
            </div>

            <div class="flex items-center gap-4 mt-1">
              <div class="flex items-center gap-1 text-sm text-gray-600">
                <Icon icon="heroicons:clock" class="w-4 h-4" />
                {reminder.time ? new Date(reminder.time).toLocaleString() : "No time set"}
              </div>

              {#if reminder.repeat && reminder.repeat !== "none"}
                <div class="flex items-center gap-1 text-sm {getRepeatColor(reminder.repeat)}">
                  <Icon icon={getRepeatIcon(reminder.repeat)} class="w-4 h-4" />
                  {reminder.repeat}
                </div>
              {/if}

              <div class="text-sm text-gray-500">
                {reminder.time ? getTimeUntil(reminder.time) : "No time set"}
              </div>
            </div>
          </div>

          <!-- Actions -->
          <button on:click={() => removeReminder(reminder.id)} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
            <Icon icon="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
      {/each}

      {#if $reminders.length === 0}
        <div class="text-center py-12 text-gray-500">
          <Icon icon="heroicons:clock" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-lg font-medium">No reminders set</p>
          <p class="text-sm">Add your first reminder or try saying "Shivo, remind me..."</p>
        </div>
      {/if}
    </div>
  </div>
</div>
