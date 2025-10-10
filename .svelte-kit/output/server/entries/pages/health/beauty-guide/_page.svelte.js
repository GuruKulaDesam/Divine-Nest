import { a as ensure_array_like, b as attr_class, s as stringify, h as head } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
const beautyCategories = {
  skin: {
    title: "தோல் பராமரிப்பு",
    english: "Skin Care",
    icon: "heroicons:sparkles",
    description: "தமிழ் மரபு முறைகள் மற்றும் நவீன அறிவியல்"
  },
  hair: {
    title: "முடி பராமரிப்பு",
    english: "Hair Care",
    icon: "heroicons:scissors",
    description: "இயற்கை பொருட்கள் மற்றும் சமீபத்திய முறைகள்"
  },
  makeup: {
    title: "அலங்காரம்",
    english: "Makeup",
    icon: "heroicons:eye",
    description: "தமிழ் மரபு அலங்காரம் மற்றும் நவீன டிரெண்டுகள்"
  },
  wellness: {
    title: "உடல் நலம்",
    english: "Wellness",
    icon: "heroicons:heart",
    description: "உள் மற்றும் வெளி அழகு பராமரிப்பு"
  }
};
const traditionalRemedies = {
  skin: [
    {
      name: "தயிர் முக மூடி",
      english: "Yogurt Face Mask",
      ingredients: ["தயிர்", "தேன்", "எலுமிச்சை சாறு"],
      benefits: "தோல் ஒளி மற்றும் மென்மையை அதிகரிக்கும்",
      instructions: "தயிர், தேன் மற்றும் எலுமிச்சை சாறு கலந்து 15 நிமிடம் வைத்திருந்து கழுவவும்",
      cyclePhase: "எல்லா நாட்களும்"
    },
    {
      name: "நெய் மஞ்சள் தடவல்",
      english: "Turmeric Ghee Massage",
      ingredients: ["நெய்", "மஞ்சள் தூள்", "மிளகு"],
      benefits: "தோல் நிறத்தை சீராக்கி ஒளியூட்டும்",
      instructions: "நெய்யில் மஞ்சள் கலந்து முகத்தில் தடவி 20 நிமிடம் வைத்திருக்கவும்",
      cyclePhase: "மாதவிடாய் காலம்"
    }
  ],
  hair: [
    {
      name: "அம்லா முடி எண்ணெய்",
      english: "Amla Hair Oil",
      ingredients: ["அம்லா", "கற்பூரம்", "கடுக்காய் எண்ணெய்"],
      benefits: "முடி வளர்ச்சியை அதிகரித்து வலுப்படுத்தும்",
      instructions: "அம்லாவை நீரில் ஊறவைத்து எண்ணெய் சேர்த்து தலைக்கு தேய்க்கவும்",
      cyclePhase: "எல்லா நாட்களும்"
    },
    {
      name: "கற்பூர முடி பாக்",
      english: "Camphor Hair Pack",
      ingredients: ["கற்பூரம்", "எண்ணெய்", "முட்டை மஞ்சள்"],
      benefits: "முடி உதிர்வை குறைத்து வலுப்படுத்தும்",
      instructions: "கற்பூரம் மற்றும் மஞ்சள் கலந்து முடியில் தடவி 30 நிமிடம் வைத்திருக்கவும்",
      cyclePhase: "மாதவிடாய் காலம்"
    }
  ]
};
const modernTips = {
  skin: [
    {
      title: "உணவு மற்றும் தோல்",
      content: "ஆன்டிஆக்ஸிடன்ட் நிறைந்த உணவுகள் தோலை பாதுகாக்கும். விட்டமின் C மற்றும் E நிறைந்த பழங்கள் சாப்பிடுங்கள்.",
      icon: "heroicons:apple"
    },
    {
      title: "தண்ணீர் குடித்தல்",
      content: "தினமும் 8 கிளாஸ் தண்ணீர் குடிப்பது தோலை ஹைட்ரேட் செய்து ஒளியூட்டும்.",
      icon: "heroicons:droplets"
    },
    {
      title: "தூக்கம் முக்கியம்",
      content: "எல்லாம் 7-8 மணி நேர தூக்கம் தோல் செல்களை புதுப்பிக்க உதவும்.",
      icon: "heroicons:moon"
    }
  ],
  hair: [
    {
      title: "சூடான எண்ணெய் மசாஜ்",
      content: "வாரம் ஒரு முறை சூடான எண்ணெய் மசாஜ் செய்வது முடியை வலுப்படுத்தும்.",
      icon: "heroicons:fire"
    },
    {
      title: "புரோட்டீன் நிறைந்த உணவு",
      content: "முடி வளர்ச்சிக்கு புரோட்டீன் முக்கியம். முட்டை, கொட்டை வகைகள் சாப்பிடுங்கள்.",
      icon: "heroicons:egg"
    },
    {
      title: "குறைந்த வெப்பம்",
      content: "ஹேர்ட்ரையர் மற்றும் ஸ்ட்ரெய்ட்னர்களை குறைவாக பயன்படுத்துங்கள்.",
      icon: "heroicons:thermometer"
    }
  ]
};
const seasonalTips = {
  summer: {
    title: "கோடை பராமரிப்பு",
    english: "Summer Care",
    tips: [
      "தோலை ஈரப்பதமாக வைத்திருங்கள்",
      "சூரிய ஒளியில் இருந்து பாதுகாப்பு",
      "இலகு தோல் பராமரிப்பு பொருட்கள் பயன்படுத்துங்கள்"
    ]
  },
  winter: {
    title: "குளிர்கால பராமரிப்பு",
    english: "Winter Care",
    tips: [
      "தோலை ஈரப்பதமாக்கும் க்ரீம்கள் பயன்படுத்துங்கள்",
      "சூடான தண்ணீரில் குளிக்காமல் இருங்கள்",
      "முடியை ஈரப்பதமாக்கும் மாஸ்க்குகள் போடுங்கள்"
    ]
  },
  monsoon: {
    title: "மழைக்கால பராமரிப்பு",
    english: "Monsoon Care",
    tips: [
      "தோலை சுத்தமாக வைத்திருங்கள்",
      "பூஞ்சை தொற்றை தடுக்கும் பொருட்கள் பயன்படுத்துங்கள்",
      "முடியை உலர வைத்திருங்கள்"
    ]
  }
};
const beautyWisdom = [
  {
    quote: "அழகு என்பது வெளிப்புறம் மட்டுமல்ல, உள் அழகு முக்கியம்",
    english: "Beauty is not just external, inner beauty is important",
    author: "தமிழ் மரபு"
  },
  {
    quote: "தோல் பராமரிப்பு தினமும் செய்ய வேண்டிய ஒன்று",
    english: "Skin care is something to be done daily",
    author: "நவீன அறிவியல்"
  },
  {
    quote: "உணவு மற்றும் தூக்கம் அழகை தீர்மானிக்கும்",
    english: "Food and sleep determine beauty",
    author: "ஆரோக்கிய நிபுணர்"
  }
];
function BeautyGuide($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedCategory = "skin";
    let selectedSeason = "summer";
    const categories = Object.entries(beautyCategories);
    const seasons = Object.entries(seasonalTips);
    $$renderer2.push(`<div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg"><div class="flex items-center space-x-3 mb-6">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 text-rose-500" });
    $$renderer2.push(`<!----> <div><h3 class="text-lg font-semibold text-rose-800 dark:text-rose-200">அழகு வழிகாட்டி</h3> <p class="text-sm text-rose-600 dark:text-rose-300">Beauty Guide</p></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, category] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedCategory === key ? "bg-rose-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-5 h-5" });
      $$renderer2.push(`<!----> <div class="text-center"><div class="text-sm font-medium">${escape_html(category.title)}</div> <div class="text-xs opacity-75">${escape_html(category.english)}</div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6"><h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">மரபு முறைகள்</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(traditionalRemedies[selectedCategory]);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let remedy = each_array_1[$$index_2];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"><h5 class="font-medium text-gray-900 dark:text-white mb-2">${escape_html(remedy.name)}</h5> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${escape_html(remedy.english)}</p> <div class="mb-2"><span class="text-xs font-medium text-rose-600 dark:text-rose-400">பொருட்கள்:</span> <div class="flex flex-wrap gap-1 mt-1"><!--[-->`);
        const each_array_2 = ensure_array_like(remedy.ingredients);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let ingredient = each_array_2[$$index_1];
          $$renderer2.push(`<span class="px-2 py-1 bg-rose-100 text-rose-800 rounded text-xs">${escape_html(ingredient)}</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> <p class="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>நன்மை:</strong> ${escape_html(remedy.benefits)}</p> <p class="text-sm text-gray-700 dark:text-gray-300"><strong>வழிமுறை:</strong> ${escape_html(remedy.instructions)}</p> <p class="text-xs text-rose-600 dark:text-rose-400 mt-2">சுழற்சி கட்டம்: ${escape_html(remedy.cyclePhase)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="mb-6"><h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">நவீன குறிப்புகள்</h4> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
      const each_array_3 = ensure_array_like(modernTips[selectedCategory]);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let tip = each_array_3[$$index_3];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">`);
        Icon($$renderer2, { icon: tip.icon, class: "w-8 h-8 text-rose-500 mx-auto mb-2" });
        $$renderer2.push(`<!----> <h5 class="font-medium text-gray-900 dark:text-white mb-2">${escape_html(tip.title)}</h5> <p class="text-sm text-gray-700 dark:text-gray-300">${escape_html(tip.content)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-6"><h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">பருவகால குறிப்புகள்</h4> <div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
    const each_array_4 = ensure_array_like(seasons);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let [key, season] = each_array_4[$$index_4];
      $$renderer2.push(`<button${attr_class(`px-4 py-2 rounded-lg transition-all ${stringify(selectedSeason === key ? "bg-green-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20")}`)}>${escape_html(season.title)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white dark:bg-gray-800 rounded-lg p-4"><h5 class="font-medium text-gray-900 dark:text-white mb-2">${escape_html(seasonalTips[selectedSeason].title)}</h5> <ul class="space-y-1"><!--[-->`);
    const each_array_5 = ensure_array_like(seasonalTips[selectedSeason].tips);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let tip = each_array_5[$$index_5];
      $$renderer2.push(`<li class="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">`);
      Icon($$renderer2, { icon: "heroicons:check", class: "w-4 h-4 text-green-500" });
      $$renderer2.push(`<!----> <span>${escape_html(tip)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="mt-6"><h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">அழகு ஞானம்</h4> <div class="space-y-4"><!--[-->`);
    const each_array_6 = ensure_array_like(beautyWisdom);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let wisdom = each_array_6[$$index_6];
      $$renderer2.push(`<div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-4"><p class="text-gray-900 dark:text-white italic mb-1">"${escape_html(wisdom.quote)}"</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(wisdom.english)}</p> <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">- ${escape_html(wisdom.author)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>அழகு வழிகாட்டி - Beauty Guide</title>`);
    });
  });
  $$renderer.push(`<div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-rose-900 dark:to-purple-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-4 py-4"><div class="flex items-center space-x-3">`);
  Icon($$renderer, { icon: "heroicons:sparkles", class: "w-8 h-8 text-rose-500" });
  $$renderer.push(`<!----> <div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">அழகு வழிகாட்டி</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Beauty Guide</p></div></div></div></div> <div class="max-w-6xl mx-auto px-4 py-6">`);
  BeautyGuide($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};
