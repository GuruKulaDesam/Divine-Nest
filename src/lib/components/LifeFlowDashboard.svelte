<script>
  import { onMount } from "svelte";
  import { lifeflowDB } from "../data/lifeflow.js";

  let activeTab = "emotions";
  let emotions = [];
  let familyStories = [];
  let familyValues = [];
  let lifeEvents = [];

  // Form data
  let newEmotion = { emotion: "", intensity: 5, context: "", notes: "" };
  let newStory = { title: "", storyteller: "", content: "", category: "", tags: "" };
  let newValue = { value: "", description: "", examples: "", importance: "Medium" };
  let newEvent = { eventType: "", person: "", date: "", description: "", impact: "", lessons: "" };

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    try {
      emotions = await lifeflowDB.emotions.orderBy("timestamp").reverse().limit(10).toArray();
      familyStories = await lifeflowDB.familyStories.orderBy("dateRecorded").reverse().limit(10).toArray();
      familyValues = await lifeflowDB.familyValues.toArray();
      lifeEvents = await lifeflowDB.lifeEvents.orderBy("date").reverse().limit(10).toArray();
    } catch (error) {
      console.error("Failed to load LifeFlow data:", error);
    }
  }

  async function addEmotion() {
    if (!newEmotion.emotion.trim()) return;

    try {
      await lifeflowDB.emotions.add({
        ...newEmotion,
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
      });
      newEmotion = { emotion: "", intensity: 5, context: "", notes: "" };
      await loadData();
    } catch (error) {
      console.error("Failed to add emotion:", error);
    }
  }

  async function addFamilyStory() {
    if (!newStory.title.trim() || !newStory.content.trim()) return;

    try {
      await lifeflowDB.familyStories.add({
        ...newStory,
        tags: newStory.tags.split(",").map((tag) => tag.trim()),
        dateRecorded: new Date().toISOString(),
        importance: "Medium",
      });
      newStory = { title: "", storyteller: "", content: "", category: "", tags: "" };
      await loadData();
    } catch (error) {
      console.error("Failed to add family story:", error);
    }
  }

  async function addFamilyValue() {
    if (!newValue.value.trim() || !newValue.description.trim()) return;

    try {
      await lifeflowDB.familyValues.add({
        ...newValue,
        examples: newValue.examples.split(",").map((ex) => ex.trim()),
        lastReviewed: new Date().toISOString(),
      });
      newValue = { value: "", description: "", examples: "", importance: "Medium" };
      await loadData();
    } catch (error) {
      console.error("Failed to add family value:", error);
    }
  }

  async function addLifeEvent() {
    if (!newEvent.eventType.trim() || !newEvent.person.trim()) return;

    try {
      await lifeflowDB.lifeEvents.add({
        ...newEvent,
        status: "Active",
      });
      newEvent = { eventType: "", person: "", date: "", description: "", impact: "", lessons: "" };
      await loadData();
    } catch (error) {
      console.error("Failed to add life event:", error);
    }
  }

  function getEmotionColor(intensity) {
    if (intensity >= 8) return "text-green-400";
    if (intensity >= 6) return "text-yellow-400";
    if (intensity >= 4) return "text-orange-400";
    return "text-red-400";
  }

  function getImportanceColor(importance) {
    switch (importance) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  }
</script>

