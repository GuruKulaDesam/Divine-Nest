import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const voiceGuideData = [
      // Days 1-5
      {
        day: 1,
        title: "கால ஒழுக்கம்",
        englishTitle: "Time Discipline",
        voice: "calm, rhythmic",
        speaker: "Paati",
        icon: "heroicons:clock",
        color: "blue",
        content: "இன்று சதயம் நட்சத்திரம். இது சிவ வழிபாட்டுக்கு சிறந்த நாள். காலை 6:00க்கு முன்னால் எழுந்து, ஒரு ச்லோகா பாடு. ராகு காலம் 1:30–3:00. அந்த நேரத்தில் முக்கிய வேலை தவிர். இன்று நீ ஒழுக்கத்துடன் வாழும் நாள்."
      },
      {
        day: 2,
        title: "தினசரி வழிபாடு",
        englishTitle: "Daily Rituals",
        voice: "gentle, maternal",
        speaker: "Amma",
        icon: "heroicons:sparkles",
        color: "orange",
        content: "காலை எழுந்ததும், பாட்டிக்கு பூஜை சாமான்கள் கொடு. கோலம் போடு. 'ஓம் நமசிவாய' 5 முறை உச்சரிக்க. உணவு சாப்பிடும் முன் தண்ணீர் வழங்கு. இரவில் 'நன்றி' சொல்லும் பழக்கம் வளர்த்து."
      },
      {
        day: 3,
        title: "குடும்ப பங்கு",
        englishTitle: "Family Roles",
        voice: "wise, elder-like",
        speaker: "Paati",
        icon: "heroicons:users",
        color: "purple",
        content: "பாட்டி இன்று ஏகாதசி விரதம் இருக்கிறார். நீ பசுமை உணவுக்கு உதவ வேண்டும். அம்மா சமைக்கும்போது, சமையலறையில் அமைதியாக இரு. அப்பா கோயிலுக்கு செல்லும்போது, நீ பஜனை பாடு."
      },
      {
        day: 4,
        title: "திருவிழா பாடம்",
        englishTitle: "Festival Lesson",
        voice: "festive, joyful",
        speaker: "Amma",
        icon: "heroicons:cake",
        color: "yellow",
        content: "இன்று கார்த்திகை தீபம். வீட்டின் மேல் விளக்கு ஏற்று. பொரி உருண்டை தயார் செய்ய அம்மாவுக்கு உதவி செய். 'ஓம் நமசிவாய' உச்சரித்து ஒளியை மனதிற்குள் ஏற்று."
      },
      {
        day: 5,
        title: "ஆன்மீக நுண்ணறிவு",
        englishTitle: "Spiritual Wisdom",
        voice: "meditative, soft",
        speaker: "Paati",
        icon: "heroicons:heart",
        color: "pink",
        content: "நீ அமைதியாக இருக்க விரும்புகிறாய். இன்று 5 நிமிட அமைதி நேரம் எடுத்துக்கொள். 'நான் யாருக்கு உதவினேன்?' என சிந்திக்க. 'நான் யாரை மன்னிக்க வேண்டும்?' என எழுதிக்கொள்."
      },
      // Days 6-10
      {
        day: 6,
        title: "பண்பாட்டு வாழ்வியல்",
        englishTitle: "Cultural Lifestyle",
        voice: "playful, curious",
        speaker: "Child",
        icon: "heroicons:musical-note",
        color: "teal",
        content: "இன்று நாம் ஒரு பழமொழி கற்றுக்கொள்கிறோம்: 'அறம் செய விரும்பு'. இதன் பொருள் – நல்லதை செய், அதில் மகிழ்ச்சி உண்டு. பாட்டியுடன் தமிழில் உரையாடு. ஒரு தமிழ் சொல் கற்று, அதை பயன்படுத்து."
      },
      {
        day: 7,
        title: "சிந்தனை",
        englishTitle: "Reflection",
        voice: "reflective, warm",
        speaker: "Amma",
        icon: "heroicons:pencil",
        color: "indigo",
        content: "நீ யாருக்கு உதவினாய்? யாரிடம் நன்றி சொல்ல வேண்டும்? இன்று ஒரு 'நன்றி கடிதம்' எழுது. பாட்டிக்கு, அம்மாவுக்கு, அல்லது அப்பாவுக்கு. நாளை எப்படி நல்லது செய்யலாம் என சிந்திக்க."
      },
      {
        day: 8,
        title: "திருவிழா பாடம்: பொங்கல்",
        englishTitle: "Festival Lesson: Pongal",
        voice: "festive, earthy",
        speaker: "Appa",
        icon: "heroicons:fire",
        color: "green",
        content: "இன்று பொங்கல். பானையை அலங்கரிக்க, 'பொங்கலோ பொங்கல்' என முழக்கமிடு. அம்மாவுக்கு சமையலில் உதவி செய். பாட்டி பஞ்சாங்கம் பார்த்து நல்ல நேரம் சொல்வார். இயற்கைக்கு நன்றி சொல்லும் நாள் இது."
      },
      {
        day: 9,
        title: "குடும்ப பங்கு: பாட்டி",
        englishTitle: "Family Role: Paati",
        voice: "wise, gentle",
        speaker: "Paati",
        icon: "heroicons:user-circle",
        color: "gray",
        content: "நான் இன்று பௌர்ணமி பூஜை செய்கிறேன். நீ பூக்கள் தயார் செய்யலாம். சந்திரனை பார்த்து 'ஓம் சோமாய நமஹ' என உச்சரிக்க. அமைதியாக இரு, ஒளியை உள்ளத்தில் ஏற்று."
      },
      {
        day: 10,
        title: "ஆன்மீக நுண்ணறிவு: நன்றி",
        englishTitle: "Spiritual Wisdom: Gratitude",
        voice: "soft, nurturing",
        speaker: "Amma",
        icon: "heroicons:hand-heart",
        color: "rose",
        content: "நன்றி என்பது ஒரு வலிமை. இன்று அம்மா சமைத்த உணவுக்கு நன்றி சொல்லு. பாட்டி கதை சொல்லியதற்கு நன்றி. அப்பா வேலை செய்து வருகிறார் – அவருக்கு நன்றி. நன்றி சொல்லும் போது கண்களில் பார்வை இருக்கட்டும்."
      },
      // Days 11-15
      {
        day: 11,
        title: "தியானம்: அமைதி",
        englishTitle: "Meditation: Peace",
        voice: "meditative, soft",
        speaker: "Paati",
        icon: "heroicons:moon",
        color: "blue",
        content: "இன்று பௌர்ணமி. சந்திரனை பார்த்து 'ஓம் சோமாய நமஹ' என உச்சரிக்க. 10 நிமிட அமைதி நேரம் எடுத்துக்கொள். உன் உள்ளத்தில் ஒளி பரவட்டும். அமைதி என்பது வலிமை."
      },
      {
        day: 12,
        title: "குழந்தையின் பங்கு",
        englishTitle: "Child's Role",
        voice: "curious, respectful",
        speaker: "Child",
        icon: "heroicons:academic-cap",
        color: "purple",
        content: "நான் இன்று பாட்டிக்கு பூஜை சாமான்கள் கொடுத்தேன். அம்மாவுக்கு சமையலில் உதவினேன். அப்பாவுடன் கோயிலுக்கு சென்றேன். நான் ஒரு தமிழர் குழந்தை. நான் ஒழுக்கத்துடன் வாழ்கிறேன்."
      },
      {
        day: 13,
        title: "திருவிழா பாடம்: நவராத்திரி",
        englishTitle: "Festival Lesson: Navaratri",
        voice: "festive, graceful",
        speaker: "Amma",
        icon: "heroicons:star",
        color: "pink",
        content: "இன்று நவராத்திரி. கொலு பொம்மைகள் வரிசையாக அமைக்கப்பட்டுள்ளன. சுந்தல் தயார். பஜனை பாடு. சக்தி உன் உள்ளத்தில் இருக்கட்டும். பெண்களின் வலிமையை மதிக்கவும், கொண்டாடவும் கற்றுக்கொள்."
      },
      {
        day: 14,
        title: "குடும்ப ஒழுக்கம்: அப்பா",
        englishTitle: "Family Discipline: Appa",
        voice: "firm, warm",
        speaker: "Appa",
        icon: "heroicons:shield-check",
        color: "green",
        content: "நீ நேரம் பார்த்து செயல்பட வேண்டும். காலை 6:00க்கு எழுந்து, ச்லோகா பாடு. மதிய உணவுக்கு முன் தண்ணீர் வழங்கு. இரவில் 'நன்றி' சொல்லும் பழக்கம் வளர்த்து. ஒழுக்கம் என்பது ஒளி."
      },
      {
        day: 15,
        title: "சிந்தனை: மன்னிப்பு",
        englishTitle: "Reflection: Forgiveness",
        voice: "gentle, healing",
        speaker: "Paati",
        icon: "heroicons:sparkles",
        color: "indigo",
        content: "நீ யாரை மன்னிக்க வேண்டும்? யாரிடம் மனம் திறக்க வேண்டும்? இன்று ஒரு மௌன நேரம் எடுத்துக்கொள். 'ஓம் சாந்தி' என உச்சரிக்க. மன்னிப்பு என்பது சுத்தம். உன் உள்ளம் சுத்தமாகட்டும்."
      },
      // Days 16-20
      {
        day: 16,
        title: "இயற்கை நன்றி",
        englishTitle: "Nature Gratitude",
        voice: "earthy, reverent",
        speaker: "Paati",
        icon: "heroicons:leaf",
        color: "emerald",
        content: "இன்று மழை. நீ வெளியே சென்று மண்ணின் வாசனை உணர்ந்தால், அது உன் உள்ளத்தை அமைதியாக்கும். ஒரு மரத்திற்கு நீர் ஊற்று. இயற்கைக்கு நன்றி சொல்லும் பழக்கம் வளர்த்து."
      },
      {
        day: 17,
        title: "உணவு ஒழுக்கம்",
        englishTitle: "Food Discipline",
        voice: "practical, warm",
        speaker: "Amma",
        icon: "heroicons:cup-soda",
        color: "orange",
        content: "இன்று சத்துவ உணவுக்கு நேரம். இட்லி, சாம்பார், பசுமை காய்கறிகள். உணவுக்கு முன் 'ஓம் அன்னபூர்ணே நமஹ' என உச்சரிக்க. உணவு என்பது பிரசாதம். அதை நன்றியுடன் சாப்பிடு."
      },
      {
        day: 18,
        title: "தியானம்: சிந்தனை",
        englishTitle: "Meditation: Reflection",
        voice: "meditative, introspective",
        speaker: "Appa",
        icon: "heroicons:eye",
        color: "blue",
        content: "இன்று 10 நிமிட அமைதி நேரம் எடுத்துக்கொள். 'நான் யாரை today மன்னிக்க வேண்டும்?' என சிந்திக்க. உன் உள்ளம் சுத்தமாகட்டும். அமைதி என்பது வலிமை—not silence, but strength."
      },
      {
        day: 19,
        title: "கலை: பஜனை",
        englishTitle: "Art: Bhajan",
        voice: "melodic, joyful",
        speaker: "Child",
        icon: "heroicons:musical-note",
        color: "yellow",
        content: "இன்று நான் 'கண்ணா கண்ணா' பஜனை பாடுகிறேன். வீணை இசை கேட்கிறேன். பாட்டி சொன்னார் – இசை என்பது ஆன்மாவின் மொழி. நீ ஒரு பாடலை மனதுடன் பாடு. அது உன் உள்ளத்தை ஒளியாக்கும்."
      },
      {
        day: 20,
        title: "சிந்தனை: 'நான் யார்?'",
        englishTitle: "Reflection: 'Who Am I?'",
        voice: "gentle, philosophical",
        speaker: "Paati",
        icon: "heroicons:user",
        color: "purple",
        content: "நீ யார்? உன் பெயருக்கு அப்பால், உன் பாசத்திற்கு அப்பால், உன் செயல்களுக்கு பின்னால் – உன் உள்ளம் என்ன சொல்கிறது? இன்று ஒரு வார்த்தை எழுது: 'நான்…'. அதில் உன் உண்மை இருக்கட்டும்."
      },
      // Days 21-25
      {
        day: 21,
        title: "பௌர்ணமி சிந்தனை",
        englishTitle: "Pournami Reflection",
        voice: "serene, luminous",
        speaker: "Paati",
        icon: "heroicons:moon",
        color: "silver",
        content: "இன்று பௌர்ணமி. சந்திர ஒளி உன் உள்ளத்தில் பரவட்டும். ஒரு தீபம் ஏற்று, 'ஓம் சோமாய நமஹ' என உச்சரிக்க. இன்று நீ அமைதியாக இருக்க வேண்டும்—not just outside, but inside."
      },
      {
        day: 22,
        title: "சுத்தம் ஒரு வழிபாடு",
        englishTitle: "Cleanliness as Worship",
        voice: "practical, gentle",
        speaker: "Amma",
        icon: "heroicons:sparkles",
        color: "cyan",
        content: "இன்று வீட்டை சுத்தம் செய்யும் நாள். பூஜை அறை, சமையலறை, உன் படுக்கை—all need care. சுத்தம் என்பது ஒரு வழிபாடு. நீ சுத்தம் செய்யும் போது, உன் மனமும் சுத்தமாகும்."
      },
      {
        day: 23,
        title: "பாட்டியின் கதை",
        englishTitle: "Paati's Story",
        voice: "nostalgic, wise",
        speaker: "Paati",
        icon: "heroicons:book-open",
        color: "brown",
        content: "நான் ஒரு காலத்தில், பொங்கலுக்கு பானையை கையால் அலங்கரித்தேன். பூக்கள், மஞ்சள், குங்குமம்—all were part of my prayer. நீயும் இன்று ஒரு பானையை அலங்கரிக்கலாம். அது ஒரு கலை, ஒரு அர்ப்பணம்."
      },
      {
        day: 24,
        title: "தியானம்: 'நான் யாரை today உதவினேன்?'",
        englishTitle: "Meditation: 'Who Did I Help Today?'",
        voice: "introspective, warm",
        speaker: "Appa",
        icon: "heroicons:hand-raised",
        color: "green",
        content: "நீ யாருக்கு today உதவினாய்? ஒரு வார்த்தை, ஒரு உதவி, ஒரு அமைதி. அதை நினைத்துப் பாரு. உதவி என்பது ஒரு வழிபாடு. நாளை நீ யாருக்கு உதவ விரும்புகிறாய்?"
      },
      {
        day: 25,
        title: "கலை: நாடகம்",
        englishTitle: "Art: Drama",
        voice: "playful, expressive",
        speaker: "Child",
        icon: "heroicons:presentation-chart-line",
        color: "orange",
        content: "இன்று நான் 'கண்ணன் வெண்ணெய் திருடும் நாடகம்' நடிக்கிறேன். பாட்டி கதையை சொன்னார். நான் அதை enact செய்கிறேன். கலை என்பது உணர்வின் விளையாட்டு. நீயும் ஒரு கதையை enact செய்யலாம்."
      },
      // Days 26-30
      {
        day: 26,
        title: "தியானம்: 'நான் யாரை today மகிழ்ச்சியாக்கினேன்?'",
        englishTitle: "Meditation: 'Who Did I Make Happy Today?'",
        voice: "thoughtful, gentle",
        speaker: "Appa",
        icon: "heroicons:face-smile",
        color: "yellow",
        content: "நீ யாரை today மகிழ்ச்சியாக்கினாய்? ஒரு வார்த்தை, ஒரு உதவி, ஒரு சிரிப்பு. அது உன் வாழ்க்கையின் ஒளி. நாளை நீ யாரை மகிழ்ச்சியாக்க விரும்புகிறாய்?"
      },
      {
        day: 27,
        title: "திருவிழா பாடம்: தீபாவளி",
        englishTitle: "Festival Lesson: Deepavali",
        voice: "festive, radiant",
        speaker: "Amma",
        icon: "heroicons:light-bulb",
        color: "gold",
        content: "இன்று தீபாவளி. எண்ணெய் குளியல், இனிப்பு, ஒளி—all are part of renewal. பட்டாசு பொறுப்புடன் வெடிக்கவும். ஒளி உன் உள்ளத்தில் பரவட்டும். பழையதை விட்டுவிட்டு புதியதை வரவேற்கும் நாள்."
      },
      {
        day: 28,
        title: "பாட்டியின் பாடம்: பொறுமை",
        englishTitle: "Paati's Lesson: Patience",
        voice: "slow, wise",
        speaker: "Paati",
        icon: "heroicons:clock",
        color: "sage",
        content: "பொறுமை என்பது ஒரு பூ. அது மெதுவாக மலர்கிறது. இன்று நீ பதில் சொல்லும் முன் சிந்திக்க. அமைதியாக இரு. உன் வார்த்தைகள் பூவாகட்டும்—not கல்லாக."
      },
      {
        day: 29,
        title: "கலை: கோலம்",
        englishTitle: "Art: Kolam",
        voice: "playful, focused",
        speaker: "Child",
        icon: "heroicons:paint-brush",
        color: "coral",
        content: "இன்று நான் கோலம் போடுகிறேன். அரிசி மாவு, பூ, அமைதி. கோலம் என்பது ஒரு தியானம். நான் ஒரு வட்டம் போடுகிறேன். அதில் என் மனம் சுத்தமாகிறது."
      },
      {
        day: 30,
        title: "சிந்தனை: 'நான் எப்படி வாழ விரும்புகிறேன்?'",
        englishTitle: "Reflection: 'How Do I Want to Live?'",
        voice: "reflective, soulful",
        speaker: "Appa",
        icon: "heroicons:sparkles",
        color: "violet",
        content: "நீ எப்படி வாழ விரும்புகிறாய்? ஒழுக்கத்துடன்? பாசத்துடன்? அமைதியுடன்? இன்று ஒரு வார்த்தை எழுது: 'நான் வாழ விரும்புகிறேன்…'. அதில் உன் வாழ்வின் விதி இருக்கட்டும்."
      }
    ];
    function getSpeakerIcon(speaker) {
      switch (speaker) {
        case "Paati":
          return "heroicons:user-circle";
        case "Amma":
          return "heroicons:heart";
        case "Appa":
          return "heroicons:shield-check";
        case "Child":
          return "heroicons:academic-cap";
        default:
          return "heroicons:user";
      }
    }
    function getSpeakerColor(speaker) {
      switch (speaker) {
        case "Paati":
          return "from-purple-500 to-indigo-600";
        case "Amma":
          return "from-pink-500 to-rose-600";
        case "Appa":
          return "from-blue-500 to-cyan-600";
        case "Child":
          return "from-green-500 to-emerald-600";
        default:
          return "from-gray-500 to-gray-600";
      }
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 svelte-1bnyvuh"><div class="max-w-7xl mx-auto svelte-1bnyvuh"><div class="flex items-center justify-between mb-8 svelte-1bnyvuh"><div class="text-center flex-1 svelte-1bnyvuh"><h1 class="text-5xl font-bold text-gray-800 mb-2 svelte-1bnyvuh">🎙️ தினசரி ஒலி வழிகாட்டி</h1> <p class="text-xl text-gray-600 svelte-1bnyvuh">Daily Voice Guide – 30 Days of Tamil Living</p> <p class="text-lg text-amber-700 italic mt-2 svelte-1bnyvuh">Shivo's Gentle Voice for Your Soul</p></div> <button class="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 transform hover:scale-105 svelte-1bnyvuh">`);
    Icon($$renderer2, { icon: "heroicons:arrow-left", class: "w-5 h-5 mr-2 inline" });
    $$renderer2.push(`<!----> Back to Wisdom</button></div> <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="text-center svelte-1bnyvuh"><div class="text-6xl mb-4 svelte-1bnyvuh">🗣️</div> <h2 class="text-3xl font-bold text-gray-800 mb-4 svelte-1bnyvuh">Shivo Daily Voice Guide</h2> <p class="text-lg text-gray-700 mb-6 svelte-1bnyvuh">A 30-day journey of Tamil wisdom, delivered in the loving voices of your family. Each day brings one lesson, one reflection, and one practice—spoken with the gentle warmth of Paati, Amma, Appa, and your inner child.</p> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 svelte-1bnyvuh"><div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 text-center svelte-1bnyvuh">`);
    Icon($$renderer2, {
      icon: "heroicons:user-circle",
      class: "w-8 h-8 text-purple-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <div class="font-semibold text-purple-800 svelte-1bnyvuh">Paati</div> <div class="text-sm text-purple-600 svelte-1bnyvuh">Wise &amp; Gentle</div></div> <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-4 text-center svelte-1bnyvuh">`);
    Icon($$renderer2, {
      icon: "heroicons:heart",
      class: "w-8 h-8 text-pink-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <div class="font-semibold text-pink-800 svelte-1bnyvuh">Amma</div> <div class="text-sm text-pink-600 svelte-1bnyvuh">Nurturing &amp; Warm</div></div> <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 text-center svelte-1bnyvuh">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-8 h-8 text-blue-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <div class="font-semibold text-blue-800 svelte-1bnyvuh">Appa</div> <div class="text-sm text-blue-600 svelte-1bnyvuh">Firm &amp; Guiding</div></div> <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 text-center svelte-1bnyvuh">`);
    Icon($$renderer2, {
      icon: "heroicons:academic-cap",
      class: "w-8 h-8 text-green-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <div class="font-semibold text-green-800 svelte-1bnyvuh">Child</div> <div class="text-sm text-green-600 svelte-1bnyvuh">Curious &amp; Playful</div></div></div></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🌅 Days 1-5: Foundation</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array = ensure_array_like(voiceGuideData.slice(0, 5));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let day = each_array[$$index];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🌿 Days 6-10: Growth</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array_1 = ensure_array_like(voiceGuideData.slice(5, 10));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let day = each_array_1[$$index_1];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🧘 Days 11-15: Reflection</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array_2 = ensure_array_like(voiceGuideData.slice(10, 15));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let day = each_array_2[$$index_2];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🎨 Days 16-20: Expression</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array_3 = ensure_array_like(voiceGuideData.slice(15, 20));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let day = each_array_3[$$index_3];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🌟 Days 21-25: Mastery</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array_4 = ensure_array_like(voiceGuideData.slice(20, 25));
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let day = each_array_4[$$index_4];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12 svelte-1bnyvuh"><h2 class="text-4xl font-bold text-center text-gray-800 mb-8 svelte-1bnyvuh">🎉 Days 26-30: Completion</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1bnyvuh"><!--[-->`);
    const each_array_5 = ensure_array_like(voiceGuideData.slice(25, 30));
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let day = each_array_5[$$index_5];
      $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="flex items-center space-x-3 mb-4 svelte-1bnyvuh"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(getSpeakerColor(day.speaker))} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1bnyvuh")}>`);
      Icon($$renderer2, {
        icon: getSpeakerIcon(day.speaker),
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="svelte-1bnyvuh"><h3 class="text-xl font-bold text-gray-800 svelte-1bnyvuh">Day ${escape_html(day.day)}</h3> <p class="text-sm text-gray-600 svelte-1bnyvuh">${escape_html(day.englishTitle)}</p></div></div> <div class="mb-3 svelte-1bnyvuh"><span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium svelte-1bnyvuh">🗣️ ${escape_html(day.voice)} • ${escape_html(day.speaker)}</span></div> <p class="text-gray-700 italic leading-relaxed svelte-1bnyvuh">"${escape_html(day.content)}"</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200 mb-8 transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh"><div class="text-center svelte-1bnyvuh"><div class="text-6xl mb-4 svelte-1bnyvuh">🎊</div> <h2 class="text-4xl font-bold text-gray-800 mb-4 svelte-1bnyvuh">30 Days Complete! 🌟</h2> <p class="text-xl text-gray-700 mb-6 svelte-1bnyvuh">You have journeyed through 30 days of Tamil wisdom, guided by the loving voices of your family. Each day brought a lesson, a reflection, and a practice—spoken with the gentle warmth that connects generations.</p> <p class="text-lg text-amber-800 italic mb-6 svelte-1bnyvuh">"பழமையை கற்றுக்கொள், நிகழ்காலத்தில் வாழ், எதிர்காலத்தை கட்டமை செய்"</p> <p class="text-lg text-gray-700 svelte-1bnyvuh">Ready to begin again? Your Tamil soul knows the way. 🕉️</p></div></div> <div class="text-center svelte-1bnyvuh"><button class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 svelte-1bnyvuh">`);
    Icon($$renderer2, { icon: "heroicons:arrow-left", class: "w-6 h-6 mr-2 inline" });
    $$renderer2.push(`<!----> Back to Wisdom Menu</button></div></div></div>`);
  });
}
export {
  _page as default
};
