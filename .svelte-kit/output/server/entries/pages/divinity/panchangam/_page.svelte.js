import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function TamilPanchangamPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentView = "daily";
    let selectedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    (/* @__PURE__ */ new Date()).getMonth();
    (/* @__PURE__ */ new Date()).getFullYear();
    const views = [
      {
        id: "daily",
        label: "Daily Panchangam",
        icon: "heroicons:sun"
      },
      {
        id: "horoscope",
        label: "Daily Horoscope",
        icon: "heroicons:star"
      },
      {
        id: "monthly",
        label: "Monthly View",
        icon: "heroicons:calendar-days"
      },
      {
        id: "yearly",
        label: "Yearly Almanac",
        icon: "heroicons:calendar"
      },
      {
        id: "muhurtham",
        label: "Muhurtham Finder",
        icon: "heroicons:clock"
      }
    ];
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
      auspiciousActivities: [
        "திருமணம் (Marriage)",
        "கிருஹப்பிரவேசம் (Gruhapravesam)",
        "நாマகரணம் (Naming Ceremony)",
        "கோவில் வழிபாடு (Temple Worship)"
      ],
      inauspiciousActivities: [
        "கிழக்கு திசை பயணம் தவிர்க்க (Avoid travel East)",
        "புதிய வாங்குதல் தவிர்க்க (No new purchases)"
      ],
      festivals: ["விநாயகர் சதுர்த்தி நோன்பு"],
      specialNotes: "இன்று கிருஷ்ண அஷ்டமி. பூஜைக்கு நன்மை தரும்."
    };
    let currentPanchangam = { ...dailyPanchangam };
    function formatTime(time) {
      return time + " IST";
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:sun", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">தமிழ் பஞ்சாங்கம்</h1> <p class="text-gray-600 dark:text-gray-300">Tamil Panchangam - Traditional Calendar &amp; Muhurtham</p></div></div> <div class="flex items-center space-x-2"><input type="date"${attr("value", selectedDate)} class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"/> <button class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:magnifying-glass", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(views);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let view = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentView === view.id ? "bg-orange-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-orange-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20")}`)}>`);
      Icon($$renderer2, { icon: view.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(view.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="text-center mb-6"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(currentPanchangam.tamilDate)}</h2> <p class="text-lg text-gray-600 dark:text-gray-300">${escape_html(currentPanchangam.englishDate)}</p></div> <div class="grid grid-cols-2 gap-4"><div class="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:sun",
        class: "w-8 h-8 text-orange-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-sm text-gray-600 dark:text-gray-400">சூரிய உதயம் / அஸ்தமனம்</p> <p class="font-bold text-gray-900 dark:text-white">${escape_html(formatTime(currentPanchangam.sunrise))} / ${escape_html(formatTime(currentPanchangam.sunset))}</p></div> <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:moon",
        class: "w-8 h-8 text-blue-600 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-sm text-gray-600 dark:text-gray-400">சந்திர உதயம் / அஸ்தமனம்</p> <p class="font-bold text-gray-900 dark:text-white">${escape_html(formatTime(currentPanchangam.moonrise))} / ${escape_html(formatTime(currentPanchangam.moonset))}</p></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">பஞ்சாங்க விவரங்கள்</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-3"><div><p class="text-sm text-gray-600 dark:text-gray-400">திதி (Tithi)</p> <p class="font-medium text-gray-900 dark:text-white">${escape_html(currentPanchangam.tithi)}</p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">நக்ஷத்திரம் (Nakshatra)</p> <p class="font-medium text-gray-900 dark:text-white">${escape_html(currentPanchangam.nakshatra)}</p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">யோகம் (Yoga)</p> <p class="font-medium text-gray-900 dark:text-white">${escape_html(currentPanchangam.yoga)}</p></div></div> <div class="space-y-3"><div><p class="text-sm text-gray-600 dark:text-gray-400">கரணம் (Karana)</p> <p class="font-medium text-gray-900 dark:text-white">${escape_html(currentPanchangam.karana)}</p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">சந்திராஷ்டமம்</p> <p class="font-medium text-gray-900 dark:text-white">${escape_html(currentPanchangam.chandrashtama.join(", "))}</p></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">முக்கிய காலங்கள்</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-3"><div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"><p class="text-sm font-medium text-red-800 dark:text-red-300">ராகு காலம்</p> <p class="text-red-600 dark:text-red-400">${escape_html(currentPanchangam.rahuKalam)}</p></div> <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><p class="text-sm font-medium text-yellow-800 dark:text-yellow-300">யமகண்டம்</p> <p class="text-yellow-600 dark:text-yellow-400">${escape_html(currentPanchangam.yamaKandam)}</p></div> <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><p class="text-sm font-medium text-purple-800 dark:text-purple-300">குளிகை காலம்</p> <p class="text-purple-600 dark:text-purple-400">${escape_html(currentPanchangam.gulikai)}</p></div></div> <div class="space-y-3"><div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><p class="text-sm font-medium text-green-800 dark:text-green-300">அபிஜித் முஹூர்த்தம்</p> <p class="text-green-600 dark:text-green-400">${escape_html(currentPanchangam.abhijitMuhurta)}</p></div> <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><p class="text-sm font-medium text-blue-800 dark:text-blue-300">நல்ல நேரம்</p> <!--[-->`);
      const each_array_1 = ensure_array_like(currentPanchangam.nallaNeram);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let time = each_array_1[$$index_1];
        $$renderer2.push(`<p class="text-blue-600 dark:text-blue-400">${escape_html(time)}</p>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:sparkles",
        class: "w-5 h-5 mr-2 text-orange-600"
      });
      $$renderer2.push(`<!----> இன்றைய நிகழ்வுகள்</h3> `);
      if (dailyPanchangam.festivals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">பண்டிகைகள்</p> <!--[-->`);
        const each_array_2 = ensure_array_like(dailyPanchangam.festivals);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let festival = each_array_2[$$index_2];
          $$renderer2.push(`<span class="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm mr-2 mb-2 dark:bg-orange-900/30 dark:text-orange-400">${escape_html(festival)}</span>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mb-4"><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">நல்ல செயல்கள்</p> <div class="space-y-1"><!--[-->`);
      const each_array_3 = ensure_array_like(dailyPanchangam.auspiciousActivities);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let activity = each_array_3[$$index_3];
        $$renderer2.push(`<div class="flex items-center text-sm text-green-700 dark:text-green-300">`);
        Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> ${escape_html(activity)}</div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">தவிர்க்கவேண்டியவை</p> <div class="space-y-1"><!--[-->`);
      const each_array_4 = ensure_array_like(dailyPanchangam.inauspiciousActivities);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let activity = each_array_4[$$index_4];
        $$renderer2.push(`<div class="flex items-center text-sm text-red-700 dark:text-red-300">`);
        Icon($$renderer2, { icon: "heroicons:x-circle", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> ${escape_html(activity)}</div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:light-bulb",
        class: "w-5 h-5 mr-2 text-orange-600"
      });
      $$renderer2.push(`<!----> சிறப்பு குறிப்பு</h3> <p class="text-gray-700 dark:text-gray-300">${escape_html(dailyPanchangam.specialNotes)}</p></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">வேगமான செயல்கள்</h3> <div class="space-y-2"><button class="w-full bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50">முஹூர்த்தம் தேடு</button> <button class="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">பண்டிகை நாட்காட்டி</button> <button class="w-full bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">SMS அறிவிப்பு</button></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  TamilPanchangamPage($$renderer);
}
export {
  _page as default
};
