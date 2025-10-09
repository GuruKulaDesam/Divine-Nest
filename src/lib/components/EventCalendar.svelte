<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { events, eventActions } from "$lib/stores/events";
  import { isListening, startVoiceRecognition, stopVoiceRecognition, transcript } from "$lib/stores/voiceAssistant";

  let newEventTitle = "";
  let newEventDate = "";
  let selectedCategory: "festival" | "school" | "family" | "custom" = "custom";

  function addEvent() {
    if (!newEventTitle.trim() || !newEventDate) return;

    eventActions.add({
      title: newEventTitle,
      date: new Date(newEventDate).toISOString(),
      category: selectedCategory,
      voiceCreated: false,
    });

    newEventTitle = "";
    newEventDate = "";
    selectedCategory = "custom";
  }

  function removeEvent(id: string) {
    eventActions.remove(id);
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case "festival":
        return "heroicons:sparkles";
      case "school":
        return "heroicons:academic-cap";
      case "family":
        return "heroicons:home";
      case "work":
        return "heroicons:briefcase";
      default:
        return "heroicons:calendar";
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case "festival":
        return "text-red-600 bg-red-50";
      case "school":
        return "text-blue-600 bg-blue-50";
      case "family":
        return "text-green-600 bg-green-50";
      case "work":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getUpcomingEvents() {
    const now = new Date();
    return $events.filter((event) => new Date(event.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  function getPastEvents() {
    const now = new Date();
    return $events.filter((event) => new Date(event.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function formatEventDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
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
        <Icon icon="heroicons:calendar" class="w-8 h-8 text-purple-600" />
        <h1 class="text-2xl font-bold text-gray-800">நிகழ்வுகள் (Events)</h1>
      </div>
      <div class="flex items-center gap-3">
        <button on:click={handleVoiceCommand} class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors {$isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-600 text-white hover:bg-purple-700'}">
          <Icon icon="heroicons:microphone" class="w-5 h-5" />
          {$isListening ? "Listening..." : "Voice"}
        </button>
        <div class="text-sm text-gray-500">
          {getUpcomingEvents().length} upcoming
        </div>
      </div>
    </div>

    <!-- Voice Transcript Display -->
    {#if $isListening || $transcript}
      <div class="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <Icon icon="heroicons:microphone" class="w-4 h-4 text-purple-600" />
          <span class="text-sm font-medium text-purple-800">Voice Command</span>
        </div>
        <p class="text-purple-700">{$transcript || "Listening..."}</p>
      </div>
    {/if}

    <!-- Add Event Form -->
    <div class="mb-6 bg-gray-50 rounded-lg p-4">
      <form on:submit|preventDefault={addEvent}>
        <div class="grid gap-4 md:grid-cols-2">
          <input bind:value={newEventTitle} type="text" placeholder="Event title... (or say 'Shivo, add event...')" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />

          <input bind:value={newEventDate} type="date" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            {#each ["custom", "festival", "school", "family"] as category (category)}
              <button type="button" on:click={() => (selectedCategory = category as "festival" | "school" | "family" | "custom")} class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            {/each}
          </div>

          <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-1" />
            Add Event
          </button>
        </div>
      </form>
    </div>

    <!-- Upcoming Events -->
    {#if getUpcomingEvents().length > 0}
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
        <div class="space-y-3">
          {#each getUpcomingEvents() as event (event.id)}
            <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <!-- Date -->
              <div class="text-center min-w-0">
                <div class="text-2xl font-bold text-purple-600">
                  {new Date(event.date).getDate()}
                </div>
                <div class="text-sm text-gray-500 uppercase">
                  {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-gray-800">{event.title}</h3>
                  {#if event.voiceCreated}
                    <Icon icon="heroicons:microphone" class="w-4 h-4 text-purple-500" />
                  {/if}
                </div>

                <div class="flex items-center gap-2 mt-1">
                  <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(event.category)}">
                    <Icon icon={getCategoryIcon(event.category)} class="w-3 h-3" />
                    {event.category}
                  </div>
                  <span class="text-sm text-gray-500">
                    {formatEventDate(event.date)}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <button on:click={() => removeEvent(event.id)} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                <Icon icon="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Past Events -->
    {#if getPastEvents().length > 0}
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Past Events</h2>
        <div class="space-y-2">
          {#each getPastEvents() as event (event.id)}
            <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg opacity-75">
              <div class="text-center min-w-0">
                <div class="text-lg font-semibold text-gray-600">
                  {new Date(event.date).getDate()}
                </div>
                <div class="text-xs text-gray-400 uppercase">
                  {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                </div>
              </div>

              <div class="flex-1">
                <h3 class="font-medium text-gray-600">{event.title}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                    <Icon icon={getCategoryIcon(event.category)} class="w-3 h-3" />
                    {event.category}
                  </div>
                  <span class="text-xs text-gray-400">
                    {formatEventDate(event.date)}
                  </span>
                </div>
              </div>

              <button on:click={() => removeEvent(event.id)} class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                <Icon icon="heroicons:trash" class="w-3 h-3" />
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if $events.length === 0}
      <div class="text-center py-12 text-gray-500">
        <Icon icon="heroicons:calendar" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p class="text-lg font-medium">No events scheduled</p>
        <p class="text-sm">Add your first event or try saying "Shivo, add event..."</p>
      </div>
    {/if}
  </div>
</div>
