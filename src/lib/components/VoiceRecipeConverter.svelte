<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  const dispatch = createEventDispatcher();

  let isRecording = false;
  let transcribedText = "";
  let convertedRecipe = null;
  let recordingTime = 0;
  let recordingInterval = null;

  // Mock voice recognition (in real app, would use Web Speech API)
  async function startRecording() {
    isRecording = true;
    recordingTime = 0;
    transcribedText = "";

    // Simulate recording timer
    recordingInterval = setInterval(() => {
      recordingTime++;
      if (recordingTime >= 10) {
        // Auto-stop after 10 seconds
        stopRecording();
      }
    }, 1000);
  }

  async function stopRecording() {
    isRecording = false;
    clearInterval(recordingInterval);

    // Mock transcription - in real app, this would come from speech recognition
    const mockTranscriptions = ["Take two cups of rice and one cup of toor dal. Cook them separately. Then take tamarind, make a paste, add sambar powder, turmeric, and salt. Cook vegetables like drumstick and brinjal. Mix everything together and let it boil for fifteen minutes. Finally add curry leaves and coriander.", "For rasam, soak tamarind and extract juice. Add tomatoes, crushed pepper, cumin seeds, and garlic. Let it boil with water and add salt. Finally season with curry leaves and serve hot with rice.", "Sweet pongal needs one cup rice and quarter cup moong dal. Cook them soft. Then melt jaggery and add to the mixture. Fry cashews and raisins in ghee and add them. Offer to god first."];

    transcribedText = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];

    // Simulate processing delay
    setTimeout(() => {
      convertToRecipe(transcribedText);
    }, 2000);
  }

  function convertToRecipe(text) {
    // Mock recipe conversion - in real app, this would use AI/ML
    const recipes = {
      sambar: {
        title: "Sambar Rice (Voice Converted)",
        category: "vegetarian",
        source: "traditional",
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        ingredients: [
          { ingredientId: "rice", name: "Rice", quantity: 2, unit: "cups" },
          { ingredientId: "toor-dal", name: "Toor Dal", quantity: 1, unit: "cup" },
          { ingredientId: "tamarind", name: "Tamarind", quantity: 1, unit: "small lemon size" },
          { ingredientId: "sambar-powder", name: "Sambar Powder", quantity: 2, unit: "tbsp" },
          { ingredientId: "turmeric", name: "Turmeric", quantity: 1, unit: "tsp" },
          { ingredientId: "salt", name: "Salt", quantity: 1, unit: "tsp" },
          { ingredientId: "vegetables", name: "Mixed Vegetables", quantity: 500, unit: "g" },
        ],
        steps: ["Cook rice and dal separately until soft", "Soak tamarind and extract juice", "Cook vegetables with tamarind water and spices", "Add cooked dal and simmer for 15 minutes", "Mix with rice and season with curry leaves"],
        culturalNotes: "Converted from voice instructions - traditional South Indian comfort food",
        tags: ["south-indian", "vegetarian", "voice-converted", "comfort-food"],
      },
      rasam: {
        title: "Rasam (Voice Converted)",
        category: "vegetarian",
        source: "traditional",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        ingredients: [
          { ingredientId: "tamarind", name: "Tamarind", quantity: 1, unit: "small lemon size" },
          { ingredientId: "tomato", name: "Tomato", quantity: 2, unit: "medium" },
          { ingredientId: "pepper", name: "Black Pepper", quantity: 1, unit: "tsp" },
          { ingredientId: "cumin", name: "Cumin Seeds", quantity: 1, unit: "tsp" },
          { ingredientId: "garlic", name: "Garlic", quantity: 3, unit: "cloves" },
          { ingredientId: "curry-leaves", name: "Curry Leaves", quantity: 1, unit: "sprig" },
        ],
        steps: ["Extract tamarind juice", "Cook tomatoes with tamarind water", "Add crushed pepper, cumin, and garlic", "Boil with water and add salt", "Season with curry leaves and serve hot"],
        culturalNotes: "Converted from voice instructions - healing soup for colds",
        tags: ["south-indian", "vegetarian", "soup", "medicinal", "voice-converted"],
      },
      pongal: {
        title: "Sweet Pongal (Voice Converted)",
        category: "vegetarian",
        source: "festival",
        prepTime: 5,
        cookTime: 25,
        servings: 6,
        ingredients: [
          { ingredientId: "rice", name: "Rice", quantity: 1, unit: "cup" },
          { ingredientId: "moong-dal", name: "Moong Dal", quantity: 0.25, unit: "cup" },
          { ingredientId: "jaggery", name: "Jaggery", quantity: 1, unit: "cup" },
          { ingredientId: "ghee", name: "Ghee", quantity: 2, unit: "tbsp" },
          { ingredientId: "cashews", name: "Cashews", quantity: 10, unit: "pieces" },
          { ingredientId: "raisins", name: "Raisins", quantity: 1, unit: "tbsp" },
        ],
        steps: ["Cook rice and dal with water until soft", "Melt jaggery and add to cooked mixture", "Fry nuts in ghee and add to pongal", "Offer to deities first, then serve"],
        culturalNotes: "Converted from voice instructions - festival dish for Pongal",
        tags: ["festival", "sweet", "pongal", "traditional", "voice-converted"],
      },
    };

    // Simple keyword matching to determine recipe type
    if (text.toLowerCase().includes("sambar")) {
      convertedRecipe = recipes.sambar;
    } else if (text.toLowerCase().includes("rasam")) {
      convertedRecipe = recipes.rasam;
    } else if (text.toLowerCase().includes("pongal")) {
      convertedRecipe = recipes.pongal;
    } else {
      // Default to sambar if no match
      convertedRecipe = recipes.sambar;
    }
  }

  function saveRecipe() {
    if (convertedRecipe) {
      // In real app, this would save to database
      alert("Recipe saved successfully! (This is a demo - recipe would be saved to database)");
      resetConverter();
      dispatch("dataChanged");
    }
  }

  function resetConverter() {
    isRecording = false;
    transcribedText = "";
    convertedRecipe = null;
    recordingTime = 0;
    clearInterval(recordingInterval);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="text-center mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
      <Icon icon="heroicons:microphone" class="text-blue-500" />
      Voice-to-Recipe Converter
    </h2>
    <p class="text-gray-600">Speak your traditional recipes and convert them to structured recipes</p>
  </div>

  <!-- Recording Interface -->
  <div class="text-center mb-8">
    <div class="mb-6">
      {#if isRecording}
        <div class="inline-flex items-center gap-4 p-6 bg-red-50 rounded-full border-4 border-red-200">
          <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Icon icon="heroicons:microphone" class="text-white text-2xl" />
          </div>
          <div class="text-left">
            <div class="text-red-600 font-semibold text-lg">Recording...</div>
            <div class="text-red-500">{formatTime(recordingTime)}</div>
          </div>
        </div>
      {:else}
        <div class="inline-flex items-center gap-4 p-6 bg-gray-50 rounded-full border-4 border-gray-200">
          <div class="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <Icon icon="heroicons:microphone" class="text-white text-2xl" />
          </div>
          <div class="text-left">
            <div class="text-gray-600 font-semibold text-lg">Ready to Record</div>
            <div class="text-gray-500">Click to start speaking</div>
          </div>
        </div>
      {/if}
    </div>

    <div class="flex justify-center gap-4">
      {#if !isRecording}
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={startRecording}>
          <Icon icon="heroicons:play" class="text-lg" />
          Start Recording
        </button>
      {:else}
        <button class="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={stopRecording}>
          <Icon icon="heroicons:stop" class="text-lg" />
          Stop Recording
        </button>
      {/if}

      <button class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={resetConverter}>
        <Icon icon="heroicons:arrow-path" class="text-lg" />
        Reset
      </button>
    </div>
  </div>

  <!-- Transcribed Text -->
  {#if transcribedText}
    <div class="mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200" in:fade>
      <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
        <Icon icon="heroicons:document-text" class="text-blue-500" />
        Transcribed Speech
      </h3>
      <p class="text-blue-700 leading-relaxed">{transcribedText}</p>
    </div>
  {/if}

  <!-- Converted Recipe -->
  {#if convertedRecipe}
    <div class="mb-6 p-6 bg-green-50 rounded-xl border border-green-200" in:fade>
      <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
        <Icon icon="heroicons:sparkles" class="text-green-500" />
        Converted Recipe
      </h3>

      <div class="bg-white rounded-lg p-6 mb-4">
        <h4 class="text-xl font-bold text-gray-800 mb-2">{convertedRecipe.title}</h4>
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span class="flex items-center gap-1">
            <Icon icon="heroicons:clock" class="text-gray-400" />
            {convertedRecipe.prepTime + convertedRecipe.cookTime} mins
          </span>
          <span class="flex items-center gap-1">
            <Icon icon="heroicons:users" class="text-gray-400" />
            {convertedRecipe.servings} servings
          </span>
          <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            {convertedRecipe.category}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 class="font-semibold text-gray-800 mb-2">Ingredients:</h5>
            <ul class="space-y-1">
              {#each convertedRecipe.ingredients as ingredient}
                <li class="text-sm text-gray-600 flex items-center gap-2">
                  <Icon icon="heroicons:check" class="text-green-500 text-xs" />
                  {ingredient.name} - {ingredient.quantity}
                  {ingredient.unit}
                </li>
              {/each}
            </ul>
          </div>

          <div>
            <h5 class="font-semibold text-gray-800 mb-2">Steps:</h5>
            <ol class="space-y-2">
              {#each convertedRecipe.steps as step, i}
                <li class="text-sm text-gray-600 flex items-start gap-2">
                  <span class="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              {/each}
            </ol>
          </div>
        </div>

        {#if convertedRecipe.culturalNotes}
          <div class="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p class="text-sm text-amber-800">{convertedRecipe.culturalNotes}</p>
          </div>
        {/if}
      </div>

      <div class="flex justify-center gap-4">
        <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={saveRecipe}>
          <Icon icon="heroicons:bookmark" class="text-lg" />
          Save Recipe
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          on:click={() => {
            /* Would navigate to edit mode */
          }}
        >
          <Icon icon="heroicons:pencil" class="text-lg" />
          Edit Recipe
        </button>
      </div>
    </div>
  {/if}

  <!-- Instructions -->
  <div class="p-6 bg-gray-50 rounded-xl">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">How to Use Voice Converter</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
      <div>
        <h4 class="font-medium text-gray-800 mb-2">Speak Clearly:</h4>
        <ul class="space-y-1">
          <li>• Mention ingredients with quantities</li>
          <li>• Describe cooking steps in order</li>
          <li>• Include cooking times and temperatures</li>
          <li>• Note any special techniques</li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-gray-800 mb-2">Examples:</h4>
        <ul class="space-y-1">
          <li>• "Take 2 cups rice and 1 cup dal..."</li>
          <li>• "Cook for 15 minutes then add spices"</li>
          <li>• "Serve hot with rice"</li>
          <li>• "This is Amma's special recipe"</li>
        </ul>
      </div>
    </div>
  </div>
</div>
