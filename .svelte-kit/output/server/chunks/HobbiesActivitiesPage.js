import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function HobbiesActivitiesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredHobbies, filteredSessions, totalHobbies, activeToday, avgProgress, totalSessions;
    let currentView = "dashboard";
    let selectedMember = "all";
    const views = [
      { id: "dashboard", label: "Dashboard", icon: "heroicons:home" },
      {
        id: "hobbies",
        label: "Hobbies & Interests",
        icon: "heroicons:puzzle-piece"
      },
      {
        id: "activities",
        label: "Family Activities",
        icon: "heroicons:user-group"
      },
      {
        id: "sessions",
        label: "Activity Sessions",
        icon: "heroicons:clock"
      },
      {
        id: "achievements",
        label: "Achievements",
        icon: "heroicons:trophy"
      }
    ];
    const familyMembers = [
      { id: "all", name: "All Family", tamil: "முழு குடும்பம்" },
      { id: "father", name: "அப்பா (Father)", age: 45, avatar: "👨" },
      { id: "mother", name: "அம்மா (Mother)", age: 40, avatar: "👩" },
      {
        id: "grandfather",
        name: "தாத்தா (Grandfather)",
        age: 70,
        avatar: "👴"
      },
      {
        id: "grandmother",
        name: "பாட்டி (Grandmother)",
        age: 65,
        avatar: "👵"
      },
      { id: "son", name: "மகன் (Son)", age: 16, avatar: "👦" },
      {
        id: "daughter",
        name: "மகள் (Daughter)",
        age: 12,
        avatar: "👧"
      }
    ];
    const hobbyCategories = [
      {
        id: "creative",
        name: "Creative Arts",
        tamil: "கலை ஆக்கம்",
        icon: "heroicons:paint-brush",
        color: "bg-purple-500"
      },
      {
        id: "music",
        name: "Music & Dance",
        tamil: "இசை மற்றும் நடனம்",
        icon: "heroicons:musical-note",
        color: "bg-pink-500"
      },
      {
        id: "sports",
        name: "Sports & Fitness",
        tamil: "விளையாட்டு",
        icon: "heroicons:trophy",
        color: "bg-green-500"
      },
      {
        id: "learning",
        name: "Learning & Skills",
        tamil: "கற்றல்",
        icon: "heroicons:academic-cap",
        color: "bg-blue-500"
      },
      {
        id: "crafts",
        name: "Crafts & DIY",
        tamil: "கைவினை",
        icon: "heroicons:wrench-screwdriver",
        color: "bg-orange-500"
      },
      {
        id: "spiritual",
        name: "Spiritual & Wellness",
        tamil: "ஆன்மீகம்",
        icon: "heroicons:sparkles",
        color: "bg-indigo-500"
      },
      {
        id: "outdoor",
        name: "Outdoor Activities",
        tamil: "வெளியிட நிகழ்வுகள்",
        icon: "heroicons:sun",
        color: "bg-yellow-500"
      },
      {
        id: "games",
        name: "Games & Puzzles",
        tamil: "விளையாட்டுகள்",
        icon: "heroicons:puzzle-piece",
        color: "bg-red-500"
      }
    ];
    const individualHobbies = [
      {
        id: 1,
        name: "Painting",
        tamil: "ஓவியம்",
        category: "creative",
        members: ["mother", "daughter"],
        skill: "intermediate",
        frequency: "weekly",
        materials: ["Canvas", "Brushes", "Colors"],
        progress: 65
      },
      {
        id: 2,
        name: "Photography",
        tamil: "புகைப்படம்",
        category: "creative",
        members: ["father", "son"],
        skill: "advanced",
        frequency: "daily",
        materials: ["Camera", "Tripod"],
        progress: 80
      },
      {
        id: 3,
        name: "Sketching",
        tamil: "ஓவிய வரைதல்",
        category: "creative",
        members: ["daughter", "grandmother"],
        skill: "beginner",
        frequency: "weekly",
        materials: ["Pencils", "Paper"],
        progress: 45
      },
      {
        id: 4,
        name: "Carnatic Music",
        tamil: "கர்நாடக இசை",
        category: "music",
        members: ["mother", "daughter"],
        skill: "intermediate",
        frequency: "daily",
        materials: ["Harmonium", "Tanpura"],
        progress: 70
      },
      {
        id: 5,
        name: "Bharatanatyam",
        tamil: "பரதநாட்டியம்",
        category: "music",
        members: ["daughter"],
        skill: "intermediate",
        frequency: "3x week",
        materials: ["Costume", "Ghungroo"],
        progress: 60
      },
      {
        id: 6,
        name: "Guitar Playing",
        tamil: "கிட்டார்",
        category: "music",
        members: ["son", "father"],
        skill: "beginner",
        frequency: "weekly",
        materials: ["Guitar", "Pick"],
        progress: 35
      },
      {
        id: 7,
        name: "Morning Walk",
        tamil: "காலை நடைப்பயிற்சி",
        category: "sports",
        members: ["grandfather", "grandmother"],
        skill: "beginner",
        frequency: "daily",
        materials: ["Walking Shoes"],
        progress: 90
      },
      {
        id: 8,
        name: "Yoga",
        tamil: "யோகா",
        category: "sports",
        members: ["mother", "grandmother"],
        skill: "intermediate",
        frequency: "daily",
        materials: ["Yoga Mat"],
        progress: 75
      },
      {
        id: 9,
        name: "Cricket",
        tamil: "கிரிக்கெட்",
        category: "sports",
        members: ["father", "son"],
        skill: "intermediate",
        frequency: "weekend",
        materials: ["Bat", "Ball"],
        progress: 70
      },
      {
        id: 10,
        name: "Tamil Literature",
        tamil: "தமிழ் இலக்கியம்",
        category: "learning",
        members: ["grandfather", "mother"],
        skill: "advanced",
        frequency: "daily",
        materials: ["Books"],
        progress: 85
      },
      {
        id: 11,
        name: "Cooking",
        tamil: "சமையல்",
        category: "learning",
        members: ["mother", "daughter"],
        skill: "advanced",
        frequency: "daily",
        materials: ["Recipe Books"],
        progress: 90
      },
      {
        id: 12,
        name: "Computer Programming",
        tamil: "கணினி நிரலாக்கம்",
        category: "learning",
        members: ["son"],
        skill: "intermediate",
        frequency: "daily",
        materials: ["Laptop"],
        progress: 60
      },
      {
        id: 13,
        name: "Knitting",
        tamil: "பின்னல்",
        category: "crafts",
        members: ["grandmother", "mother"],
        skill: "advanced",
        frequency: "evening",
        materials: ["Yarn", "Needles"],
        progress: 95
      },
      {
        id: 14,
        name: "Woodworking",
        tamil: "மரவேலை",
        category: "crafts",
        members: ["grandfather", "father"],
        skill: "intermediate",
        frequency: "weekend",
        materials: ["Tools", "Wood"],
        progress: 55
      },
      {
        id: 15,
        name: "Meditation",
        tamil: "தியானம்",
        category: "spiritual",
        members: ["grandfather", "mother"],
        skill: "intermediate",
        frequency: "daily",
        materials: ["Meditation Mat"],
        progress: 70
      },
      {
        id: 16,
        name: "Devotional Reading",
        tamil: "பக்தி நூல் வாசிப்பு",
        category: "spiritual",
        members: ["grandmother", "grandfather"],
        skill: "advanced",
        frequency: "daily",
        materials: ["Religious Books"],
        progress: 85
      },
      {
        id: 17,
        name: "Chess",
        tamil: "சதுரங்கம்",
        category: "games",
        members: ["father", "son", "grandfather"],
        skill: "intermediate",
        frequency: "evening",
        materials: ["Chess Board"],
        progress: 65
      },
      {
        id: 18,
        name: "Crossword Puzzles",
        tamil: "வார்த்தை புதிர்",
        category: "games",
        members: ["grandmother", "mother"],
        skill: "advanced",
        frequency: "daily",
        materials: ["Puzzle Books"],
        progress: 80
      }
    ];
    const activitySessions = [
      {
        id: 1,
        activity: "Morning Walk",
        member: "grandfather",
        date: "2025-10-06",
        duration: "45 mins",
        enjoyment: 9,
        notes: "சூரிய உதயத்தைப் பார்த்தேன். மிகவும் அழகாக இருந்தது."
      },
      {
        id: 2,
        activity: "Bharatanatyam",
        member: "daughter",
        date: "2025-10-06",
        duration: "1 hour",
        enjoyment: 8,
        notes: "புதிய அடவுகளைக் கற்றுக் கொண்டேன்."
      },
      {
        id: 3,
        activity: "Tamil Literature",
        member: "grandfather",
        date: "2025-10-06",
        duration: "2 hours",
        enjoyment: 10,
        notes: "திருக்குறள் பதிப்பைப் படித்தேன். மிகவும் ஆழமான கருத்துகள்."
      },
      {
        id: 4,
        activity: "Cooking",
        member: "mother",
        date: "2025-10-06",
        duration: "1.5 hours",
        enjoyment: 9,
        notes: "மகளுக்கு சாம்பார் செய்யக் கற்றுக் கொடுத்தேன்."
      },
      {
        id: 5,
        activity: "Chess",
        member: "son",
        date: "2025-10-05",
        duration: "45 mins",
        enjoyment: 8,
        notes: "அப்பாவுடன் விளையாடி வென்றேன்!"
      }
    ];
    function getMemberName(memberId) {
      const member = familyMembers.find((m) => m.id === memberId);
      return member ? member.name : memberId;
    }
    filteredHobbies = individualHobbies;
    filteredSessions = activitySessions;
    totalHobbies = filteredHobbies.length;
    activeToday = filteredHobbies.filter((h) => h.frequency === "daily").length;
    avgProgress = filteredHobbies.reduce((acc, h) => acc + h.progress, 0) / filteredHobbies.length || 0;
    totalSessions = filteredSessions.length;
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:puzzle-piece", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">பொழுதுபோக்கு மற்றும் செயல்பாடுகள்</h1> <p class="text-gray-600 dark:text-gray-300">Hobbies, Interests &amp; Family Activities Tracker</p></div></div> <div class="flex items-center space-x-3">`);
    $$renderer2.select(
      {
        value: selectedMember,
        class: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(familyMembers);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let member = each_array[$$index];
          $$renderer3.option({ value: member.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(member.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array_1 = ensure_array_like(views);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let view = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentView === view.id ? "bg-purple-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20")}`)}>`);
      Icon($$renderer2, { icon: view.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(view.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Total Hobbies</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(totalHobbies)}</p></div> <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:puzzle-piece",
        class: "w-6 h-6 text-purple-600"
      });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Active Today</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(activeToday)}</p></div> <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "w-6 h-6 text-green-600" });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(Math.round(avgProgress))}%</p></div> <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-6 h-6 text-blue-600" });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Recent Sessions</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(totalSessions)}</p></div> <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:calendar-days",
        class: "w-6 h-6 text-orange-600"
      });
      $$renderer2.push(`<!----></div></div></div></div> <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">இன்றைய செயல்பாடுகள்</h3> <div class="space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(filteredSessions.slice(0, 5));
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let session = each_array_2[$$index_3];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex items-center space-x-3"><div class="w-2 h-2 bg-green-500 rounded-full"></div> <div><p class="font-medium text-gray-900 dark:text-white">${escape_html(session.activity)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(getMemberName(session.member))} • ${escape_html(session.duration)}</p></div></div> <div class="flex items-center space-x-1"><!--[-->`);
        const each_array_3 = ensure_array_like(Array(session.enjoyment));
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          each_array_3[$$index_2];
          Icon($$renderer2, { icon: "heroicons:star", class: "w-4 h-4 text-yellow-400" });
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">பொழுதுபோக்கு வகைகள்</h3> <div class="grid grid-cols-2 gap-3"><!--[-->`);
      const each_array_4 = ensure_array_like(hobbyCategories);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let category = each_array_4[$$index_4];
        const count = filteredHobbies.filter((h) => h.category === category.id).length;
        $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><div${attr_class(`p-2 ${stringify(category.color)} rounded-lg`)}>`);
        Icon($$renderer2, { icon: category.icon, class: "w-5 h-5 text-white" });
        $$renderer2.push(`<!----></div> <div><p class="font-medium text-gray-900 dark:text-white">${escape_html(category.tamil)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(count)} hobbies</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4"><button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-8 h-8 mx-auto mb-2" });
      $$renderer2.push(`<!----> <p class="font-semibold">Add New Hobby</p> <p class="text-sm opacity-90">புதிய பொழுதுபோக்கு</p></button> <button class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">`);
      Icon($$renderer2, { icon: "heroicons:user-group", class: "w-8 h-8 mx-auto mb-2" });
      $$renderer2.push(`<!----> <p class="font-semibold">Plan Family Activity</p> <p class="text-sm opacity-90">குடும்ப செயல்பாடு</p></button> <button class="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 mx-auto mb-2" });
      $$renderer2.push(`<!----> <p class="font-semibold">Log Session</p> <p class="text-sm opacity-90">அமர்வு பதிவு</p></button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  HobbiesActivitiesPage as default
};
