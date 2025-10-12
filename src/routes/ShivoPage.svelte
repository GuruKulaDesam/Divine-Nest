<script>
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import ReminderList from "$lib/components/ReminderList.svelte";
  import EventCalendar from "$lib/components/EventCalendar.svelte";
  import RecordingPanel from "$lib/components/RecordingPanel.svelte";
  import Icon from "@iconify/svelte";
  import { todos } from "$lib/stores/todos";
  import { notes } from "$lib/stores/notes";
  import { reminders } from "$lib/stores/reminders";
  import { events } from "$lib/stores/events";
  import { recordings } from "$lib/stores/recordings";

  let activeTab = "overview";
</script>

<svelte:head>
  <title>Shivo - Voice Assistant</title>
</svelte:head>

<!-- Shivo HUD - Always visible -->
<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
          <Icon icon="heroicons:sparkles" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 class="text-4xl font-bold text-gray-800">Shivo</h1>
          <p class="text-lg text-gray-600">Your Tamil-English Voice Assistant</p>
        </div>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <p class="text-gray-700 mb-4">Say "Shivo" or "நண்பா" to wake me up! I can help you manage todos, notes, reminders, events, and recordings in Tamil and English.</p>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div class="bg-blue-50 rounded-lg p-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div class="text-sm font-medium text-blue-800">Todos</div>
            <div class="text-xs text-blue-600">{$todos.filter((t) => !t.completed).length} pending</div>
          </div>

          <div class="bg-green-50 rounded-lg p-3">
            <Icon icon="heroicons:chat-bubble-left" class="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div class="text-sm font-medium text-green-800">Notes</div>
            <div class="text-xs text-green-600">{$notes.length} saved</div>
          </div>

          <div class="bg-orange-50 rounded-lg p-3">
            <Icon icon="heroicons:clock" class="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div class="text-sm font-medium text-orange-800">Reminders</div>
            <div class="text-xs text-orange-600">{$reminders.filter((r) => !r.completed).length} active</div>
          </div>

          <div class="bg-purple-50 rounded-lg p-3">
            <Icon icon="heroicons:calendar" class="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div class="text-sm font-medium text-purple-800">Events</div>
            <div class="text-xs text-purple-600">{$events.length} scheduled</div>
          </div>

          <div class="bg-red-50 rounded-lg p-3">
            <Icon icon="heroicons:microphone" class="w-6 h-6 text-red-600 mx-auto mb-1" />
            <div class="text-sm font-medium text-red-800">Recordings</div>
            <div class="text-xs text-red-600">{$recordings.length} saved</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow">
      {#each [{ id: "overview", label: "Overview", icon: "heroicons:home" }, { id: "todos", label: "Todos", icon: "heroicons:check-circle" }, { id: "notes", label: "Notes", icon: "heroicons:chat-bubble-left" }, { id: "reminders", label: "Reminders", icon: "heroicons:clock" }, { id: "events", label: "Events", icon: "heroicons:calendar" }, { id: "recordings", label: "Recordings", icon: "heroicons:microphone" }] as tab}
        <button on:click={() => (activeTab = tab.id)} class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}">
          <Icon icon={tab.icon} class="w-4 h-4" />
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Content Area -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      {#if activeTab === "overview"}
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Quick Overview</h2>

          <!-- Recent Activity -->
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Recent Todos -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Todos</h3>
              <div class="space-y-2">
                {#each $todos.slice(0, 3) as todo}
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" checked={todo.completed} class="w-4 h-4 text-blue-600 rounded" disabled />
                    <span class={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
                      {todo.title}
                    </span>
                    {#if todo.voiceCreated}
                      <Icon icon="heroicons:microphone" class="w-4 h-4 text-blue-500 ml-auto" />
                    {/if}
                  </div>
                {/each}
                {#if $todos.length === 0}
                  <p class="text-gray-500 text-sm">No todos yet</p>
                {/if}
              </div>
            </div>

            <!-- Recent Notes -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Notes</h3>
              <div class="space-y-2">
                {#each $notes.slice(0, 3) as note}
                  <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="text-gray-800 text-sm line-clamp-2">{note.content}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="text-xs text-gray-500 capitalize">{note.emotionTag}</span>
                      {#if note.voiceCreated}
                        <Icon icon="heroicons:microphone" class="w-3 h-3 text-green-500" />
                      {/if}
                    </div>
                  </div>
                {/each}
                {#if $notes.length === 0}
                  <p class="text-gray-500 text-sm">No notes yet</p>
                {/if}
              </div>
            </div>
          </div>

          <!-- Voice Commands Help -->
          <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Voice Commands</h3>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <h4 class="font-medium text-gray-700 mb-2">English Commands:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• "Shivo, add todo buy groceries"</li>
                  <li>• "Shivo, remind me to call mom at 6pm"</li>
                  <li>• "Shivo, note that I love this family time"</li>
                  <li>• "Shivo, add event Diwali celebration"</li>
                  <li>• "Shivo, start recording"</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-700 mb-2">தமிழ் கட்டளைகள்:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• "சிவோ, டோடோ சேரு பால் வாங்கு"</li>
                  <li>• "சிவோ, நினைவூட்டு அம்மாவுக்கு கால் பண்ண"</li>
                  <li>• "சிவோ, நோட் செய் குடும்ப நேரம் நல்லா இருக்கு"</li>
                  <li>• "சிவோ, இவென்ட் சேரு தீபாவளி கொண்டாட்டம்"</li>
                  <li>• "சிவோ, ரெக்கார்டிங் தொடங்கு"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      {:else if activeTab === "todos"}
        <TodoList />
      {:else if activeTab === "notes"}
        <NoteCard />
      {:else if activeTab === "reminders"}
        <ReminderList />
      {:else if activeTab === "events"}
        <EventCalendar />
      {:else if activeTab === "recordings"}
        <RecordingPanel />
      {/if}
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
  }
</style>
