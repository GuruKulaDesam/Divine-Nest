<script lang="ts">
  import Icon from "@iconify/svelte";
  import { notes, noteActions } from "$lib/stores/notes";
  import { isListening, startVoiceRecognition, stopVoiceRecognition, transcript } from "$lib/stores/voiceAssistant";

  let newNoteContent = "";
  let selectedEmotion: "neutral" | "joy" | "stress" | "gratitude" = "neutral";

  function addNote() {
    if (!newNoteContent.trim()) return;

    noteActions.add({
      content: newNoteContent,
      emotionTag: selectedEmotion,
      voiceCreated: false,
    });

    newNoteContent = "";
    selectedEmotion = "neutral";
  }

  function removeNote(id: string) {
    noteActions.remove(id);
  }

  function getEmotionIcon(emotion: string) {
    switch (emotion) {
      case "joy":
        return "heroicons:face-smile";
      case "gratitude":
        return "heroicons:heart";
      case "sadness":
        return "heroicons:face-frown";
      case "anger":
        return "heroicons:exclamation-triangle";
      case "fear":
        return "heroicons:shield-exclamation";
      case "surprise":
        return "heroicons:eye";
      default:
        return "heroicons:chat-bubble-left";
    }
  }

  function getEmotionColor(emotion: string) {
    switch (emotion) {
      case "joy":
        return "text-yellow-600 bg-yellow-50";
      case "gratitude":
        return "text-pink-600 bg-pink-50";
      case "sadness":
        return "text-blue-600 bg-blue-50";
      case "anger":
        return "text-red-600 bg-red-50";
      case "fear":
        return "text-purple-600 bg-purple-50";
      case "surprise":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
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
        <Icon icon="heroicons:chat-bubble-left" class="w-8 h-8 text-green-600" />
        <h1 class="text-2xl font-bold text-gray-800">குறிப்புகள் (Notes)</h1>
      </div>
      <div class="flex items-center gap-3">
        <button on:click={handleVoiceCommand} class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors {$isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-green-600 text-white hover:bg-green-700'}">
          <Icon icon="heroicons:microphone" class="w-5 h-5" />
          {$isListening ? "Listening..." : "Voice"}
        </button>
        <div class="text-sm text-gray-500">
          {$notes.length} notes
        </div>
      </div>
    </div>

    <!-- Voice Transcript Display -->
    {#if $isListening || $transcript}
      <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <Icon icon="heroicons:microphone" class="w-4 h-4 text-green-600" />
          <span class="text-sm font-medium text-green-800">Voice Command</span>
        </div>
        <p class="text-green-700">{$transcript || "Listening..."}</p>
      </div>
    {/if}

    <!-- Add Note Form -->
    <div class="mb-6 bg-gray-50 rounded-lg p-4">
      <form on:submit|preventDefault={addNote}>
        <textarea bind:value={newNoteContent} placeholder="Write a note... (or say 'Shivo, note that...')" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" rows="3"></textarea>

        <div class="flex items-center justify-between mt-3">
          <div class="flex gap-2">
            {#each ["joy", "gratitude", "stress", "neutral"] as emotion (emotion)}
              <button type="button" on:click={() => (selectedEmotion = emotion as "neutral" | "joy" | "stress" | "gratitude")} class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedEmotion === emotion ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </button>
            {/each}
          </div>

          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-1" />
            Add Note
          </button>
        </div>
      </form>
    </div>

    <!-- Notes Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each $notes as note (note.id)}
        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <!-- Emotion Tag -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium {getEmotionColor(note.emotionTag || 'neutral')}">
              <Icon icon={getEmotionIcon(note.emotionTag || "neutral")} class="w-3 h-3" />
              {(note.emotionTag || "neutral").charAt(0).toUpperCase() + (note.emotionTag || "neutral").slice(1)}
            </div>

            {#if note.voiceCreated}
              <Icon icon="heroicons:microphone" class="w-4 h-4 text-green-500" />
            {/if}
          </div>

          <!-- Content -->
          <p class="text-gray-800 mb-3 leading-relaxed">
            {note.content}
          </p>

          <!-- Metadata -->
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>
              {new Date(note.timestamp).toLocaleDateString()}
            </span>

            <button on:click={() => removeNote(note.id)} class="text-red-500 hover:text-red-700 transition-colors">
              <Icon icon="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if $notes.length === 0}
      <div class="text-center py-12 text-gray-500">
        <Icon icon="heroicons:chat-bubble-left" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p class="text-lg font-medium">No notes yet</p>
        <p class="text-sm">Add your first note or try saying "Shivo, note that..."</p>
      </div>
    {/if}
  </div>
</div>
