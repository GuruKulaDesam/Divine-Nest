<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentView = "daily";
  let selectedDate = new Date().toISOString().split("T")[0];
  let selectedMonth = new Date().getMonth();
  let selectedYear = new Date().getFullYear();
  let showMuhurthamModal = false;

  const views = [
    { id: "daily", label: "Daily Panchangam", icon: "heroicons:sun" },
    { id: "horoscope", label: "Daily Horoscope", icon: "heroicons:star" },
    { id: "monthly", label: "Monthly View", icon: "heroicons:calendar-days" },
    { id: "yearly", label: "Yearly Almanac", icon: "heroicons:calendar" },
    { id: "muhurtham", label: "Muhurtham Finder", icon: "heroicons:clock" },
  ];

  const tamilMonths = ["சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி", "தை", "மாசி", "பங்குனி"];

  const englishMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Current Panchangam data (October 6, 2025)
  const dailyPanchangam = {
    tamilDate: "20 புரட்டாசி 2046",
    englishDate: "Monday, 06 October 2025",
    sunrise: "06:06",
    sunset: "18:02",
    moonrise: "18:45",
    moonset: "06:12",
    tithi: "கிருஷ்ண அஷ்டமி (Krishna Ashtami)",
    nakshatra: "புனர்பூசம் (Punarpoosam)",
    yoga: "சித்த யோகம் (Siddha Yoga)",
    karana: "கௌலவம் (Kaulava)",
    rahuKalam: "07:30 - 09:00",
    yamagandam: "10:30 - 12:00",
    gulikaiKalam: "13:30 - 15:00",
    abhijitMuhurat: "11:45 - 12:30",
    nallaNeram: ["06:15 - 07:00", "16:30 - 17:15"],
    chandrashtama: ["பரணி", "கேட்டை"],
    auspiciousActivities: ["திருமணம் (Marriage)", "கிருஹப்பிரவேசம் (Gruhapravesam)", "நாマகரணம் (Naming Ceremony)", "கோவில் வழிபாடு (Temple Worship)"],
    inauspiciousActivities: ["கிழக்கு திசை பயணம் தவிர்க்க (Avoid travel East)", "புதிய வாங்குதல் தவிர்க்க (No new purchases)"],
    festivals: ["விநாயகர் சதுர்த்தி நோன்பு"],
    specialNotes: "இன்று கிருஷ்ண அஷ்டமி. பூஜைக்கு நன்மை தரும்.",
  };

  // Daily Horoscope data
  const dailyHoroscope = {
    date: "2025-10-06",
    zodiacSigns: [
      { sign: "மேஷம் (Aries)", prediction: "நல்ல நாள். புதிய திட்டங்களை தொடங்கலாம். வியாபாரத்தில் முன்னேற்றம் கிடைக்கும்.", rating: 4 },
      { sign: "ரிஷபம் (Taurus)", prediction: "குடும்பத்தில் மகிழ்ச்சி. நிதி நிலை சீராக இருக்கும். காதல் வாழ்க்கையில் இன்பம்.", rating: 5 },
      { sign: "மிதுனம் (Gemini)", prediction: "பயணம் சாத்தியம். நண்பர்களிடம் உதவி கிடைக்கும். ஆரோக்கியம் கவலை இல்லை.", rating: 4 },
      { sign: "கடகம் (Cancer)", prediction: "வேலை இடத்தில் மரியாதை கிடைக்கும். கல்வியில் முன்னேற்றம். குடும்பத்தில் ஒற்றுமை.", rating: 4 },
      { sign: "சிம்மம் (Leo)", prediction: "தைரியமாக செயல்படலாம். எதிரிகள் தோற்பார்கள். நல்ல செய்திகள் வரும்.", rating: 5 },
      { sign: "கன்னி (Virgo)", prediction: "உழைப்புக்கு பலன் கிடைக்கும். நிதி நிலை சீராக இருக்கும். ஆரோக்கியம் நல்லது.", rating: 4 },
      { sign: "துலாம் (Libra)", prediction: "காதல் வாழ்க்கையில் மகிழ்ச்சி. புதிய நண்பர்கள் கிடைக்கலாம். வியாபாரத்தில் லாபம்.", rating: 5 },
      { sign: "விருச்சிகம் (Scorpio)", prediction: "எதிர்பாராத வருமானம். குடும்பத்தில் ஒற்றுமை. ஆன்மீகத்தில் ஆர்வம் அதிகரிக்கும்.", rating: 4 },
      { sign: "தனுசு (Sagittarius)", prediction: "பயணம் சாத்தியம். வேலை இடத்தில் முன்னேற்றம். நண்பர்களிடம் உதவி.", rating: 4 },
      { sign: "மகரம் (Capricorn)", prediction: "கடின உழைப்புக்கு பலன். நிதி நிலை சீராக இருக்கும். குடும்பத்தில் மகிழ்ச்சி.", rating: 5 },
      { sign: "கும்பம் (Aquarius)", prediction: "புதிய வாய்ப்புகள் வரும். கல்வியில் முன்னேற்றம். ஆரோக்கியம் நல்லது.", rating: 4 },
      { sign: "மீனம் (Pisces)", prediction: "ஆன்மீகத்தில் ஆர்வம். காதல் வாழ்க்கையில் இன்பம். நிதி நிலை சீராக இருக்கும்.", rating: 5 },
    ],
  };

  // Current panchangam data (reactive)
  let currentPanchangam = { ...dailyPanchangam };
  let currentHoroscope = { ...dailyHoroscope };

  const monthlyHighlights = [
    { date: 1, type: "amavasya", name: "அமாவாசை", color: "bg-gray-800" },
    { date: 6, type: "sashti", name: "சஷ்டி", color: "bg-blue-600" },
    { date: 9, type: "navami", name: "நவமி", color: "bg-green-600" },
    { date: 11, type: "ekadashi", name: "ஏகாதசி", color: "bg-purple-600" },
    { date: 14, type: "pradosham", name: "பிரதோஷம்", color: "bg-orange-600" },
    { date: 15, type: "pournami", name: "பௌர்ணமி", color: "bg-yellow-600" },
    { date: 21, type: "saptami", name: "சப்தமி", color: "bg-indigo-600" },
    { date: 23, type: "navami", name: "நவமி", color: "bg-green-600" },
    { date: 26, type: "ekadashi", name: "ஏகாதசி", color: "bg-purple-600" },
    { date: 29, type: "chaturdashi", name: "சதுர்த்தசி", color: "bg-red-600" },
  ];

  const yearlyData = {
    tamilYear: "பிலவ (Pilava)",
    vikramaYear: "2082",
    sakaYear: "1947",
    samvatsara: "பிலவ வருஷம்",
    solarTransits: [
      { date: "Oct 17, 2025", event: "சூரியன் துலாம் ராசியில் நுழைவு" },
      { date: "Nov 16, 2025", event: "சூரியன் விருச்சிகம் ராசியில் நுழைவு" },
      { date: "Dec 16, 2025", event: "சூரியன் தனுசு ராசியில் நுழைவு" },
    ],
    eclipses: [
      { date: "Oct 28, 2025", type: "lunar", visibility: "இந்தியாவில் காணப்படும்" },
      { date: "Apr 8, 2026", type: "solar", visibility: "தமிழ்நாட்டில் பகுதி கிரகணம்" },
    ],
    majorFestivals: [
      { date: "Nov 1, 2025", name: "தீபாவளி (Deepavali)" },
      { date: "Dec 6, 2025", name: "கார்த்திகை தீபம் (Karthigai Deepam)" },
      { date: "Jan 14, 2026", name: "பொங்கல் (Pongal)" },
      { date: "Mar 14, 2026", name: "ஹோலி (Holi)" },
    ],
  };

  const muhurthamTypes = [
    { id: "marriage", name: "திருமணம்", description: "Wedding ceremonies" },
    { id: "gruhapravesam", name: "கிருஹப்பிரவேசம்", description: "Housewarming" },
    { id: "naming", name: "நாமகரணம்", description: "Naming ceremony" },
    { id: "travel", name: "பயணம்", description: "Auspicious travel" },
    { id: "business", name: "வியாபாரம்", description: "Business ventures" },
    { id: "education", name: "கல்வி", description: "Educational activities" },
  ];

  let muhurthamSearch = {
    type: "marriage",
    fromDate: "",
    toDate: "",
    nakshatra: "",
  };

  let muhurthamResults = [
    {
      date: "2025-10-18",
      tamilDate: "2 ஐப்பசி 2046",
      timeSlot: "09:15 - 10:45",
      tithi: "சுக்ல பஞ்சமி",
      nakshatra: "ரோஹிணி",
      quality: "excellent",
      notes: "கிருஹப்பிரவேசத்திற்கு மிகவும் சிறந்த நேரம்",
    },
    {
      date: "2025-10-22",
      tamilDate: "6 ஐப்பசி 2046",
      timeSlot: "10:30 - 12:00",
      tithi: "சுக்ல நவமி",
      nakshatra: "உத்திரம்",
      quality: "good",
      notes: "திருமணத்திற்கு நல்ல நேரம்",
    },
  ];

  onMount(() => {
    document.title = "Tamil Panchangam - Divinity";
  });

  function formatTime(time) {
    return time + " IST";
  }

  function getQualityColor(quality) {
    switch (quality) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function searchMuhurtham() {
    // Muhurtham search logic would go here
    console.log("Searching muhurtham for:", muhurthamSearch);
  }

  // Search panchangam for selected date
  function searchPanchangam() {
    // For demo purposes, we'll simulate different data based on date
    // In a real app, this would fetch from an API
    const date = new Date(selectedDate);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    // Generate mock data based on selected date
    const mockData = {
      tamilDate: `${Math.floor(Math.random() * 30) + 1} ${["சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி", "தை", "மாசி", "பங்குனி"][date.getMonth()]} ${2046 + Math.floor(date.getFullYear() / 100)}`,
      englishDate: `${dayOfWeek}, ${date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}`,
      sunrise: "06:06",
      sunset: "18:02",
      moonrise: "18:45",
      moonset: "06:12",
      tithi: ["சுக்ல பிரதமை", "சுக்ல த்விதியை", "சுக்ல திருதியை", "சுக்ல சதுர்த்தி", "சுக்ல பஞ்சமி", "சுக்ல ஷஷ்டி", "சுக்ல சப்தமி", "சுக்ல அஷ்டமி", "சுக்ல நவமி", "சுக்ல தசமி", "சுக்ல ஏகாதசி", "சுக்ல த்வாதசி", "சுக்ல திரயோதசி", "சுக்ல சதுர்தசி", "பௌர்ணமி", "கிருஷ்ண பிரதமை", "கிருஷ்ண த்விதியை", "கிருஷ்ண திருதியை", "கிருஷ்ண சதுர்த்தி", "கிருஷ்ண பஞ்சமி", "கிருஷ்ண ஷஷ்டி", "கிருஷ்ண சப்தமி", "கிருஷ்ண அஷ்டமி", "கிருஷ்ண நவமி", "கிருஷ்ண தசமி", "கிருஷ்ண ஏகாதசி", "கிருஷ்ண த்வாதசி", "கிருஷ்ண திரயோதசி", "கிருஷ்ண சதுர்தசி", "அமாவாசை"][Math.floor(Math.random() * 30)],
      nakshatra: ["அசுவினி", "பரணி", "கேட்டை", "ரோஹிணி", "மிருகசீரிடம்", "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்", "ஹஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"][Math.floor(Math.random() * 27)],
      yoga: ["விஷ்கம்பம்", "பிரீதி", "ஆயுஷ்மான்", "சௌபாக்யம்", "சோபனம்", "அதிகந்தம்", "சுகர்மா", "திரிவிக்ரமம்", "ஜ்னானம்", "வைராக்யம்", "முத்ரா", "பரி஘ா", "சித்தா", "ஆதித்யா", "சுக்மன்", "பிரதி", "விஷ்டி", "கிள்ப்தி", "வதுகம்", "அனந்தம்", "கௌஸ்துபம்", "முர்த்தி", "ராஜன்", "ராம்பம்", "விராமம்", "விருதி", "தருணம்"][Math.floor(Math.random() * 27)],
      karana: ["பவம்", "பாலவம்", "கௌலவம்", "தைதிலம்", "கர்த்திகை", "நாகவம்", "வனிஜம்", "விஷ்டி", "பவம்", "பாலவம்", "கௌலவம்", "தைதிலம்"][Math.floor(Math.random() * 12)],
      rahuKalam: "07:30 - 09:00",
      yamagandam: "10:30 - 12:00",
      gulikaiKalam: "13:30 - 15:00",
      abhijitMuhurat: "11:45 - 12:30",
      nallaNeram: ["06:15 - 07:00", "16:30 - 17:15"],
      chandrashtama: ["பரணி", "கேட்டை"],
      auspiciousActivities: ["திருமணம் (Marriage)", "கிருஹப்பிரவேசம் (Gruhapravesam)", "நாமகரணம் (Naming Ceremony)", "கோவில் வழிபாடு (Temple Worship)"],
      inauspiciousActivities: ["கிழக்கு திசை பயணம் தவிர்க்க (Avoid travel East)", "புதிய வாங்குதல் தவிர்க்க (No new purchases)"],
      festivals: date.getDate() === 6 ? ["விநாயகர் சதுர்த்தி நோன்பு"] : [],
      specialNotes: "பஞ்சாங்க தகவல்கள் கணக்கீடு செய்யப்பட்டவை.",
    };

    currentPanchangam = mockData;

    // Update horoscope for the selected date
    currentHoroscope = {
      ...dailyHoroscope,
      date: selectedDate,
      zodiacSigns: dailyHoroscope.zodiacSigns.map((sign) => ({
        ...sign,
        prediction: sign.prediction + " (தேர்ந்தெடுக்கப்பட்ட தேதிக்கான கணிப்பு)",
      })),
    };
  }

  function getDayColor(date, highlights) {
    const highlight = highlights.find((h) => h.date === date);
    return highlight ? highlight.color : "";
  }

  function getDayName(date, highlights) {
    const highlight = highlights.find((h) => h.date === date);
    return highlight ? highlight.name : "";
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:sun" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">தமிழ் பஞ்சாங்கம்</h1>
        <p class="text-gray-600 dark:text-gray-300">Tamil Panchangam - Traditional Calendar & Muhurtham</p>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <input type="date" bind:value={selectedDate} class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
      <button class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg" on:click={searchPanchangam}>
        <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- View Tabs -->
  <div class="flex space-x-2">
    {#each views as view}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-orange-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20'}" on:click={() => (currentView = view.id)}>
        <Icon icon={view.icon} class="w-4 h-4" />
        <span class="font-medium">{view.label}</span>
      </button>
    {/each}
  </div>

  <!-- Daily Panchangam View -->
  {#if currentView === "daily"}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Panchangam Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Date Information -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{currentPanchangam.tamilDate}</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">{currentPanchangam.englishDate}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Icon icon="heroicons:sun" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p class="text-sm text-gray-600 dark:text-gray-400">சூரிய உதயம் / அஸ்தமனம்</p>
              <p class="font-bold text-gray-900 dark:text-white">{formatTime(currentPanchangam.sunrise)} / {formatTime(currentPanchangam.sunset)}</p>
            </div>
            <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Icon icon="heroicons:moon" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p class="text-sm text-gray-600 dark:text-gray-400">சந்திர உதயம் / அஸ்தமனம்</p>
              <p class="font-bold text-gray-900 dark:text-white">{formatTime(currentPanchangam.moonrise)} / {formatTime(currentPanchangam.moonset)}</p>
            </div>
          </div>
        </div>

        <!-- Panchangam Elements -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">பஞ்சாங்க விவரங்கள்</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">திதி (Tithi)</p>
                <p class="font-medium text-gray-900 dark:text-white">{currentPanchangam.tithi}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">நக்ஷத்திரம் (Nakshatra)</p>
                <p class="font-medium text-gray-900 dark:text-white">{currentPanchangam.nakshatra}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">யோகம் (Yoga)</p>
                <p class="font-medium text-gray-900 dark:text-white">{currentPanchangam.yoga}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">கரணம் (Karana)</p>
                <p class="font-medium text-gray-900 dark:text-white">{currentPanchangam.karana}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">சந்திராஷ்டமம்</p>
                <p class="font-medium text-gray-900 dark:text-white">{currentPanchangam.chandrashtama.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Periods -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">முக்கிய காலங்கள்</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p class="text-sm font-medium text-red-800 dark:text-red-300">ராகு காலம்</p>
                <p class="text-red-600 dark:text-red-400">{currentPanchangam.rahuKalam}</p>
              </div>
              <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p class="text-sm font-medium text-yellow-800 dark:text-yellow-300">யமகண்டம்</p>
                <p class="text-yellow-600 dark:text-yellow-400">{currentPanchangam.yamaKandam}</p>
              </div>
              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p class="text-sm font-medium text-purple-800 dark:text-purple-300">குளிகை காலம்</p>
                <p class="text-purple-600 dark:text-purple-400">{currentPanchangam.gulikai}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p class="text-sm font-medium text-green-800 dark:text-green-300">அபிஜித் முஹூர்த்தம்</p>
                <p class="text-green-600 dark:text-green-400">{currentPanchangam.abhijitMuhurta}</p>
              </div>
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p class="text-sm font-medium text-blue-800 dark:text-blue-300">நல்ல நேரம்</p>
                {#each currentPanchangam.nallaNeram as time}
                  <p class="text-blue-600 dark:text-blue-400">{time}</p>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Panel -->
      <div class="space-y-6">
        <!-- Today's Activities -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-2 text-orange-600" />
            இன்றைய நிகழ்வுகள்
          </h3>

          {#if dailyPanchangam.festivals.length > 0}
            <div class="mb-4">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">பண்டிகைகள்</p>
              {#each dailyPanchangam.festivals as festival}
                <span class="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm mr-2 mb-2 dark:bg-orange-900/30 dark:text-orange-400">{festival}</span>
              {/each}
            </div>
          {/if}

          <div class="mb-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">நல்ல செயல்கள்</p>
            <div class="space-y-1">
              {#each dailyPanchangam.auspiciousActivities as activity}
                <div class="flex items-center text-sm text-green-700 dark:text-green-300">
                  <Icon icon="heroicons:check-circle" class="w-4 h-4 mr-2" />
                  {activity}
                </div>
              {/each}
            </div>
          </div>

          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">தவிர்க்கவேண்டியவை</p>
            <div class="space-y-1">
              {#each dailyPanchangam.inauspiciousActivities as activity}
                <div class="flex items-center text-sm text-red-700 dark:text-red-300">
                  <Icon icon="heroicons:x-circle" class="w-4 h-4 mr-2" />
                  {activity}
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Special Notes -->
        <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2 text-orange-600" />
            சிறப்பு குறிப்பு
          </h3>
          <p class="text-gray-700 dark:text-gray-300">{dailyPanchangam.specialNotes}</p>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">வேगமான செயல்கள்</h3>
          <div class="space-y-2">
            <button class="w-full bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50"> முஹூர்த்தம் தேடு </button>
            <button class="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> பண்டிகை நாட்காட்டி </button>
            <button class="w-full bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> SMS அறிவிப்பு </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Horoscope View -->
  {:else if currentView === "horoscope"}
    <div class="space-y-6">
      <!-- Horoscope Header -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">தினசரி ராசி பலன்</h2>
            <p class="text-purple-100">Daily Horoscope & Predictions</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-medium">{currentHoroscope.date}</p>
            <p class="text-purple-100">{currentHoroscope.day}</p>
          </div>
        </div>
      </div>

      <!-- Zodiac Signs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each currentHoroscope.zodiacSigns as sign}
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                  <Icon icon={sign.icon} class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">{sign.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{sign.englishName}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl">{sign.symbol}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{sign.element}</div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p class="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">பொதுப் பலன்</p>
                <p class="text-sm text-blue-700 dark:text-blue-400">{sign.general}</p>
              </div>

              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p class="text-sm font-medium text-green-800 dark:text-green-300 mb-1">நிதி</p>
                <p class="text-sm text-green-700 dark:text-green-400">{sign.finance}</p>
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p class="text-sm font-medium text-red-800 dark:text-red-300 mb-1">உடல் நலம்</p>
                <p class="text-sm text-red-700 dark:text-red-400">{sign.health}</p>
              </div>

              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p class="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">காதல் & உறவுகள்</p>
                <p class="text-sm text-purple-700 dark:text-purple-400">{sign.love}</p>
              </div>

              <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p class="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">வேலை & கல்வி</p>
                <p class="text-sm text-yellow-700 dark:text-yellow-400">{sign.career}</p>
              </div>
            </div>

            <div class="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <p class="text-sm font-medium text-orange-800 dark:text-orange-300 mb-1">சிறப்பு அறிவுரை</p>
              <p class="text-sm text-orange-700 dark:text-orange-400">{sign.advice}</p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Lucky Numbers & Colors -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-2 text-yellow-600" />
            அதிர்ஷ்ட எண்கள்
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each currentHoroscope.luckyNumbers as number}
              <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {number}
              </div>
            {/each}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:swatch" class="w-5 h-5 mr-2 text-pink-600" />
            அதிர்ஷ்ட நிறங்கள்
          </h3>
          <div class="flex flex-wrap gap-3">
            {#each currentHoroscope.luckyColors as color}
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" style="background-color: {color.hex}"></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{color.name}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly View -->
  {:else if currentView === "monthly"}
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          {tamilMonths[selectedMonth]}
          {selectedYear} | {englishMonths[selectedMonth]}
          {selectedYear}
        </h3>
        <div class="flex items-center space-x-2">
          <select bind:value={selectedMonth} class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
            {#each tamilMonths as month, index}
              <option value={index}>{month}</option>
            {/each}
          </select>
          <select bind:value={selectedYear} class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1 mb-4">
        {#each ["ஞா", "தி", "செ", "பு", "வி", "வெ", "சு"] as day}
          <div class="p-3 text-center font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded">
            {day}
          </div>
        {/each}

        {#each Array(31) as _, index}
          {@const date = index + 1}
          {@const highlight = monthlyHighlights.find((h) => h.date === date)}
          <div class="p-3 text-center border border-gray-200 dark:border-gray-600 rounded min-h-[60px] relative {highlight ? highlight.color + ' text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}">
            <span class="font-medium">{date}</span>
            {#if highlight}
              <div class="text-xs mt-1">{highlight.name}</div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-4 text-sm">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-gray-800 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">அமாவாசை</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-yellow-600 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">பௌர்ணமி</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-purple-600 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">ஏகாதசி</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-orange-600 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">பிரதோஷம்</span>
        </div>
      </div>
    </div>

    <!-- Yearly Almanac -->
  {:else if currentView === "yearly"}
    <div class="space-y-6">
      <!-- Year Information -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">வருட விவரங்கள் - {selectedYear}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">தமிழ் வருடம்</p>
            <p class="font-bold text-gray-900 dark:text-white">{yearlyData.tamilYear}</p>
          </div>
          <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">விக்ரம வருடம்</p>
            <p class="font-bold text-gray-900 dark:text-white">{yearlyData.vikramaYear}</p>
          </div>
          <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">சக வருடம்</p>
            <p class="font-bold text-gray-900 dark:text-white">{yearlyData.sakaYear}</p>
          </div>
          <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">சம்வத்சரம்</p>
            <p class="font-bold text-gray-900 dark:text-white">{yearlyData.samvatsara}</p>
          </div>
        </div>
      </div>

      <!-- Solar Transits -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">சூரிய ராசி மாற்றங்கள்</h3>
        <div class="space-y-3">
          {#each yearlyData.solarTransits as transit}
            <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span class="font-medium text-gray-900 dark:text-white">{transit.event}</span>
              <span class="text-orange-600 dark:text-orange-400">{transit.date}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Eclipses -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">கிரகணங்கள்</h3>
        <div class="space-y-3">
          {#each yearlyData.eclipses as eclipse}
            <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div>
                <span class="font-medium text-gray-900 dark:text-white">{eclipse.type === "lunar" ? "சந்திர கிரகணம்" : "சூரிய கிரகணம்"}</span>
                <p class="text-sm text-gray-600 dark:text-gray-400">{eclipse.visibility}</p>
              </div>
              <span class="text-red-600 dark:text-red-400">{eclipse.date}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Major Festivals -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">முக்கிய பண்டிகைகள்</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          {#each yearlyData.majorFestivals as festival}
            <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span class="font-medium text-gray-900 dark:text-white">{festival.name}</span>
              <span class="text-green-600 dark:text-green-400">{festival.date}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Muhurtham Finder -->
  {:else if currentView === "muhurtham"}
    <div class="space-y-6">
      <!-- Search Form -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">முஹூர்த்தம் தேடல்</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">செயல் வகை</label>
            <select bind:value={muhurthamSearch.type} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
              {#each muhurthamTypes as type}
                <option value={type.id}>{type.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">தொடக்க தேதி</label>
            <input type="date" bind:value={muhurthamSearch.fromDate} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">முடிவு தேதி</label>
            <input type="date" bind:value={muhurthamSearch.toDate} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
          </div>
          <div class="flex items-end">
            <button on:click={searchMuhurtham} class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"> தேடு </button>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">முஹூர்த்தம் முடிவுகள்</h3>
        <div class="space-y-4">
          {#each muhurthamResults as result}
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">{result.tamilDate}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{result.date}</p>
                </div>
                <span class="px-3 py-1 text-sm font-medium border rounded-full {getQualityColor(result.quality)}">
                  {result.quality === "excellent" ? "மிகச்சிறந்தது" : result.quality === "good" ? "நல்லது" : "சராசரி"}
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">நேரம்</p>
                  <p class="font-medium text-gray-900 dark:text-white">{result.timeSlot}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">திதி</p>
                  <p class="font-medium text-gray-900 dark:text-white">{result.tithi}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">நக்ஷத்திரம்</p>
                  <p class="font-medium text-gray-900 dark:text-white">{result.nakshatra}</p>
                </div>
              </div>

              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p class="text-sm text-blue-800 dark:text-blue-300">{result.notes}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
