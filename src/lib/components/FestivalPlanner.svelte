<script>
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";

  let currentRole;
  let selectedMonth = new Date().getMonth();
  let selectedYear = new Date().getFullYear();

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
  });

  // Festival data with regional variations
  const festivals = {
    // South Indian Festivals
    pongal: {
      name: { en: "Pongal", ta: "பொங்கல்", te: "పొంగల్", kn: "ಪೊಂಗಲ್", ml: "പൊങ്കാൾ" },
      date: "2024-01-14",
      region: "South India",
      description: "Harvest festival celebrating the sun and nature",
      rituals: ["Boiling rice", "Decorating with kolam", "Family prayers"],
      icon: "mdi:sun",
      color: "bg-orange-100 text-orange-800"
    },
    ugadi: {
      name: { en: "Ugadi", ta: "உகாதி", te: "ఉగాది", kn: "ಉಗಾದಿ", ml: "ഉഗാദി" },
      date: "2024-03-30",
      region: "South India",
      description: "Telugu and Kannada New Year",
      rituals: ["Eating neem leaves", "Family gatherings", "Temple visits"],
      icon: "mdi:calendar-star",
      color: "bg-green-100 text-green-800"
    },
    onam: {
      name: { en: "Onam", ta: "ஓணம்", te: "ఓణం", kn: "ಓಣಂ", ml: "ഓണം" },
      date: "2024-08-26",
      region: "Kerala",
      description: "Kerala's harvest festival",
      rituals: ["Pookalam decoration", "Traditional feast", "Boat races"],
      icon: "mdi:flower",
      color: "bg-yellow-100 text-yellow-800"
    },

    // North Indian Festivals
    holi: {
      name: { en: "Holi", hi: "होली", pa: "ਹੋਲੀ", bn: "হোলি" },
      date: "2024-03-14",
      region: "North India",
      description: "Festival of colors celebrating spring",
      rituals: ["Color throwing", "Bonfire", "Sweet sharing"],
      icon: "mdi:palette",
      color: "bg-pink-100 text-pink-800"
    },
    diwali: {
      name: { en: "Diwali", hi: "दिवाली", pa: "ਦੀਵਾਲੀ", bn: "দীপাবলী", gu: "દિવાળી", mr: "दिवाळी" },
      date: "2024-10-29",
      region: "Pan India",
      description: "Festival of lights",
      rituals: ["Lamp lighting", "Fireworks", "Sweets distribution"],
      icon: "mdi:lightbulb",
      color: "bg-yellow-100 text-yellow-800"
    },
    durga_puja: {
      name: { en: "Durga Puja", hi: "दुर्गा पूजा", bn: "দুর্গা পূজা", or: "ଦୁର୍ଗା ପୂଜା", as: "দুৰ্গা পূজা" },
      date: "2024-10-03",
      region: "East India",
      description: "Worship of Goddess Durga",
      rituals: ["Pandal decoration", "Dhaki performance", "Immersion"],
      icon: "mdi:temple-hindu",
      color: "bg-red-100 text-red-800"
    },

    // West Indian Festivals
    ganesh_chaturthi: {
      name: { en: "Ganesh Chaturthi", hi: "गणेश चतुर्थी", mr: "गणेश चतुर्थी", gu: "ગણેશ ચતુર્થી" },
      date: "2024-09-07",
      region: "Maharashtra",
      description: "Celebration of Lord Ganesha",
      rituals: ["Idol installation", "Modak offering", "Immersion"],
      icon: "mdi:elephant",
      color: "bg-purple-100 text-purple-800"
    },

    // Common Festivals
    raksha_bandhan: {
      name: { en: "Raksha Bandhan", hi: "रक्षाबंधन", pa: "ਰਕਸ਼ਾ ਬੰਧਨ", bn: "রক্ষা বন্ধন", gu: "રક્ષાબંધન" },
      date: "2024-08-19",
      region: "Pan India",
      description: "Bond between brothers and sisters",
      rituals: ["Rakhi tying", "Sweet distribution", "Blessings"],
      icon: "mdi:hand-heart",
      color: "bg-blue-100 text-blue-800"
    },
    janmashtami: {
      name: { en: "Janmashtami", hi: "जन्माष्टमी", pa: "ਜਨਮਾਸ਼ਟਮੀ", bn: "জন্মাষ্টমী", or: "ଜନ୍ମାଷ୍ଟମୀ" },
      date: "2024-08-26",
      region: "Pan India",
      description: "Birthday of Lord Krishna",
      rituals: ["Fasting", "Dahi handi", "Bhajan singing"],
      icon: "mdi:baby-face",
      color: "bg-indigo-100 text-indigo-800"
    },
    navratri: {
      name: { en: "Navratri", hi: "नवरात्रि", gu: "નવરાત્રી", mr: "नवरात्री", bn: "নবরাত্রি" },
      date: "2024-10-03",
      region: "Pan India",
      description: "Nine nights of celebration",
      rituals: ["Garba dancing", "Fasting", "Goddess worship"],
      icon: "mdi:dance-ballroom",
      color: "bg-pink-100 text-pink-800"
    }
  };

  // Get festivals for current month
  $: currentMonthFestivals = Object.entries(festivals).filter(([key, festival]) => {
    const festivalDate = new Date(festival.date);
    return festivalDate.getMonth() === selectedMonth && festivalDate.getFullYear() === selectedYear;
  });

  // Get upcoming festivals (next 30 days)
  $: upcomingFestivals = Object.entries(festivals)
    .map(([key, festival]) => ({ key, ...festival }))
    .filter(festival => new Date(festival.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function changeMonth(delta) {
    selectedMonth += delta;
    if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear--;
    } else if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear++;
    }
  }

  function getFestivalName(festival, lang = 'en') {
    return festival.name[lang] || festival.name.en;
  }
