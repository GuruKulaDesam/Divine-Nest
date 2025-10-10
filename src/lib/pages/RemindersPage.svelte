<script>
  import { onMount } from "svelte";
  import { getAll, table } from "../utils/dexie-db.js";
  import { writable } from "svelte/store";

  let notes = [];
  let events = [];
  let reminders = writable([]);
  let isGenerating = false;

  // Manual reminder form
  let showManualForm = false;
  let manualReminder = {
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "medium",
    notificationType: "sound", // sms, sound, call
    phoneNumber: "",
    isActive: true,
  };

  // Notification functions
  function playSound() {
    // Create a simple beep sound
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  function sendSMS(phoneNumber, message) {
    // In a real app, this would integrate with an SMS service
    // For demo purposes, we'll show an alert
    alert(`SMS would be sent to ${phoneNumber}: ${message}`);
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
  }

  function makeCall(phoneNumber) {
    // In a real app, this would integrate with a calling service
    // For demo purposes, we'll try to open tel: link
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, "_self");
    } else {
      alert("No phone number provided for call");
    }
  }

  function triggerNotification(reminder) {
    const message = `${reminder.title}: ${reminder.description}`;

    switch (reminder.notificationType) {
      case "sound":
        playSound();
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(reminder.title, { body: reminder.description });
        }
        break;
      case "sms":
        if (reminder.phoneNumber) {
          sendSMS(reminder.phoneNumber, message);
        }
        break;
      case "call":
        if (reminder.phoneNumber) {
          makeCall(reminder.phoneNumber);
        }
        break;
    }
  }

  // Request notification permission on mount
  onMount(async () => {
    notes = await getAll("notes");
    events = await getAll("calendar");

    // Load existing reminders from database
    const savedReminders = await getAll("reminders");
    reminders.set(savedReminders);

    generateAutoReminders();

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  });

  // Generate auto-reminders based on notes and calendar events
  async function generateAutoReminders() {
    isGenerating = true;

    const generatedReminders = [];

    // Get existing saved reminders first
    const currentReminders = await getAll("reminders");
    const savedReminders = currentReminders.filter((r) => r.type === "manual");

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
      const timeDiff = eventDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

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

      return Number(new Date(a.dueDate)) - Number(new Date(b.dueDate));
    });

    // Combine saved reminders with generated ones
    const allReminders = [...savedReminders, ...generatedReminders];
    reminders.set(allReminders);
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

  async function dismissReminder(reminderId) {
    // Delete from database
    await deleteReminderFromDB(reminderId);

    // Update store
    reminders.update((current) => current.filter((r) => r.id !== reminderId));
  }

  async function updateReminderInDB(reminderId, updates) {
    try {
      await table("reminders").update(reminderId, updates);
    } catch (error) {
      console.error("Error updating reminder in database:", error);
    }
  }

  async function deleteReminderFromDB(reminderId) {
    try {
      await table("reminders").delete(reminderId);
    } catch (error) {
      console.error("Error deleting reminder from database:", error);
    }
  }

  async function saveReminderToDB(reminder) {
    try {
      await table("reminders").add(reminder);
    } catch (error) {
      console.error("Error saving reminder to database:", error);
    }
  }

  async function createManualReminder() {
    if (!manualReminder.title || !manualReminder.dueDate) {
      alert("Please provide at least a title and due date");
      return;
    }

    const newReminder = {
      id: `manual-${Date.now()}`,
      type: "manual",
      title: manualReminder.title,
      description: manualReminder.description || "Manual reminder",
      priority: manualReminder.priority,
      dueDate: manualReminder.dueDate,
      dueTime: manualReminder.dueTime,
      source: "Manual Creation",
      color: getPriorityColor(manualReminder.priority).includes("red") ? "#ef4444" : getPriorityColor(manualReminder.priority).includes("yellow") ? "#f59e0b" : "#10b981",
      createdAt: new Date().toISOString(),
      notificationType: manualReminder.notificationType,
      phoneNumber: manualReminder.phoneNumber,
      isActive: manualReminder.isActive,
    };

    // Save to database first
    await saveReminderToDB(newReminder);

    // Then update the store
    reminders.update((current) => [...current, newReminder]);

    // Reset form
    manualReminder = {
      title: "",
      description: "",
      dueDate: "",
      dueTime: "",
      priority: "medium",
      notificationType: "sound",
      phoneNumber: "",
      isActive: true,
    };

    showManualForm = false;
    alert("Manual reminder created!");
  }

  async function triggerManualReminder(reminder) {
    if (!reminder.isActive) return;

    triggerNotification(reminder);

    // Mark as inactive after triggering and save to database
    const updatedReminder = { ...reminder, isActive: false };
    await updateReminderInDB(reminder.id, { isActive: false });

    // Update store
    reminders.update((current) => current.map((r) => (r.id === reminder.id ? updatedReminder : r)));
  }

  async function toggleReminderActive(reminderId) {
    // Get current reminders
    let currentReminders = [];
    reminders.subscribe((current) => {
      currentReminders = current;
    })();

    const currentReminder = currentReminders.find((r) => r.id === reminderId);
    if (!currentReminder) return;

    const newActiveState = !currentReminder.isActive;

    // Update database
    await updateReminderInDB(reminderId, { isActive: newActiveState });

    // Update store
    reminders.update((current) => current.map((r) => (r.id === reminderId ? { ...r, isActive: newActiveState } : r)));
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

<div class="reminders-page min-h-screen mountain-background p-6">
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
    <div class="flex justify-center mb-6 gap-4">
      <button class="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 {isGenerating ? 'loading' : ''}" on:click={generateAutoReminders} disabled={isGenerating}>
        {#if isGenerating}
          <span class="text-blue-400">🔄</span> Analyzing...
        {:else}
          <span class="text-green-400">✨</span> Generate Reminders
        {/if}
      </button>
      <button class="btn btn-secondary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300" on:click={() => (showManualForm = !showManualForm)}>
        <span class="text-purple-400">➕</span> Create Manual
      </button>
    </div>

    <!-- Manual Reminder Form -->
    {#if showManualForm}
      <div class="manual-form-card backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl p-6 mb-6 shadow-2xl">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span class="text-purple-400">📝</span> Create Manual Reminder
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-white/80">
            Title *
            <input type="text" bind:value={manualReminder.title} placeholder="Reminder title" class="input w-full bg-white/10 border-white/20 text-white placeholder-white/50" />
          </label>
          <label class="text-white/80">
            Priority
            <div class="flex gap-4 mt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.priority} value="low" class="radio radio-primary" />
                <span class="text-sm">Low</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.priority} value="medium" class="radio radio-primary" />
                <span class="text-sm">Medium</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.priority} value="high" class="radio radio-primary" />
                <span class="text-sm">High</span>
              </label>
            </div>
          </label>
          <label class="text-white/80">
            Due Date *
            <input type="date" bind:value={manualReminder.dueDate} class="input w-full bg-white/10 border-white/20 text-white" />
          </label>
          <label class="text-white/80">
            Due Time
            <input type="time" bind:value={manualReminder.dueTime} class="input w-full bg-white/10 border-white/20 text-white" />
          </label>
          <label class="text-white/80">
            Notification Type
            <div class="flex flex-col gap-2 mt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.notificationType} value="sound" class="radio radio-primary" />
                <span class="text-sm">🔊 Sound + Browser Notification</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.notificationType} value="sms" class="radio radio-primary" />
                <span class="text-sm">📱 SMS</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" bind:group={manualReminder.notificationType} value="call" class="radio radio-primary" />
                <span class="text-sm">📞 Call</span>
              </label>
            </div>
          </label>
          {#if manualReminder.notificationType !== "sound"}
            <label class="text-white/80">
              Phone Number
              <input type="tel" bind:value={manualReminder.phoneNumber} placeholder="+1234567890" class="input w-full bg-white/10 border-white/20 text-white placeholder-white/50" />
            </label>
          {/if}
          <label class="md:col-span-2 text-white/80">
            Description
            <textarea bind:value={manualReminder.description} placeholder="Additional details..." rows="3" class="textarea w-full bg-white/10 border-white/20 text-white placeholder-white/50"></textarea>
          </label>
        </div>
        <div class="flex gap-3 justify-end mt-6">
          <button class="btn btn-ghost text-white/80 hover:bg-white/10" on:click={() => (showManualForm = false)}> Cancel </button>
          <button class="btn btn-primary" on:click={createManualReminder}>
            <span class="text-green-400">✓</span> Create Reminder
          </button>
        </div>
      </div>
    {/if}

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
              <div class="flex items-center gap-2">
                {#if reminder.type === "manual"}
                  <button class="btn btn-ghost btn-sm text-white/60 hover:text-white" on:click={() => toggleReminderActive(reminder.id)} title={reminder.isActive ? "Disable reminder" : "Enable reminder"}>
                    {reminder.isActive ? "🔊" : "🔇"}
                  </button>
                  <button class="btn btn-primary btn-sm" on:click={() => triggerManualReminder(reminder)} disabled={!reminder.isActive} title="Trigger notification">
                    {reminder.notificationType === "sound" ? "🔊" : reminder.notificationType === "sms" ? "📱" : "📞"}
                  </button>
                {/if}
                <button class="btn btn-ghost btn-sm text-white/60 hover:text-red-400" on:click={() => dismissReminder(reminder.id)} aria-label="Dismiss reminder"> ✕ </button>
              </div>
            </div>

            <!-- Content -->
            <p class="text-white/80 mb-4 leading-relaxed">{reminder.description}</p>

            <!-- Notification Info for Manual Reminders -->
            {#if reminder.type === "manual"}
              <div class="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <div class="flex items-center gap-2 text-sm text-white/70">
                  <span class="font-medium">Notification:</span>
                  <span class="px-2 py-1 bg-white/10 rounded text-xs">
                    {reminder.notificationType === "sound" ? "🔊 Sound + Browser" : reminder.notificationType === "sms" ? "📱 SMS" : "📞 Call"}
                    {#if reminder.phoneNumber}
                      ({reminder.phoneNumber})
                    {/if}
                  </span>
                  <span class="ml-auto text-xs {reminder.isActive ? 'text-green-400' : 'text-red-400'}">
                    {reminder.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            {/if}

            <!-- Footer -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-medium border {getPriorityColor(reminder.priority)}">
                  {reminder.priority.toUpperCase()}
                </span>
                <span class="text-white/60 text-sm">
                  Due: {new Date(reminder.dueDate).toLocaleDateString()}
                  {#if reminder.dueTime}
                    at {reminder.dueTime}
                  {/if}
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
    position: relative;
    overflow: hidden;
  }

  .mountain-background {
    position: relative;
    overflow: hidden;
    background-image: url("/Cover.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .mountain-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3); /* Dark overlay for better text readability */
    z-index: 0;
  }
  .reminders-page {
    /* Transparent background with gradient border */
    min-height: 100vh;
    position: relative;
  }

  .reminders-page::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid transparent;
    border-image: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) 1;
    border-radius: 20px;
    pointer-events: none;
    z-index: -1;
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

  .manual-form-card {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  /* Input styling for manual form */
  .input,
  .select,
  .textarea {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
  }

  .input:focus,
  .select:focus,
  .textarea:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  .input::placeholder,
  .textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
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
