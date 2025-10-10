<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  function navigateBack() {
    goto("/culture");
  }

  // 25 Things to Follow data
  const thingsToFollow = [
    // மன ஒழுக்கம் (Mind Discipline)
    {
      id: 1,
      category: "🧘 மன ஒழுக்கம்",
      categoryEnglish: "Mind Discipline",
      text: "தினமும் 5 நிமிட அமைதி நேரம் எடுத்துக்கொள்",
      english: "Take 5 minutes of quiet time daily",
      explanation: "அமைதியான நேரம் மனதை தெளிவாக்கும். தினமும் 5 நிமிடங்கள் அமைதியாக இருப்பது மனதை வலுப்படுத்தும், உணர்ச்சிகளை கட்டுப்படுத்தும், மற்றும் உள் அமைதியை கொண்டுவரும்.",
      icon: "heroicons:moon",
      color: "from-purple-100 to-indigo-200",
    },
    {
      id: 2,
      category: "🧘 மன ஒழுக்கம்",
      categoryEnglish: "Mind Discipline",
      text: "தவறு செய்தால் மன்னிப்பு கேள்",
      english: "Ask for forgiveness when you make mistakes",
      explanation: "மன்னிப்பு கேட்பது தன்மானத்தை குறைக்காது, அதை உயர்த்தும். தவறை ஒப்புக்கொண்டு மன்னிப்பு கேட்பது மனதை விடுவித்து, உறவுகளை வலுப்படுத்தும்.",
      icon: "heroicons:heart",
      color: "from-pink-100 to-rose-200",
    },
    {
      id: 3,
      category: "🧘 மன ஒழுக்கம்",
      categoryEnglish: "Mind Discipline",
      text: "மற்றவரை நன்றியுடன் பாராட்டு",
      english: "Appreciate others with gratitude",
      explanation: "நன்றியுடன் பாராட்டும் போது மனம் நேர்மறையாக மாறும். மற்றவரின் நல்ல குணங்களை பார்த்து பாராட்டுவது மனதை வளமாக்கும் மற்றும் உறவுகளை இனிமையாக்கும்.",
      icon: "heroicons:sparkles",
      color: "from-yellow-100 to-amber-200",
    },
    {
      id: 4,
      category: "🧘 மன ஒழுக்கம்",
      categoryEnglish: "Mind Discipline",
      text: "உணர்ச்சிகளை எழுதும் பழக்கம் வளர்த்து",
      english: "Develop the habit of writing emotions",
      explanation: "உணர்ச்சிகளை எழுதுவது மனதை வெளிப்படுத்தும் வழி. தினமும் உணர்ச்சிகளை எழுதும் பழக்கம் மனதை தெளிவாக்கும் மற்றும் உள் அமைதியை கொண்டுவரும்.",
      icon: "heroicons:pencil",
      color: "from-blue-100 to-cyan-200",
    },
    {
      id: 5,
      category: "🧘 மன ஒழுக்கம்",
      categoryEnglish: "Mind Discipline",
      text: '"நான் யாருக்கு today உதவினேன்?" என சிந்திக்கவும்',
      english: 'Think "Who did I help today?"',
      explanation: "தினமும் ஒருவருக்கு உதவியதை சிந்திப்பது மனதை தொண்டு மனப்பான்மையுடன் நிரப்பும். இது மனதை வளமாக்கி, வாழ்க்கையை அர்த்தமுள்ளதாக்கும்.",
      icon: "heroicons:hand-raised",
      color: "from-green-100 to-emerald-200",
    },

    // பக்தி ஒழுக்கம் (Devotional Discipline)
    {
      id: 6,
      category: "🙏 பக்தி ஒழுக்கம்",
      categoryEnglish: "Devotional Discipline",
      text: "காலை எழுந்ததும் ச்லோகா உச்சரிக்கவும்",
      english: "Recite slokas upon waking",
      explanation: "காலை எழுந்ததும் ச்லோகா உச்சரிப்பது நாளை தெய்வீகமாக தொடங்கும். இது மனதை தூய்மைப்படுத்தி, நாள் முழுவதும் ஆன்மீக சக்தியை கொண்டுவரும்.",
      icon: "heroicons:musical-note",
      color: "from-amber-100 to-orange-200",
    },
    {
      id: 7,
      category: "🙏 பக்தி ஒழுக்கம்",
      categoryEnglish: "Devotional Discipline",
      text: "வாரத்தில் ஒரு பஜனை பாடல் பயிற்சி",
      english: "Practice one bhajan song per week",
      explanation: "பஜனை பாடல் பயிற்சி மனதை தெய்வீகமாக்கும். வாரத்தில் ஒரு பாடலை கற்று பாடுவது ஆன்மீக வளர்ச்சியை ஊக்குவித்து, மனதை அமைதியாக்கும்.",
      icon: "heroicons:microphone",
      color: "from-indigo-100 to-purple-200",
    },
    {
      id: 8,
      category: "🙏 பக்தி ஒழுக்கம்",
      categoryEnglish: "Devotional Discipline",
      text: "திருவிழா நாளில் பூஜை செய்ய பங்கு பெறவும்",
      english: "Participate in puja on festival days",
      explanation: "திருவிழா நாளில் பூஜையில் பங்கு பெறுவது ஆன்மீக ஒற்றுமையை உருவாக்கும். இது குடும்பத்தை ஒன்றாக இணைத்து, மனதை தெய்வீகமாக்கும்.",
      icon: "heroicons:cake",
      color: "from-pink-100 to-rose-200",
    },
    {
      id: 9,
      category: "🙏 பக்தி ஒழுக்கம்",
      categoryEnglish: "Devotional Discipline",
      text: "கோயிலில் அமைதியாக இருப்பது",
      english: "Be peaceful in the temple",
      explanation: "கோயிலில் அமைதியாக இருப்பது மனதை தெய்வீகமாக்கும். அங்கு அமைதியாக இருப்பது உள் அமைதியை வளர்த்து, ஆன்மீக அனுபவத்தை மேம்படுத்தும்.",
      icon: "heroicons:building-storefront",
      color: "from-orange-100 to-red-200",
    },
    {
      id: 10,
      category: "🙏 பக்தி ஒழுக்கம்",
      categoryEnglish: "Devotional Discipline",
      text: "பூவுக்கு நன்றி சொல்லும் பழக்கம் வளர்த்து",
      english: "Develop the habit of thanking flowers",
      explanation: "பூவுக்கு நன்றி சொல்லும் போது மனம் இயற்கையுடன் இணையும். இது ஆன்மீக விழிப்புணர்வை வளர்த்து, மனதை தூய்மைப்படுத்தும்.",
      icon: "heroicons:sparkles",
      color: "from-green-100 to-teal-200",
    },

    // குடும்ப பாசம் (Family Love)
    {
      id: 11,
      category: "👨‍👩‍👧‍👦 குடும்ப பாசம்",
      categoryEnglish: "Family Love",
      text: "பாட்டியிடம் ஒரு கதை கேள் வாரம் ஒரு முறை",
      english: "Ask grandmother for one story per week",
      explanation: "பாட்டியின் கதைகள் மரபு அறிவின் கனி. வாரம் ஒரு முறை கேட்பது குடும்ப பாசத்தை வலுப்படுத்தி, மனதை ஞானத்துடன் நிரப்பும்.",
      icon: "heroicons:user-group",
      color: "from-rose-100 to-pink-200",
    },
    {
      id: 12,
      category: "👨‍👩‍👧‍👦 குடும்ப பாசம்",
      categoryEnglish: "Family Love",
      text: "அம்மாவுக்கு சமையலில் உதவவும்",
      english: "Help mother in cooking",
      explanation: "அம்மாவுக்கு சமையலில் உதவுவது குடும்ப பாசத்தை வளர்த்தும். இது கற்றலை ஊக்குவித்து, குடும்ப உறவுகளை இனிமையாக்கும்.",
      icon: "heroicons:home",
      color: "from-blue-100 to-cyan-200",
    },
    {
      id: 13,
      category: "👨‍👩‍👧‍👦 குடும்ப பாசம்",
      categoryEnglish: "Family Love",
      text: "அப்பாவுடன் கோயிலுக்கு செல்லும் பழக்கம்",
      english: "Develop the habit of going to temple with father",
      explanation: "அப்பாவுடன் கோயிலுக்கு செல்வது குடும்ப பாசத்தை வலுப்படுத்தும். இது ஆன்மீக பயணத்தை ஒன்றாக்கி, மனதை தெய்வீகமாக்கும்.",
      icon: "heroicons:shield-check",
      color: "from-indigo-100 to-purple-200",
    },
    {
      id: 14,
      category: "👨‍👩‍👧‍👦 குடும்ப பாசம்",
      categoryEnglish: "Family Love",
      text: "சிறியவர்களுக்கு தமிழில் கற்றுக்கொடுக்கவும்",
      english: "Teach younger ones in Tamil",
      explanation: "சிறியவர்களுக்கு தமிழில் கற்றுக்கொடுப்பது மரபை தொடரும். இது குடும்ப பாசத்தை வளர்த்து, மொழியை பாதுகாத்து, மனதை ஞானத்துடன் நிரப்பும்.",
      icon: "heroicons:academic-cap",
      color: "from-yellow-100 to-orange-200",
    },
    {
      id: 15,
      category: "👨‍👩‍👧‍👦 குடும்ப பாசம்",
      categoryEnglish: "Family Love",
      text: "குடும்ப உரையாடலில் பங்கு பெறவும்",
      english: "Participate in family conversations",
      explanation: "குடும்ப உரையாடலில் பங்கு பெறுவது பாசத்தை வளர்த்தும். இது குடும்ப உறவுகளை வலுப்படுத்தி, மனதை அமைதியாக்கும்.",
      icon: "heroicons:chat-bubble-bottom-center-text",
      color: "from-green-100 to-emerald-200",
    },

    // இயற்கை மரியாதை (Nature Respect)
    {
      id: 16,
      category: "🌿 இயற்கை மரியாதை",
      categoryEnglish: "Nature Respect",
      text: "மழை வந்தால் நன்றி சொல்லவும்",
      english: "Thank when it rains",
      explanation: "மழைக்கு நன்றி சொல்லும் போது மனம் இயற்கையுடன் இணையும். இது இயற்கை மரியாதையை வளர்த்து, மனதை தூய்மைப்படுத்தும்.",
      icon: "heroicons:cloud-rain",
      color: "from-blue-100 to-sky-200",
    },
    {
      id: 17,
      category: "🌿 இயற்கை மரியாதை",
      categoryEnglish: "Nature Respect",
      text: "ஒரு மரம் நடும் பழக்கம் வளர்த்து",
      english: "Develop the habit of planting a tree",
      explanation: "மரம் நடுவது இயற்கைக்கு கொடை. இது சூழலை பாதுகாத்து, மனதை பொறுப்புணர்வுடன் நிரப்பும்.",
      icon: "heroicons:tree",
      color: "from-green-100 to-lime-200",
    },
    {
      id: 18,
      category: "🌿 இயற்கை மரியாதை",
      categoryEnglish: "Nature Respect",
      text: "நீர் வீணாக்காமல் பயன்படுத்தவும்",
      english: "Use water without wasting",
      explanation: "நீரை வீணாக்காமல் பயன்படுத்துவது இயற்கை மரியாதை. இது சூழலை பாதுகாத்து, மனதை பொறுப்புணர்வுடன் நிரப்பும்.",
      icon: "heroicons:droplets",
      color: "from-cyan-100 to-blue-200",
    },
    {
      id: 19,
      category: "🌿 இயற்கை மரியாதை",
      categoryEnglish: "Nature Respect",
      text: "பசுமை உணவுகளை விரும்பி சாப்பிடவும்",
      english: "Preferably eat green foods",
      explanation: "பசுமை உணவுகளை விரும்பி சாப்பிடுவது உடலையும் மனதையும் ஆரோக்கியமாக்கும். இது இயற்கை மரியாதையை வளர்த்து, வாழ்க்கையை இயற்கையுடன் இணைக்கும்.",
      icon: "heroicons:leaf",
      color: "from-emerald-100 to-green-200",
    },
    {
      id: 20,
      category: "🌿 இயற்கை மரியாதை",
      categoryEnglish: "Nature Respect",
      text: "பூவின் அர்ப்பணத்தை மனதுடன் உணரவும்",
      english: "Feel flower offerings with heart",
      explanation: "பூவின் அர்ப்பணத்தை மனதுடன் உணரும் போது ஆன்மீக விழிப்புணர்வு வளரும். இது மனதை தூய்மைப்படுத்தி, இயற்கையுடன் இணைக்கும்.",
      icon: "heroicons:sparkles",
      color: "from-pink-100 to-rose-200",
    },

    // பண்பாட்டு ஒழுக்கம் (Cultural Discipline)
    {
      id: 21,
      category: "🎨 பண்பாட்டு ஒழுக்கம்",
      categoryEnglish: "Cultural Discipline",
      text: "தினமும் ஒரு தமிழ் சொல் கற்றுக்கொள்",
      english: "Learn one Tamil word daily",
      explanation: "தினமும் ஒரு தமிழ் சொல் கற்றுக்கொள்வது மொழியை பாதுகாத்து, மனதை கலாச்சாரத்துடன் இணைக்கும். இது பண்பாட்டு அடையாளத்தை வலுப்படுத்தும்.",
      icon: "heroicons:language",
      color: "from-orange-100 to-red-200",
    },
    {
      id: 22,
      category: "🎨 பண்பாட்டு ஒழுக்கம்",
      categoryEnglish: "Cultural Discipline",
      text: "வாரத்தில் ஒரு பழமொழி பயிற்சி",
      english: "Practice one proverb per week",
      explanation: "பழமொழி பயிற்சி ஞானத்தை வளர்த்தும். வாரத்தில் ஒரு பழமொழியை கற்று பயன்படுத்துவது மனதை ஞானத்துடன் நிரப்பும்.",
      icon: "heroicons:book-open",
      color: "from-purple-100 to-indigo-200",
    },
    {
      id: 23,
      category: "🎨 பண்பாட்டு ஒழுக்கம்",
      categoryEnglish: "Cultural Discipline",
      text: "கோலம் போடும் பழக்கம் வளர்த்து",
      english: "Develop the habit of drawing kolam",
      explanation: "கோலம் போடுவது தமிழ் பண்பாட்டின் அழகு. இது மனதை கலைத்திறனுடன் நிரப்பி, குடும்ப மரபை தொடரும்.",
      icon: "heroicons:paint-brush",
      color: "from-pink-100 to-purple-200",
    },
    {
      id: 24,
      category: "🎨 பண்பாட்டு ஒழுக்கம்",
      categoryEnglish: "Cultural Discipline",
      text: "நாடகம், பாட்டி கதைகள் enact செய்யும் முயற்சி",
      english: "Try to enact dramas and grandmother's stories",
      explanation: "நாடகம் மற்றும் பாட்டி கதைகளை enact செய்வது கலாச்சாரத்தை உயிர்ப்பிக்கும். இது மனதை கலைத்திறனுடன் நிரப்பி, மரபை தொடரும்.",
      icon: "heroicons:play",
      color: "from-yellow-100 to-amber-200",
    },
    {
      id: 25,
      category: "🎨 பண்பாட்டு ஒழுக்கம்",
      categoryEnglish: "Cultural Discipline",
      text: "தமிழ் மொழியில் உரையாடும் நேரம் ஒதுக்கவும்",
      english: "Allocate time to converse in Tamil",
      explanation: "தமிழில் உரையாடும் நேரம் ஒதுக்குவது மொழியை பாதுகாத்து, கலாச்சாரத்தை வளர்த்தும். இது மனதை மரபுடன் இணைத்து, அடையாளத்தை வலுப்படுத்தும்.",
      icon: "heroicons:chat-bubble-left-right",
      color: "from-indigo-100 to-blue-200",
    },
  ];

  let selectedCategory = "all";

  $: filteredThings = selectedCategory === "all" ? thingsToFollow : thingsToFollow.filter((thing) => thing.categoryEnglish === selectedCategory);

  const categories = [
    { value: "all", label: "அனைத்தும் / All", icon: "heroicons:view-grid" },
    { value: "Mind Discipline", label: "மன ஒழுக்கம்", icon: "heroicons:brain" },
    { value: "Devotional Discipline", label: "பக்தி ஒழுக்கம்", icon: "heroicons:sparkles" },
    { value: "Family Love", label: "குடும்ப பாசம்", icon: "heroicons:heart" },
    { value: "Nature Respect", label: "இயற்கை மரியாதை", icon: "heroicons:leaf" },
    { value: "Cultural Discipline", label: "பண்பாட்டு ஒழுக்கம்", icon: "heroicons:palette" },
  ];
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="text-center flex-1">
        <h1 class="text-6xl font-bold text-gray-800 mb-2">✅ 25 செய்யவேண்டியவை</h1>
        <p class="text-2xl text-gray-600">25 Things to Follow</p>
        <p class="text-lg text-green-700 italic mt-2">"தமிழராக ஒழுக்கமாக வாழ 25 செய்யவேண்டிய செயல்கள்"</p>
      </div>
      <button on:click={navigateBack} class="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 transform hover:scale-105">
        <Icon icon="heroicons:arrow-left" class="w-5 h-5 mr-2 inline" />
        Back to Wisdom
      </button>
    </div>

    <!-- Introduction Card -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-7xl mb-4">🌱</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">தமிழராக ஒழுக்கமாக வாழ்வது</h2>
        <p class="text-xl text-gray-700 mb-6">இவை தமிழர் வாழ்வியல், ஆன்மீக நெறி, குடும்ப பாசம், இயற்கை மரியாதை, மற்றும் பண்பாட்டு ஒழுக்கம் ஆகியவற்றின் அடித்தளமாக அமைந்தவை. ஒவ்வொன்றும் தினசரி வாழ்வின் ஒளி, பாசத்தின் நடை, மற்றும் அறத்தின் வழி.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4">
            <Icon icon="heroicons:brain" class="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div class="font-semibold text-green-800">மன ஒழுக்கம்</div>
            <div class="text-sm text-green-600">Mind Discipline</div>
          </div>
          <div class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-4">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div class="font-semibold text-amber-800">பக்தி ஒழுக்கம்</div>
            <div class="text-sm text-amber-600">Devotional Discipline</div>
          </div>
          <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-4">
            <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div class="font-semibold text-pink-800">குடும்ப பாசம்</div>
            <div class="text-sm text-pink-600">Family Love</div>
          </div>
          <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4">
            <Icon icon="heroicons:leaf" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div class="font-semibold text-blue-800">இயற்கை மரியாதை</div>
            <div class="text-sm text-blue-600">Nature Respect</div>
          </div>
          <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4">
            <Icon icon="heroicons:palette" class="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div class="font-semibold text-purple-800">பண்பாட்டு ஒழுக்கம்</div>
            <div class="text-sm text-purple-600">Cultural Discipline</div>
          </div>
          <div class="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4">
            <Icon icon="heroicons:light-bulb" class="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div class="font-semibold text-teal-800">வாழ்வின் ஒளி</div>
            <div class="text-sm text-teal-600">Light of Life</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
      <div class="flex flex-wrap gap-2 justify-center">
        {#each categories as category}
          <button on:click={() => (selectedCategory = category.value)} class="flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 {selectedCategory === category.value ? 'bg-green-500 text-white shadow-lg' : 'bg-white/60 text-gray-700 hover:bg-white/80'}">
            <Icon icon={category.icon} class="w-4 h-4" />
            <span class="text-sm">{category.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Things Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredThings as thing}
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300">
          <!-- Header -->
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br {thing.color} rounded-xl flex items-center justify-center shadow-lg">
              <Icon icon={thing.icon} class="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-800">{thing.id}</div>
              <div class="text-sm text-gray-600">{thing.category}</div>
            </div>
          </div>

          <!-- Main Text -->
          <div class="mb-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{thing.text}</h3>
            <p class="text-sm text-gray-600 italic">{thing.english}</p>
          </div>

          <!-- Explanation -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <p class="text-sm text-gray-700 leading-relaxed">{thing.explanation}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Completion Message -->
    {#if filteredThings.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600">No items found</h3>
        <p class="text-gray-500">Try adjusting your category filter</p>
      </div>
    {/if}

    <!-- Footer Wisdom -->
    <div class="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-200 mt-12 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">🌟</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">பாட்டியின் ஆசீர்வாதம்</h2>
        <p class="text-xl text-gray-700 mb-6">இந்த 25 செயல்கள் உங்கள் வாழ்க்கையின் வழிகாட்டிகள். இவற்றை செய்யும் போது, உங்கள் வாழ்வு ஒழுக்கமானதாக, அழகானதாக, மற்றும் ஆன்மீகமானதாக மாறும். ஒவ்வொரு செயலும் ஒரு படி, ஒவ்வொரு படியும் ஒரு வளர்ச்சி.</p>
        <p class="text-lg text-green-800 italic">"செயல் இல்லாத வார்த்தை போல், விதை இல்லாத மரம் போல்"</p>
        <p class="text-lg text-gray-700 mt-4">May these 25 positive actions guide you to live as a true Tamilian with discipline, love, and wisdom. 🙏🌱❤️</p>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }
</style>
