<script>
  import { createEventDispatcher } from "svelte";
  import { inferEmotion, getEmotionColor, getEmotionIcon } from "$lib/utils/emotion";
  import Icon from "@iconify/svelte";

  export let notes = "";
  export let gratitude = "";
  export let flow = "medium";
  export let mood = "neutral";
  export let symptoms = [];

  const dispatch = createEventDispatcher();

  let inferredEmotion = "neutral";

  $: if (notes) {
    inferredEmotion = inferEmotion(notes);
    dispatch("emotionChange", { emotion: inferredEmotion });
  }

  const flowOptions = [
    { value: "light", label: "குறைந்த", color: "bg-blue-100 text-blue-800" },
    { value: "medium", label: "நடுத்தர", color: "bg-green-100 text-green-800" },
    { value: "heavy", label: "அதிக", color: "bg-red-100 text-red-800" },
    { value: "spotting", label: "சிறிய துளி", color: "bg-purple-100 text-purple-800" },
  ];

  const moodOptions = [
    { value: "calm", label: "அமைதியான", icon: "heroicons:face-smile" },
    { value: "irritable", label: "எரிச்சலான", icon: "heroicons:face-frown" },
    { value: "sad", label: "வருத்தமான", icon: "heroicons:face-frown" },
    { value: "energized", label: "ஆற்றலான", icon: "heroicons:bolt" },
    { value: "neutral", label: "நடுநிலையான", icon: "heroicons:minus-circle" },
  ];

  const commonSymptoms = ["வலி", "தலைவலி", "களைப்பு", "மன அழுத்தம்", "மார்பு வலி", "வயிற்று வலி", "முதுகு வலி", "குமட்டல்"];

  function toggleSymptom(symptom) {
    if (symptoms.includes(symptom)) {
      symptoms = symptoms.filter((s) => s !== symptom);
    } else {
      symptoms = [...symptoms, symptom];
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">இன்றைய பதிவு</h3>

  <!-- Flow Level -->
  <fieldset class="mb-4">
    <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ஓட்டம் நிலை</legend>
    <div class="flex gap-2">
      {#each flowOptions as option}
        <button class="px-3 py-1 rounded-full text-sm font-medium transition-colors {flow === option.value ? option.color : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}" on:click={() => (flow = option.value)}>
          {option.label}
        </button>
      {/each}
    </div>
  </fieldset>

  <!-- Mood Selection -->
  <fieldset class="mb-4">
    <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">மனநிலை</legend>
    <div class="grid grid-cols-5 gap-2">
      {#each moodOptions as option}
        <button class="p-3 rounded-lg border-2 transition-all {mood === option.value ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'}" on:click={() => (mood = option.value)}>
          <Icon icon={option.icon} class="w-6 h-6 mx-auto mb-1" />
          <div class="text-xs">{option.label}</div>
        </button>
      {/each}
    </div>
  </fieldset>

  <!-- Symptoms -->
  <fieldset class="mb-4">
    <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">அறிகுறிகள்</legend>
    <div class="flex flex-wrap gap-2">
      {#each commonSymptoms as symptom}
        <button class="px-3 py-1 text-sm rounded-full border transition-colors {symptoms.includes(symptom) ? 'bg-pink-500 text-white border-pink-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-pink-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}" on:click={() => toggleSymptom(symptom)}>
          {symptom}
        </button>
      {/each}
    </div>
  </fieldset>

  <!-- Notes -->
  <div class="mb-4">
    <label for="period-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">குறிப்புகள்</label>
    <textarea id="period-notes" bind:value={notes} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="இன்று எப்படி உணர்கிறீர்கள்? என்ன நடந்தது?"></textarea>
  </div>

  <!-- Gratitude -->
  <div class="mb-4">
    <label for="period-gratitude" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">நன்றி</label>
    <input id="period-gratitude" type="text" bind:value={gratitude} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="இன்று நீங்கள் நன்றி சொல்ல விரும்புவது என்ன?" />
  </div>

  <!-- Inferred Emotion -->
  {#if notes}
    <div class="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4">
      <div class="flex items-center space-x-2">
        <Icon icon={getEmotionIcon(inferredEmotion)} class="w-5 h-5 text-pink-600" />
        <span class="text-sm font-medium text-pink-800 dark:text-pink-200">
          உங்கள் உணர்வு: {inferredEmotion === "calm" ? "அமைதியான" : inferredEmotion === "irritable" ? "எரிச்சலான" : inferredEmotion === "sad" ? "வருத்தமான" : inferredEmotion === "energized" ? "ஆற்றலான" : inferredEmotion === "low" ? "களைப்பான" : "நடுநிலையான"}
        </span>
      </div>
    </div>
  {/if}
</div>
