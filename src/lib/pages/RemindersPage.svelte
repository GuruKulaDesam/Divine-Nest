<script>
  import { onMount } from "svelte";
  import { getAll, table } from "../utils/dexie-db.js";
  import { writable } from "svelte/store";

  let notes = [];
  let events = [];
  let reminders = writable([]);
  let isGenerating = false;

  // Load data on mount
  onMount(async () => {
    notes = await getAll("notes");
    events = await getAll("calendar");
    generateAutoReminders();
  });

  // Generate auto-reminders based on notes and calendar events
  async function generateAutoReminders() {
    isGenerating = true;

    const generatedReminders = [];

    // Analyze notes for reminders
    notes.forEach((note) => {
      const content = note.body.toLowerCase();
      const title = note.title.toLowerCase();

      // Check for time-sensitive keywords
      const timeKeywords = ["tomorrow", "today", "next week", "next month", "deadline", "due", "meeting", "appointment", "call", "remind", "important", "urgent"];

      const hasTimeKeyword = timeKeywords.some((keyword) => content.includes(keyword) || title.includes(keyword));

      if (hasTimeKeyword) {
        generatedReminders.push({
          id: `note-${note.id}`,
          type: "note",
          title: `Review: ${note.title}`,
          description: extractReminderText(note.body),
          priority: determinePriority(note.body),
          dueDate: estimateDueDate(note.body),
          source: "Notes Analysis",
          color: note.color || "#6366f1",
          createdAt: new Date().toISOString(),
        });
      }
    });

    // Analyze calendar events for follow-up reminders
    events.forEach((event) => {
      const eventDate = new Date(event.date + (event.time ? ` ${event.time}` : ""));
      const now = new Date();
      const daysDiff = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));

      // Create reminders for upcoming events
      if (daysDiff >= 0 && daysDiff <= 7) {
        generatedReminders.push({
          id: `event-${event.id}`,
          type: "event",
          title: `Upcoming: ${event.title}`,
          description: event.description || `Event scheduled for ${event.date}${event.time ? ` at ${event.time}` : ""}`,
          priority: "medium",
          dueDate: event.date,
          source: "Calendar Events",
          color: event.color || "#10b981",
          createdAt: new Date().toISOString(),
        });
      }

      // Create follow-up reminders for past events
      if (daysDiff < 0 && daysDiff >= -1) {
        generatedReminders.push({
          id: `followup-${event.id}`,
          type: "followup",
          title: `Follow-up: ${event.title}`,
          description: `Follow up on the "${event.title}" event that occurred on ${event.date}`,
          priority: "low",
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Tomorrow
          source: "Event Follow-up",
          color: "#f59e0b",
          createdAt: new Date().toISOString(),
        });
      }
    });

    // Sort reminders by priority and due date
    generatedReminders.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    reminders.set(generatedReminders);
    isGenerating = false;
  }

  function extractReminderText(content) {
    // Extract the first meaningful sentence or key points
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 10);
    return sentences[0]?.trim() || content.slice(0, 100) + "...";
  }

  function determinePriority(content) {
    const highKeywords = ["urgent", "asap", "critical", "important", "deadline", "due today"];
    const mediumKeywords = ["soon", "meeting", "call", "review", "check"];

    if (highKeywords.some((keyword) => content.includes(keyword))) return "high";
    if (mediumKeywords.some((keyword) => content.includes(keyword))) return "medium";
    return "low";
  }

  function estimateDueDate(content) {
    const today = new Date();
    const contentLower = content.toLowerCase();

    if (contentLower.includes("tomorrow")) {
      return new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    }
    if (contentLower.includes("next week")) {
      return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    }
    if (contentLower.includes("next month")) {
      return new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split("T")[0];
    }
    if (contentLower.includes("today")) {
      return today.toISOString().split("T")[0];
    }

    // Default to 3 days from now
    return new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  }

  function dismissReminder(reminderId) {
    reminders.update((current) => current.filter((r) => r.id !== reminderId));
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-400 border-red-400/30 bg-red-400/10";
      case "medium":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "low":
        return "text-green-400 border-green-400/30 bg-green-400/10";
      default:
        return "text-blue-400 border-blue-400/30 bg-blue-400/10";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "note":
        return "📝";
      case "event":
        return "📅";
      case "followup":
        return "🔄";
      default:
        return "🔔";
    }
  }
</script>

<div class="reminders-page min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
        <span class="text-5xl">🔔</span>
        Smart Reminders
      </h1>
      <p class="text-white/70 text-lg">AI-powered reminders generated from your notes and calendar</p>
    </div>

    <!-- Controls -->
    <div class="flex justify-center mb-6">
      <button class="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 {isGenerating ? 'loading' : ''}" on:click={generateAutoReminders} disabled={isGenerating}>
        {#if isGenerating}
          <span class="text-blue-400">🔄</span> Analyzing...
        {:else}
          <span class="text-green-400">✨</span> Generate Reminders
        {/if}
      </button>
    </div>

    <!-- Reminders Grid -->
    {#if $reminders.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $reminders as reminder}
          <div class="reminder-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{getTypeIcon(reminder.type)}</span>
                <div>
                  <h3 class="text-white font-semibold text-lg">{reminder.title}</h3>
                  <span class="text-xs text-white/60 uppercase tracking-wide">{reminder.source}</span>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm text-white/60 hover:text-red-400" on:click={() => dismissReminder(reminder.id)} aria-label="Dismiss reminder"> ✕ </button>
            </div>

            <!-- Content -->
            <p class="text-white/80 mb-4 leading-relaxed">{reminder.description}</p>

            <!-- Footer -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-medium border {getPriorityColor(reminder.priority)}">
                  {reminder.priority.toUpperCase()}
                </span>
                <span class="text-white/60 text-sm">
                  Due: {new Date(reminder.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div class="w-4 h-4 rounded-full shadow-lg" style="background-color: {reminder.color}"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="text-center py-16">
        <div class="text-8xl mb-6 text-white/20">🔔</div>
        <h3 class="text-2xl font-semibold text-white mb-2">No Reminders Yet</h3>
        <p class="text-white/60 mb-6">Create some notes or calendar events to generate smart reminders</p>
        <button class="btn btn-primary btn-lg shadow-xl" on:click={generateAutoReminders}>
          <span class="text-blue-400">🔍</span> Analyze Content
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .reminders-page {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .reminder-card {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .reminder-card:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Loading animation */
  .loading::after {
    content: "";
    width: 1em;
    height: 1em;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 0.5em;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
