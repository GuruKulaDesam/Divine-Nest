<script lang="ts">
  import Icon from "@iconify/svelte";

  // Drik Panchangam iframe sources (traditional Hindu calendar)
  const drikPanchangamSources = [
    {
      name: "திரிகோணமித்ரம் திரிக் பஞ்சாங்கம்",
      url: "https://www.tamildrikpanchangam.com/",
      description: "மரபு தமிழ் திரிக் பஞ்சாங்கம் சேவை"
    },
    {
      name: "ஜோதிடம் திரிக் பஞ்சாங்கம்",
      url: "https://www.drikpanchang.com/",
      description: "விரிவான திரிக் பஞ்சாங்கம் தகவல்கள்"
    }
  ];

  let selectedSource = drikPanchangamSources[0];
  let showSourceSelector = false;
</script>

<svelte:head>
  <title>திரிக் பஞ்சாங்கம் - தெய்வீகம்</title>
  <meta name="description" content="மரபு தமிழ் திரிக் பஞ்சாங்கம் - தினசரி பஞ்சாங்க தகவல்கள், சுபகாலங்கள் மற்றும் திருவிழாக்கள்" />
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="text-center space-y-4">
    <div class="flex items-center justify-center space-x-3">
      <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
        <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          திரிக் பஞ்சாங்கம்
        </h1>
        <p class="text-lg text-base-content/70 mt-1">
          மரபு தமிழ் திரிக் பஞ்சாங்கம்
        </p>
      </div>
    </div>

    <p class="text-base-content/80 max-w-2xl mx-auto leading-relaxed">
      திரிக் பஞ்சாங்கம் என்பது தென்னிந்திய மரபில் பின்பற்றப்படும் மரபு காலமுறைமுறை ஆகும்.
      இது தினசரி பஞ்சாங்க தகவல்கள், சுபகாலங்கள், திருவிழாக்கள் மற்றும் ஜோதிட தகவல்களை வழங்குகிறது.
    </p>
  </div>

  <!-- Source Selector -->
  <div class="flex justify-center">
    <div class="relative">
      <button
        on:click={() => showSourceSelector = !showSourceSelector}
        class="btn btn-outline btn-primary flex items-center space-x-2"
      >
        <Icon icon="heroicons:globe-alt" class="w-5 h-5" />
        <span>{selectedSource.name}</span>
        <Icon icon={showSourceSelector ? "heroicons:chevron-up" : "heroicons:chevron-down"} class="w-4 h-4" />
      </button>

      {#if showSourceSelector}
        <div class="absolute top-full mt-2 w-80 bg-base-100 border border-base-300 rounded-lg shadow-xl z-50">
          <div class="p-2">
            {#each drikPanchangamSources as source}
              <button
                on:click={() => { selectedSource = source; showSourceSelector = false; }}
                class="w-full text-left p-3 rounded-lg hover:bg-base-200 transition-colors {selectedSource.url === source.url ? 'bg-primary/10 border border-primary/20' : ''}"
              >
                <div class="font-medium text-base-content">{source.name}</div>
                <div class="text-sm text-base-content/70">{source.description}</div>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Information Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-800/50">
      <div class="flex items-center space-x-3">
        <Icon icon="heroicons:clock" class="w-6 h-6 text-orange-600" />
        <div>
          <h3 class="font-semibold text-base-content">தினசரி புதுப்பித்தல்</h3>
          <p class="text-sm text-base-content/70">தினமும் புதுப்பிக்கப்படும் தகவல்கள்</p>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
      <div class="flex items-center space-x-3">
        <Icon icon="heroicons:sparkles" class="w-6 h-6 text-blue-600" />
        <div>
          <h3 class="font-semibold text-base-content">சுபகாலங்கள்</h3>
          <p class="text-sm text-base-content/70">திருமணம், கிரியைகள், பயணம்</p>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50">
      <div class="flex items-center space-x-3">
        <Icon icon="heroicons:cake" class="w-6 h-6 text-green-600" />
        <div>
          <h3 class="font-semibold text-base-content">திருவிழாக்கள்</h3>
          <p class="text-sm text-base-content/70">மாதாந்திர திருவிழா தகவல்கள்</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Iframe Container -->
  <div class="bg-white dark:bg-base-100 rounded-2xl shadow-xl border border-base-300/50 overflow-hidden">
    <div class="p-4 border-b border-base-300/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Icon icon="heroicons:calendar" class="w-5 h-5 text-primary" />
          <span class="font-medium text-base-content">{selectedSource.name}</span>
        </div>
        <div class="flex items-center space-x-2 text-sm text-base-content/70">
          <Icon icon="heroicons:external-link" class="w-4 h-4" />
          <a
            href={selectedSource.url}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            புதிய சாளரத்தில் திற
          </a>
        </div>
      </div>
    </div>

    <div class="relative">
      <!-- Loading indicator -->
      <div class="absolute inset-0 bg-base-100 flex items-center justify-center z-10" id="loading-indicator">
        <div class="flex flex-col items-center space-y-3">
          <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-base-content/70">திரிக் பஞ்சாங்கம் ஏற்றப்படுகிறது...</p>
        </div>
      </div>

      <!-- Iframe -->
      <iframe
        src={selectedSource.url}
        class="w-full h-[800px] border-0"
        title="திரிக் பஞ்சாங்கம்"
        on:load={() => { const indicator = document.getElementById('loading-indicator'); if (indicator) indicator.style.display = 'none'; }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      ></iframe>
    </div>
  </div>

  <!-- Footer Information -->
  <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 border border-orange-200/50 dark:border-orange-800/50">
    <div class="text-center space-y-3">
      <h3 class="text-xl font-semibold text-base-content">திரிக் பஞ்சாங்கம் பற்றி</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-base-content/80">
        <div class="space-y-2">
          <p><strong>திரிகோணமித்ரம்:</strong> தென்னிந்திய மரபில் பின்பற்றப்படும் மரபு காலமுறைமுறை</p>
          <p><strong>பயன்பாடு:</strong> திருமணம், கிரியைகள், பயணம், வீடு கட்டுதல் போன்றவற்றுக்கு சுபகாலம் தேர்ந்தெடுப்பு</p>
        </div>
        <div class="space-y-2">
          <p><strong>தகவல்கள்:</strong> திதி, நக்ஷத்திரம், யோகம், கரணம், ராசி மற்றும் நவகிரக தகவல்கள்</p>
          <p><strong>முக்கியத்துவம்:</strong> தினசரி வாழ்க்கையில் சுபகாலங்களை தேர்ந்தெடுப்பதற்கான வழிகாட்டி</p>
        </div>
      </div>
    </div>
  </div>
</div>