</script>

<div class="festival-planner bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen p-6">
  <!-- Header -->
  <div class="max-w-6xl mx-auto mb-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-800 mb-2">🪔 Festival & Ritual Planner</h1>
      <p class="text-lg text-orange-600">Celebrate traditions with family and community</p>
    </div>

    <!-- Month Navigation -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex items-center justify-between">
        <button
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          on:click={() => changeMonth(-1)}
        >
          <Icon icon="mdi:chevron-left" class="w-6 h-6 text-gray-600" />
        </button>

        <h2 class="text-2xl font-bold text-gray-800">
          {months[selectedMonth]} {selectedYear}
        </h2>

        <button
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          on:click={() => changeMonth(1)}
        >
          <Icon icon="mdi:chevron-right" class="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Upcoming Festivals -->
    <div class="lg:col-span-2">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Upcoming Festivals</h2>
          <Icon icon="mdi:calendar-star" class="w-6 h-6 text-orange-500" />
        </div>

        <div class="space-y-4">
          {#each upcomingFestivals as festival}
            <div class="flex items-center space-x-4 p-4 bg-gradient-to-r {festival.color} rounded-lg border border-gray-100">
              <Icon icon={festival.icon} class="w-10 h-10 text-current" />
              <div class="flex-1">
                <h3 class="font-bold text-lg">{getFestivalName(festival)}</h3>
                <p class="text-sm opacity-90">{festival.description}</p>
                <p class="text-xs mt-1 opacity-75">
                  {new Date(festival.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {festival.region}
                </p>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium">
                  {Math.ceil((new Date(festival.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                </div>
                <div class="text-xs opacity-75">remaining</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Monthly Festivals -->
    <div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">This Month</h2>
          <Icon icon="mdi:calendar-month" class="w-6 h-6 text-blue-500" />
        </div>

        {#if currentMonthFestivals.length > 0}
          <div class="space-y-3">
            {#each currentMonthFestivals as [key, festival]}
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <Icon icon={festival.icon} class="w-6 h-6 {festival.color.split(' ')[1]}" />
                  <div>
                    <h4 class="font-medium text-gray-800">{getFestivalName(festival)}</h4>
                    <p class="text-sm text-gray-600">{festival.region}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <Icon icon="mdi:calendar-blank" class="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No festivals this month</p>
          </div>
        {/if}
      </div>

      <!-- Ritual Planning -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Ritual Planning</h2>
          <Icon icon="mdi:book-open-variant" class="w-6 h-6 text-green-500" />
        </div>

        <div class="space-y-4">
          {#each upcomingFestivals.slice(0, 3) as festival}
            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 class="font-medium text-green-800 mb-2">{getFestivalName(festival)}</h4>
              <div class="space-y-2">
                {#each festival.rituals.slice(0, 2) as ritual}
                  <div class="flex items-center space-x-2">
                    <Icon icon="mdi:check-circle-outline" class="w-4 h-4 text-green-600" />
                    <span class="text-sm text-green-700">{ritual}</span>
                  </div>
                {/each}
              </div>
              <button class="mt-3 text-sm text-green-600 hover:text-green-800 font-medium">
                Plan rituals →
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Cultural Tips -->
  <div class="max-w-6xl mx-auto mt-8">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Cultural Tips</h2>
        <Icon icon="mdi:lightbulb" class="w-6 h-6 text-yellow-500" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 bg-blue-50 rounded-lg">
          <Icon icon="mdi:account-group" class="w-8 h-8 text-blue-600 mb-2" />
          <h3 class="font-medium text-blue-800 mb-1">Family Participation</h3>
          <p class="text-sm text-blue-700">Involve all family members in festival preparations and rituals</p>
        </div>

        <div class="p-4 bg-purple-50 rounded-lg">
          <Icon icon="mdi:leaf" class="w-8 h-8 text-purple-600 mb-2" />
          <h3 class="font-medium text-purple-800 mb-1">Eco-Friendly</h3>
          <p class="text-sm text-purple-700">Use natural colors and materials for traditional celebrations</p>
        </div>

        <div class="p-4 bg-orange-50 rounded-lg">
          <Icon icon="mdi:food" class="w-8 h-8 text-orange-600 mb-2" />
          <h3 class="font-medium text-orange-800 mb-1">Traditional Cuisine</h3>
          <p class="text-sm text-orange-700">Prepare regional specialties and share with neighbors</p>
        </div>
      </div>
    </div>
  </div>
</div>