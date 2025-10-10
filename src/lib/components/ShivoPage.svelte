<script>
  import { onMount } from "svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import { todos } from "$lib/stores/todos.js";
  import { notes } from "$lib/stores/notes.js";
  import { reminders } from "$lib/stores/reminders.js";
  import { events } from "$lib/stores/events.js";
  import { recordings } from "$lib/stores/recordings.js";

  let activeTab = "overview";

  // Voice assistant stats
  $: stats = {
    todos: $todos.length,
    notes: $notes.length,
    reminders: $reminders.length,
    events: $events.length,
    recordings: $recordings.length,
  };

  onMount(() => {
    // Initialize voice assistant
    console.log("Shivo Voice Assistant initialized");
  });
</script>

<svelte:head>
  <title>Shivo - Voice Assistant | Family Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
  <ShivoHUD />

  <div class="container mx-auto px-4 py-8 pt-24">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">🗣️ Shivo Voice Assistant</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Your intelligent Tamil-English voice assistant for family management. Speak naturally in Tamil or English to manage todos, notes, reminders, events, and recordings.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div class="text-3xl mb-2">📝</div>
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.todos}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Todos</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div class="text-3xl mb-2">📓</div>
        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{stats.notes}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Notes</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div class="text-3xl mb-2">⏰</div>
        <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.reminders}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Reminders</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div class="text-3xl mb-2">📅</div>
        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.events}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Events</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div class="text-3xl mb-2">🎙️</div>
        <div class="text-2xl font-bold text-red-600 dark:text-red-400">{stats.recordings}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Recordings</div>
      </div>
    </div>

    <!-- Voice Commands Guide -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Voice Commands</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">English Commands</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>"Add todo"</strong> - Create a new task</li>
            <li><strong>"Create note"</strong> - Make a new note</li>
            <li><strong>"Set reminder"</strong> - Schedule a reminder</li>
            <li><strong>"Schedule event"</strong> - Add calendar event</li>
            <li><strong>"Start recording"</strong> - Begin voice recording</li>
            <li><strong>"Show todos"</strong> - List all tasks</li>
            <li><strong>"What's my schedule"</strong> - View upcoming events</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-3">தமிழ் கட்டளைகள்</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>"டுடோ சேர்க்க"</strong> - புதிய பணி உருவாக்க</li>
            <li><strong>"குறிப்பு எழுது"</strong> - புதிய குறிப்பு எழுத</li>
            <li><strong>"நினைவூட்டல் அமை"</strong> - நினைவூட்டலை அமை</li>
            <li><strong>"நிகழ்வு திட்டமிடு"</strong> - காலண்டர் நிகழ்வு சேர்</li>
            <li><strong>"பதிவு தொடங்கு"</strong> - குரல் பதிவு தொடங்கு</li>
            <li><strong>"டுடோக்களைக் காட்சி"</strong> - எல்லா பணிகளையும் பார்</li>
            <li><strong>"என் அட்டவணை என்ன"</strong> - வரவிருக்கும் நிகழ்வுகளைப் பார்</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/shivo/todos" class="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105">
          <div class="text-3xl mb-3">📝</div>
          <h3 class="text-xl font-semibold mb-2">Manage Todos</h3>
          <p class="text-blue-100">Create and track your tasks</p>
        </a>

        <a href="/shivo/notes" class="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105">
          <div class="text-3xl mb-3">📓</div>
          <h3 class="text-xl font-semibold mb-2">Voice Notes</h3>
          <p class="text-green-100">Capture thoughts and ideas</p>
        </a>

        <a href="/shivo/reminders" class="block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105">
          <div class="text-3xl mb-3">⏰</div>
          <h3 class="text-xl font-semibold mb-2">Smart Reminders</h3>
          <p class="text-orange-100">Never forget important things</p>
        </a>

        <a href="/shivo/events" class="block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105">
          <div class="text-3xl mb-3">📅</div>
          <h3 class="text-xl font-semibold mb-2">Event Planning</h3>
          <p class="text-purple-100">Schedule family events</p>
        </a>

        <a href="/shivo/recordings" class="block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105">
          <div class="text-3xl mb-3">🎙️</div>
          <h3 class="text-xl font-semibold mb-2">Voice Recordings</h3>
          <p class="text-red-100">Record and store audio</p>
        </a>

        <div class="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl p-6 text-center">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="text-xl font-semibold mb-2">Voice Commands</h3>
          <p class="text-gray-100">Try saying "Hey Shivo, help me"</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .min-h-screen {
    min-height: 100vh;
  }
</style>
