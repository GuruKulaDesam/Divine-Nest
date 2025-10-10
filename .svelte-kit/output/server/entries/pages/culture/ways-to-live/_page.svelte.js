import { b as attr_class, a as ensure_array_like, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import { T as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredIncomePaths;
    const incomePaths = [
      // 🛕 1–5: ஆன்மீக சேவை வழிகள்
      {
        id: 1,
        category: "🛕 ஆன்மீக சேவை வழிகள்",
        categoryEnglish: "Spiritual Service Paths",
        title: "திருவிழா சமையல் சேவை",
        english: "Festival Cooking Service",
        description: "கோயில்களில் prasadam, சுந்தல், கொழுக்கட்டை தயாரிப்பு. திருவிழாக்களில் புனித உணவுகளை தயாரித்து சமூக சேவை செய்தல்.",
        skills: "சமையல், புனித உணவு தயாரிப்பு, திருவிழா அறிவு",
        impact: "கோயில் வருமானம், சமூக சேவை, ஆன்மீக தொடர்பு",
        icon: "heroicons:sparkles",
        color: "from-amber-100 to-orange-200"
      },
      {
        id: 2,
        category: "🛕 ஆன்மீக சேவை வழிகள்",
        categoryEnglish: "Spiritual Service Paths",
        title: "பஜனை குழு/பாடகர்",
        english: "Bhajan Group/Singer",
        description: "நிகழ்ச்சிகள், வீணை, இசை பயிற்சி. தமிழ் பஜனைகள் மற்றும் ஆன்மீக இசையை பாடி மக்களுக்கு ஆன்மீக அனுபவம் கொடுத்தல்.",
        skills: "பாட்டு, வீணை, இசை பயிற்சி, தமிழ் பாடல்கள்",
        impact: "ஆன்மீக வளர்ச்சி, கலை வழிபாடு, சமூக ஒற்றுமை",
        icon: "heroicons:musical-note",
        color: "from-purple-100 to-pink-200"
      },
      {
        id: 3,
        category: "🛕 ஆன்மீக சேவை வழிகள்",
        categoryEnglish: "Spiritual Service Paths",
        title: "பூஜை அலங்காரம் தொழில்",
        english: "Pooja Decoration Business",
        description: "பூ, கோலம், தீபம், கோயில் அலங்காரம். வீடுகள் மற்றும் கோயில்களுக்கு புனித அலங்காரங்கள் செய்து வழங்குதல்.",
        skills: "கோலம், பூ அலங்காரம், தீப அமைப்பு, வண்ண அறிவு",
        impact: "கலை வளர்ச்சி, ஆன்மீக சூழல், குடும்ப வருமானம்",
        icon: "heroicons:palette",
        color: "from-pink-100 to-rose-200"
      },
      {
        id: 4,
        category: "🛕 ஆன்மீக சேவை வழிகள்",
        categoryEnglish: "Spiritual Service Paths",
        title: "திருக்குறள்/பாட்டி கதை storyteller",
        english: "Tirukkural/Grandma Story Storyteller",
        description: "பள்ளி, podcast, Shivo voice integration. திருக்குறள் மற்றும் பாட்டி கதைகளை குழந்தைகளுக்கு கூறி தமிழ் மரபை பாதுகாத்தல்.",
        skills: "கதை சொல்லல், திருக்குறள் அறிவு, ஒலி பதிவு, குழந்தை உளவியல்",
        impact: "கல்வி, கலாச்சார பாதுகாப்பு, தமிழ் வளர்ச்சி",
        icon: "heroicons:book-open",
        color: "from-blue-100 to-indigo-200"
      },
      {
        id: 5,
        category: "🛕 ஆன்மீக சேவை வழிகள்",
        categoryEnglish: "Spiritual Service Paths",
        title: "திருவண்ணாமலை கிரிவலம் வழிகாட்டி",
        english: "Tiruvannamalai Girivalam Guide",
        description: "ஆன்மீக பயண சேவை, local guide. திருவண்ணாமலை கிரிவலம் பயணிகளுக்கு வழிகாட்டி மற்றும் ஆன்மீக விளக்கம் கொடுத்தல்.",
        skills: "உள்ளூர் அறிவு, ஆன்மீக வழிகாட்டல், பயண அமைப்பு, தமிழ் விளக்கம்",
        impact: "ஆன்மீக வளர்ச்சி, பயண சேவை, கலாச்சார பரிமாற்றம்",
        icon: "heroicons:map",
        color: "from-red-100 to-orange-200"
      },
      // 🌿 6–10: இயற்கை வாழ்வியல் தொழில்கள்
      {
        id: 6,
        category: "🌿 இயற்கை வாழ்வியல் தொழில்கள்",
        categoryEnglish: "Natural Lifestyle Businesses",
        title: "பசுமை உணவகங்கள்",
        english: "Green Restaurants",
        description: "கஞ்சி, சாமை, கீரை உணவுகள். இயற்கை உணவுகளை மையப்படுத்திய உணவகங்கள் நடத்தி ஆரோக்கிய உணவு வழங்குதல்.",
        skills: "இயற்கை சமையல், உணவு தயாரிப்பு, ஆரோக்கிய அறிவு, வாடிக்கையாளர் சேவை",
        impact: "ஆரோக்கியம், இயற்கை வளர்ச்சி, சுற்றுச்சூழல் பாதுகாப்பு",
        icon: "heroicons:leaf",
        color: "from-green-100 to-emerald-200"
      },
      {
        id: 7,
        category: "🌿 இயற்கை வாழ்வியல் தொழில்கள்",
        categoryEnglish: "Natural Lifestyle Businesses",
        title: "மரக்கன்றுகள் விற்பனை",
        english: "Sapling Sales",
        description: "பசுமை, நிழல், நன்மை. மரக்கன்றுகளை வளர்த்து விற்று சுற்றுச்சூழல் பாதுகாப்புக்கு பங்களிப்பு செய்தல்.",
        skills: "தோட்டக்கலை, மரம் அறிவு, விற்பனை, சுற்றுச்சூழல் அறிவு",
        impact: "சுற்றுச்சூழல் பாதுகாப்பு, பசுமை வளர்ச்சி, சமூக நன்மை",
        icon: "heroicons:tree-pine",
        color: "from-emerald-100 to-green-200"
      },
      {
        id: 8,
        category: "🌿 இயற்கை வாழ்வியல் தொழில்கள்",
        categoryEnglish: "Natural Lifestyle Businesses",
        title: "தேன், பனங்கற்கண்டு தயாரிப்பு",
        english: "Honey, Palm Jaggery Production",
        description: "இயற்கை சுகாதார பொருட்கள். தேன் மற்றும் பனங்கற்கண்டு தயாரித்து இயற்கை சுகாதார பொருட்களாக விற்றல்.",
        skills: "தேன் சேகரிப்பு, பனங்கற்கண்டு தயாரிப்பு, தர கட்டுப்பாடு, இயற்கை பொருட்கள் அறிவு",
        impact: "ஆரோக்கியம், இயற்கை வளர்ச்சி, கிராம பொருளாதாரம்",
        icon: "heroicons:beaker",
        color: "from-yellow-100 to-amber-200"
      },
      {
        id: 9,
        category: "🌿 இயற்கை வாழ்வியல் தொழில்கள்",
        categoryEnglish: "Natural Lifestyle Businesses",
        title: "நீர் சேமிப்பு ஆலோசகர்",
        english: "Water Conservation Consultant",
        description: "கிராமங்களில் awareness + consulting. நீர் சேமிப்பு முறைகளை கிராமங்களுக்கு கற்பித்து ஆலோசனை கொடுத்தல்.",
        skills: "நீர் மேலாண்மை, கிராம அறிவு, பயிற்சி தருதல், சமூக விழிப்புணர்வு",
        impact: "நீர் பாதுகாப்பு, கிராம வளர்ச்சி, சுற்றுச்சூழல் பாதுகாப்பு",
        icon: "heroicons:droplets",
        color: "from-blue-100 to-cyan-200"
      },
      {
        id: 10,
        category: "🌿 இயற்கை வாழ்வியல் தொழில்கள்",
        categoryEnglish: "Natural Lifestyle Businesses",
        title: "மழைபாசம் பயிற்சி முகாம்",
        english: "Rain Gratitude Training Camp",
        description: "குழந்தைகளுக்கான experiential workshops. மழைக்கு நன்றி சொல்லும் பயிற்சி முகாம்கள் நடத்தி இயற்கை மரியாதை கற்பித்தல்.",
        skills: "பயிற்சி வடிவமைப்பு, குழந்தை உளவியல், இயற்கை கல்வி, குழு நடத்தல்",
        impact: "இயற்கை மரியாதை, குழந்தை வளர்ச்சி, சமூக விழிப்புணர்வு",
        icon: "heroicons:cloud-rain",
        color: "from-cyan-100 to-blue-200"
      },
      // 🎨 11–15: கலை + பண்பாட்டு தொழில்கள்
      {
        id: 11,
        category: "🎨 கலை + பண்பாட்டு தொழில்கள்",
        categoryEnglish: "Art + Cultural Businesses",
        title: "கோலம் கலைஞர்",
        english: "Kolam Artist",
        description: "வீடு, விழா, wedding decoration. வீடுகள் மற்றும் விழாக்களுக்கு கோலம் வரைந்து அலங்காரம் செய்தல்.",
        skills: "கோலம் வரைதல், வண்ண அறிவு, வடிவமைப்பு, கலை புரிதல்",
        impact: "கலை வளர்ச்சி, பண்பாட்டு பாதுகாப்பு, குடும்ப வருமானம்",
        icon: "heroicons:paint-brush",
        color: "from-purple-100 to-violet-200"
      },
      {
        id: 12,
        category: "🎨 கலை + பண்பாட்டு தொழில்கள்",
        categoryEnglish: "Art + Cultural Businesses",
        title: "நாடகம் enactment + training",
        english: "Drama Enactment + Training",
        description: "storytelling, school workshops. தமிழ் கதைகளை நாடகமாக நடித்து பள்ளிகளுக்கு பயிற்சி கொடுத்தல்.",
        skills: "நடித்தல், கதை சொல்லல், பயிற்சி தருதல், குழந்தை கல்வி",
        impact: "கலை வளர்ச்சி, கல்வி, பண்பாட்டு பரிமாற்றம்",
        icon: "heroicons:presentation-chart-bar",
        color: "from-orange-100 to-red-200"
      },
      {
        id: 13,
        category: "🎨 கலை + பண்பாட்டு தொழில்கள்",
        categoryEnglish: "Art + Cultural Businesses",
        title: "பாட்டி சமையல் YouTube/Podcast",
        english: "Grandma Cooking YouTube/Podcast",
        description: "traditional recipes monetized. பாட்டி சமையல் குறிப்புகளை வீடியோ மற்றும் ஒலியாக பதிவு செய்து பணம் ஈட்டுதல்.",
        skills: "சமையல், வீடியோ தயாரிப்பு, ஒலி பதிவு, சமூக ஊடகம்",
        impact: "கலாச்சார பாதுகாப்பு, கல்வி, வருமானம்",
        icon: "heroicons:video-camera",
        color: "from-pink-100 to-rose-200"
      },
      {
        id: 14,
        category: "🎨 கலை + பண்பாட்டு தொழில்கள்",
        categoryEnglish: "Art + Cultural Businesses",
        title: "திருவிழா வீடியோ/புகைப்படம்",
        english: "Festival Video/Photography",
        description: "documenting rituals, selling prints. திருவிழாக்களை புகைப்படம் மற்றும் வீடியோ எடுத்து அச்சிட்டு விற்றல்.",
        skills: "புகைப்படம், வீடியோ, திருவிழா அறிவு, அச்சிடுதல்",
        impact: "கலாச்சார பதிவு, வருமானம், பண்பாட்டு பாதுகாப்பு",
        icon: "heroicons:camera",
        color: "from-indigo-100 to-blue-200"
      },
      {
        id: 15,
        category: "🎨 கலை + பண்பாட்டு தொழில்கள்",
        categoryEnglish: "Art + Cultural Businesses",
        title: "தமிழ் UI/UX வடிவமைப்பாளர்",
        english: "Tamil UI/UX Designer",
        description: "assistant apps, dashboards, devotional tools. தமிழ் கலாச்சாரத்தை பிரதிபலிக்கும் செயலிகள் மற்றும் கருவிகளை வடிவமைத்தல்.",
        skills: "UI/UX வடிவமைப்பு, தமிழ் கலாச்சாரம், செயலி வளர்ச்சி, பயனர் அனுபவம்",
        impact: "தொழில்நுட்பம், கலாச்சார ஒருங்கிணைப்பு, புதுமை",
        icon: "heroicons:computer-desktop",
        color: "from-teal-100 to-cyan-200"
      },
      // 📚 16–20: கல்வி + வழிகாட்டி தொழில்கள்
      {
        id: 16,
        category: "📚 கல்வி + வழிகாட்டி தொழில்கள்",
        categoryEnglish: "Education + Guide Businesses",
        title: "தமிழ் ஆசிரியர் (online/offline)",
        english: "Tamil Teacher (Online/Offline)",
        description: "spoken Tamil, grammar, culture. தமிழ் மொழி, இலக்கணம், கலாச்சாரத்தை கற்பித்தல்.",
        skills: "தமிழ் கற்பித்தல், இலக்கணம், கலாச்சார அறிவு, ஆன்லைன் கற்பித்தல்",
        impact: "கல்வி, மொழி பாதுகாப்பு, கலாச்சார வளர்ச்சி",
        icon: "heroicons:academic-cap",
        color: "from-blue-100 to-indigo-200"
      },
      {
        id: 17,
        category: "📚 கல்வி + வழிகாட்டி தொழில்கள்",
        categoryEnglish: "Education + Guide Businesses",
        title: "பழமொழி/திருக்குறள் trainer",
        english: "Proverb/Tirukkural Trainer",
        description: "schools, apps, family guides. பழமொழிகள் மற்றும் திருக்குறளை பள்ளிகள் மற்றும் குடும்பங்களுக்கு கற்பித்தல்.",
        skills: "பழமொழி அறிவு, திருக்குறள் விளக்கம், பயிற்சி தருதல், கல்வி வடிவமைப்பு",
        impact: "ஞானம், ஒழுக்கம், கல்வி",
        icon: "heroicons:light-bulb",
        color: "from-yellow-100 to-orange-200"
      },
      {
        id: 18,
        category: "📚 கல்வி + வழிகாட்டி தொழில்கள்",
        categoryEnglish: "Education + Guide Businesses",
        title: "Shivo assistant voice writer",
        english: "Shivo Assistant Voice Writer",
        description: "emotional Tamil prompts, narration. Shivo செயலிக்கு தமிழ் உணர்வு பிராம்ப்டுகள் மற்றும் ஒலி எழுத்து எழுதுதல்.",
        skills: "தமிழ் எழுத்து, உணர்வு புரிதல், ஒலி எழுத்து, செயலி வளர்ச்சி",
        impact: "தொழில்நுட்பம், உணர்வு வளர்ச்சி, தமிழ் பாதுகாப்பு",
        icon: "heroicons:microphone",
        color: "from-purple-100 to-pink-200"
      },
      {
        id: 19,
        category: "📚 கல்வி + வழிகாட்டி தொழில்கள்",
        categoryEnglish: "Education + Guide Businesses",
        title: "பசுமை வாழ்வியல் course creator",
        english: "Green Lifestyle Course Creator",
        description: "curriculum, booklets, workshops. பசுமை வாழ்வியல் பாடத்திட்டம் மற்றும் பயிற்சி நிரல் உருவாக்கம்.",
        skills: "பாடத்திட்ட வடிவமைப்பு, பயிற்சி தருதல், எழுத்து, பசுமை அறிவு",
        impact: "சுற்றுச்சூழல் கல்வி, வாழ்க்கை மாற்றம், ஆரோக்கியம்",
        icon: "heroicons:clipboard-document-list",
        color: "from-green-100 to-emerald-200"
      },
      {
        id: 20,
        category: "📚 கல்வி + வழிகாட்டி தொழில்கள்",
        categoryEnglish: "Education + Guide Businesses",
        title: "குடும்ப dashboard designer",
        english: "Family Dashboard Designer",
        description: "rituals, roles, emotional tracking. குடும்ப நடைமுறைகள் மற்றும் உணர்வு கண்காணிப்புக்கு டாஷ்போர்டு வடிவமைத்தல்.",
        skills: "UI வடிவமைப்பு, குடும்ப உளவியல், தரவு பகுப்பாய்வு, செயலி வளர்ச்சி",
        impact: "குடும்ப வளர்ச்சி, தொழில்நுட்பம், உணர்வு ஆரோக்கியம்",
        icon: "heroicons:chart-bar",
        color: "from-indigo-100 to-blue-200"
      },
      // 🧘 21–25: சத்துவம் + ஆன்மீக பொருட்கள்
      {
        id: 21,
        category: "🧘 சத்துவம் + ஆன்மீக பொருட்கள்",
        categoryEnglish: "Sattva + Spiritual Products",
        title: "வெந்தயக் கஞ்சி/கீரை mix preparation",
        english: "Fenugreek Porridge/Leaf Mix Preparation",
        description: "packaged healing foods. வெந்தயம் மற்றும் கீரை கலவையை தயாரித்து பேக் செய்து விற்றல்.",
        skills: "இயற்கை உணவு தயாரிப்பு, பேக் செய்தல், ஆரோக்கிய அறிவு, விற்பனை",
        impact: "ஆரோக்கியம், இயற்கை மருத்துவம், வருமானம்",
        icon: "heroicons:beaker",
        color: "from-orange-100 to-yellow-200"
      },
      {
        id: 22,
        category: "🧘 சத்துவம் + ஆன்மீக பொருட்கள்",
        categoryEnglish: "Sattva + Spiritual Products",
        title: "தியானம்/மௌனம் retreat facilitator",
        english: "Meditation/Silence Retreat Facilitator",
        description: "Tamil spiritual camps. தமிழ் ஆன்மீக முகாம்கள் நடத்தி தியானம் மற்றும் மௌன பயிற்சி கொடுத்தல்.",
        skills: "தியானம் வழிகாட்டல், முகாம் நிர்வாகம், ஆன்மீக அறிவு, குழு நடத்தல்",
        impact: "ஆன்மீக வளர்ச்சி, மன அமைதி, சமூக நன்மை",
        icon: "heroicons:moon",
        color: "from-gray-100 to-slate-200"
      },
      {
        id: 23,
        category: "🧘 சத்துவம் + ஆன்மீக பொருட்கள்",
        categoryEnglish: "Sattva + Spiritual Products",
        title: "பசுமை சமையல் புத்தகம்",
        english: "Green Cooking Book",
        description: "print + digital sales. பசுமை சமையல் குறிப்புகளை புத்தகமாக வெளியிட்டு விற்றல்.",
        skills: "சமையல் எழுத்து, புத்தக வடிவமைப்பு, வெளியீடு, விற்பனை",
        impact: "கல்வி, ஆரோக்கியம், கலாச்சார பாதுகாப்பு",
        icon: "heroicons:book-open",
        color: "from-green-100 to-teal-200"
      },
      {
        id: 24,
        category: "🧘 சத்துவம் + ஆன்மீக பொருட்கள்",
        categoryEnglish: "Sattva + Spiritual Products",
        title: "திருவிழா starter kits",
        english: "Festival Starter Kits",
        description: "பூ, தீபம், சாமி படங்கள் combo. திருவிழா கொண்டாட்டத்திற்கு தேவையான பொருட்களை கிட் செய்து விற்றல்.",
        skills: "திருவிழா அறிவு, பொருள் தேர்வு, பேக் செய்தல், விற்பனை",
        impact: "கலாச்சார பாதுகாப்பு, வசதி, வருமானம்",
        icon: "heroicons:gift",
        color: "from-pink-100 to-rose-200"
      },
      {
        id: 25,
        category: "🧘 சத்துவம் + ஆன்மீக பொருட்கள்",
        categoryEnglish: "Sattva + Spiritual Products",
        title: "பாட்டி குரல் voice-over artist",
        english: "Grandma Voice Voice-Over Artist",
        description: "devotional apps, Shivo modules. பாட்டி குரலில் ஆன்மீக செயலிகள் மற்றும் Shivo தொகுதிகளுக்கு ஒலி கொடுத்தல்.",
        skills: "ஒலி நடித்தல், தமிழ் உச்சரிப்பு, ஆன்மீக அறிவு, ஒலி பதிவு",
        impact: "கலாச்சார பாதுகாப்பு, தொழில்நுட்பம், ஆன்மீக வளர்ச்சி",
        icon: "heroicons:microphone",
        color: "from-purple-100 to-indigo-200"
      }
    ];
    let selectedTab = "income";
    let selectedCategory = "all";
    const incomeCategories = [
      {
        value: "all",
        label: "அனைத்தும் / All",
        icon: "heroicons:view-grid"
      },
      {
        value: "Spiritual Service Paths",
        label: "ஆன்மீக சேவை வழிகள்",
        icon: "heroicons:sparkles"
      },
      {
        value: "Natural Lifestyle Businesses",
        label: "இயற்கை வாழ்வியல் தொழில்கள்",
        icon: "heroicons:leaf"
      },
      {
        value: "Art + Cultural Businesses",
        label: "கலை + பண்பாட்டு தொழில்கள்",
        icon: "heroicons:paint-brush"
      },
      {
        value: "Education + Guide Businesses",
        label: "கல்வி + வழிகாட்டி தொழில்கள்",
        icon: "heroicons:academic-cap"
      },
      {
        value: "Sattva + Spiritual Products",
        label: "சத்துவம் + ஆன்மீக பொருட்கள்",
        icon: "heroicons:moon"
      }
    ];
    filteredIncomePaths = incomePaths;
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 svelte-1wsow0h"><div class="max-w-7xl mx-auto svelte-1wsow0h"><div class="flex items-center justify-between mb-8 svelte-1wsow0h"><div class="text-center flex-1 svelte-1wsow0h"><h1 class="text-6xl font-bold text-gray-800 mb-2 svelte-1wsow0h">💰 25 வழிகள்</h1> <p class="text-2xl text-gray-600 svelte-1wsow0h">25 Ways to Live</p> <p class="text-lg text-emerald-700 italic mt-2 svelte-1wsow0h">"தமிழ் வாழ்வியலை பின்பற்றும் 25 விதமான வாழ்க்கை முறைகள்"—இவை ஒவ்வொன்றும் தனித்துவமான நடை, ஆனால் தமிழின் நெறி, பாசம், ஆன்மீகம், பண்பாடு, இயற்கை மரியாதை ஆகியவற்றை உள்ளடக்கியது.</p></div> <button class="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 transform hover:scale-105 svelte-1wsow0h">`);
    Icon($$renderer2, { icon: "heroicons:arrow-left", class: "w-5 h-5 mr-2 inline" });
    $$renderer2.push(`<!----> Back to Wisdom</button></div> <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8 svelte-1wsow0h"><div class="flex justify-center space-x-4 svelte-1wsow0h"><button${attr_class(
      `flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${stringify(
        "bg-emerald-500 text-white shadow-lg"
      )}`,
      "svelte-1wsow0h"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-semibold svelte-1wsow0h">வருமான வழிகள்</span></button> <button${attr_class(
      `flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${stringify("bg-white/60 text-gray-700 hover:bg-white/80")}`,
      "svelte-1wsow0h"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-semibold svelte-1wsow0h">வாழ்க்கை முறைகள்</span></button></div></div> <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300 svelte-1wsow0h"><div class="text-center svelte-1wsow0h"><div class="text-7xl mb-4 svelte-1wsow0h">${escape_html("💰")}</div> <h2 class="text-4xl font-bold text-gray-800 mb-4 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`தமிழ் வருமான வழிகள்`);
    }
    $$renderer2.push(`<!--]--></h2> <p class="text-xl text-gray-700 mb-6 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`இவை தமிழ் மரபு, ஆன்மீகம், இயற்கை, கலை, கல்வி ஆகியவற்றை அடிப்படையாகக் கொண்ட வருமான வழிகள். ஒவ்வொரு வழியும் மனதை தெய்வீகமாக்கும் மற்றும் சமூகத்துக்கு பங்களிக்கும்.`);
    }
    $$renderer2.push(`<!--]--></p> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:sparkles",
        class: "w-8 h-8 text-emerald-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-emerald-800 svelte-1wsow0h">ஆன்மீக சேவை</div> <div class="text-sm text-emerald-600 svelte-1wsow0h">Spiritual Service</div></div> <div class="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:leaf",
        class: "w-8 h-8 text-teal-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-teal-800 svelte-1wsow0h">இயற்கை வாழ்வியல்</div> <div class="text-sm text-teal-600 svelte-1wsow0h">Natural Lifestyle</div></div> <div class="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:paint-brush",
        class: "w-8 h-8 text-cyan-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-cyan-800 svelte-1wsow0h">கலை + பண்பாடு</div> <div class="text-sm text-cyan-600 svelte-1wsow0h">Art + Culture</div></div> <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:academic-cap",
        class: "w-8 h-8 text-blue-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-blue-800 svelte-1wsow0h">கல்வி + வழிகாட்டி</div> <div class="text-sm text-blue-600 svelte-1wsow0h">Education + Guide</div></div> <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:moon",
        class: "w-8 h-8 text-indigo-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-indigo-800 svelte-1wsow0h">சத்துவம் + ஆன்மீகம்</div> <div class="text-sm text-indigo-600 svelte-1wsow0h">Sattva + Spiritual</div></div> <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:heart",
        class: "w-8 h-8 text-purple-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <div class="font-semibold text-purple-800 svelte-1wsow0h">தமிழ் மரபு</div> <div class="text-sm text-purple-600 svelte-1wsow0h">Tamil Heritage</div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8 svelte-1wsow0h"><div class="flex flex-wrap gap-2 justify-center svelte-1wsow0h"><!--[-->`);
    const each_array = ensure_array_like(incomeCategories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class(
        `flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${stringify(selectedCategory === category.value ? "bg-emerald-500 text-white shadow-lg" : "bg-white/60 text-gray-700 hover:bg-white/80")}`,
        "svelte-1wsow0h"
      )}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="text-sm svelte-1wsow0h">${escape_html(category.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(filteredIncomePaths);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let path = each_array_1[$$index_1];
        $$renderer2.push(`<div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300 svelte-1wsow0h"><div class="flex items-center space-x-3 mb-4 svelte-1wsow0h"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(path.color)} rounded-xl flex items-center justify-center shadow-lg`, "svelte-1wsow0h")}>`);
        Icon($$renderer2, { icon: path.icon, class: "w-6 h-6 text-gray-700" });
        $$renderer2.push(`<!----></div> <div class="svelte-1wsow0h"><div class="text-2xl font-bold text-gray-800 svelte-1wsow0h">${escape_html(path.id)}</div> <div class="text-sm text-gray-600 svelte-1wsow0h">${escape_html(path.category)}</div></div></div> <div class="mb-3 svelte-1wsow0h"><h3 class="text-xl font-bold text-gray-800 mb-1 svelte-1wsow0h">${escape_html(path.title)}</h3> <p class="text-sm text-gray-600 italic svelte-1wsow0h">${escape_html(path.english)}</p></div> <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 svelte-1wsow0h"><p class="text-sm text-gray-700 leading-relaxed svelte-1wsow0h">${escape_html(path.description)}</p></div> <div class="border-t border-gray-200 pt-4 space-y-3 svelte-1wsow0h"><div class="svelte-1wsow0h"><h4 class="font-semibold text-gray-800 mb-2 svelte-1wsow0h">🛠️ திறன்கள்:</h4> <p class="text-sm text-gray-700 svelte-1wsow0h">${escape_html(path.skills)}</p></div> <div class="svelte-1wsow0h"><h4 class="font-semibold text-gray-800 mb-2 svelte-1wsow0h">💡 தாகம்:</h4> <p class="text-sm text-gray-700 svelte-1wsow0h">${escape_html(path.impact)}</p></div></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredIncomePaths.length === 0 || selectedTab === "lifestyle") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12 svelte-1wsow0h">`);
      Icon($$renderer2, {
        icon: "heroicons:magnifying-glass",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-600 svelte-1wsow0h">No paths found</h3> <p class="text-gray-500 svelte-1wsow0h">Try adjusting your category filter</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-200 mt-12 transform hover:scale-105 transition-all duration-300 svelte-1wsow0h"><div class="text-center svelte-1wsow0h"><div class="text-6xl mb-4 svelte-1wsow0h">🕉️</div> <h2 class="text-4xl font-bold text-gray-800 mb-4 svelte-1wsow0h">பாட்டியின் ஆசீர்வாதம்</h2> <p class="text-xl text-gray-700 mb-6 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`இந்த 25 வருமான வழிகள் தமிழ் மரபை பாதுகாத்து, சமூகத்துக்கு பங்களித்து, மனதை தெய்வீகமாக்கும் வழிகள். ஒவ்வொரு வழியும் ஒரு சேவை, ஒரு வருமானம், ஒரு ஆன்மீக வளர்ச்சி.`);
    }
    $$renderer2.push(`<!--]--></p> <p class="text-lg text-emerald-800 italic svelte-1wsow0h">"வாழ்க்கை என்பது வழி, தமிழ் என்பது வழிகாட்டி"</p> <p class="text-lg text-gray-700 mt-4 svelte-1wsow0h">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`May these 25 income paths guide you to earn with dignity while serving your community and preserving Tamil heritage. 🙏💰❤️`);
    }
    $$renderer2.push(`<!--]--></p></div></div></div></div>`);
  });
}
export {
  _page as default
};