<div class="space-y-6">
  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'emotions' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "emotions")}> 💭 Emotional Health </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'legacy' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "legacy")}> 📖 Legacy Memory </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'transitions' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "transitions")}> 🌱 Life Transitions </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'governance' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "governance")}> ⚖️ Family Governance </button>
  </div>

  <!-- Emotional Health Tab -->
  {#if activeTab === "emotions"}
    <div class="space-y-6">
      <!-- Add Emotion Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Track Your Emotions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newEmotion.emotion} placeholder="Emotion (e.g., Joy, Gratitude, Anxiety)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <div class="flex items-center space-x-2">
            <label class="text-white/80">Intensity:</label>
            <input type="range" min="1" max="10" bind:value={newEmotion.intensity} class="flex-1" />
            <span class="text-white w-8">{newEmotion.intensity}</span>
          </div>
          <input bind:value={newEmotion.context} placeholder="Context (e.g., Family gathering, Work stress)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea bind:value={newEmotion.notes} placeholder="Additional notes..." rows="2" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
        </div>
        <button on:click={addEmotion} class="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"> Add Emotion </button>
      </div>

      <!-- Emotions List -->
      <div class="space-y-4">
        {#each emotions as emotion}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-lg font-semibold text-white">{emotion.emotion}</h4>
                <p class="text-white/70">{emotion.context}</p>
                {#if emotion.notes}
                  <p class="text-white/60 text-sm mt-2">{emotion.notes}</p>
                {/if}
              </div>
              <div class="text-right">
                <div class="text-2xl {getEmotionColor(emotion.intensity)}">
                  {emotion.intensity}/10
                </div>
                <div class="text-white/50 text-sm">{new Date(emotion.date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Legacy Memory Tab -->
  {#if activeTab === "legacy"}
    <div class="space-y-6">
      <!-- Add Family Story Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Preserve Family Stories</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newStory.title} placeholder="Story Title" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newStory.storyteller} placeholder="Storyteller (e.g., Grandfather, Mother)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newStory.category} placeholder="Category (e.g., Historical, Culinary, Spiritual)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newStory.tags} placeholder="Tags (comma separated)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea bind:value={newStory.content} placeholder="Story content..." rows="4" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
        </div>
        <button on:click={addFamilyStory} class="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"> Add Family Story </button>
      </div>

      <!-- Family Stories List -->
      <div class="space-y-4">
        {#each familyStories as story}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-lg font-semibold text-white">{story.title}</h4>
              <span class="px-2 py-1 bg-white/20 rounded text-xs text-white">
                {story.category}
              </span>
            </div>
            <p class="text-white/70 text-sm mb-2">By {story.storyteller}</p>
            <p class="text-white/80 mb-3">{story.content}</p>
            <div class="flex flex-wrap gap-2">
              {#each story.tags as tag}
                <span class="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Family Values Section -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Family Values</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input bind:value={newValue.value} placeholder="Value (e.g., Respect for Elders)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <select bind:value={newValue.importance} class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <textarea bind:value={newValue.description} placeholder="Description..." rows="2" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
          <input bind:value={newValue.examples} placeholder="Examples (comma separated)" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
        </div>
        <button on:click={addFamilyValue} class="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg"> Add Family Value </button>

        <!-- Values List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {#each familyValues as value}
            <div class="bg-white/5 rounded-lg p-4 border border-white/10">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-white font-semibold">{value.value}</h4>
                <span class="px-2 py-1 {getImportanceColor(value.importance)} bg-white/10 rounded text-xs">
                  {value.importance}
                </span>
              </div>
              <p class="text-white/70 text-sm mb-2">{value.description}</p>
              <div class="text-white/60 text-xs">
                Examples: {value.examples.join(", ")}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Life Transitions Tab -->
  {#if activeTab === "transitions"}
    <div class="space-y-6">
      <!-- Add Life Event Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Track Life Transitions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newEvent.eventType} placeholder="Event Type (e.g., Graduation, Marriage, Career Change)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newEvent.person} placeholder="Person involved" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input type="date" bind:value={newEvent.date} class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea bind:value={newEvent.description} placeholder="Event description..." rows="2" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
          <input bind:value={newEvent.impact} placeholder="Impact on family" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea bind:value={newEvent.lessons} placeholder="Lessons learned..." rows="2" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
        </div>
        <button on:click={addLifeEvent} class="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"> Add Life Event </button>
      </div>

      <!-- Life Events List -->
      <div class="space-y-4">
        {#each lifeEvents as event}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-semibold text-white">{event.eventType}</h4>
                <p class="text-white/70">{event.person} • {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                {event.status}
              </span>
            </div>
            <p class="text-white/80 mb-2">{event.description}</p>
            {#if event.impact}
              <p class="text-white/70 text-sm mb-2"><strong>Impact:</strong> {event.impact}</p>
            {/if}
            {#if event.lessons}
              <p class="text-white/60 text-sm"><strong>Lessons:</strong> {event.lessons}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Family Governance Tab -->
  {#if activeTab === "governance"}
    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 class="text-xl font-semibold text-white mb-4">Family Governance</h3>
      <div class="text-center py-12">
        <div class="text-6xl mb-4">⚖️</div>
        <h4 class="text-xl text-white/80 mb-2">Coming Soon</h4>
        <p class="text-white/60">Family decision-making, rules, and governance meetings will be available in the next update.</p>
      </div>
    </div>
  {/if}
</div>
