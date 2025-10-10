import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { T as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "profiles";
    let selectedMember = "appa";
    const tabs = [
      {
        id: "profiles",
        label: "Family Profiles",
        icon: "heroicons:users"
      },
      {
        id: "health",
        label: "Health & Wellness",
        icon: "heroicons:heart"
      },
      {
        id: "reminders",
        label: "Personal Reminders",
        icon: "heroicons:bell"
      },
      {
        id: "memories",
        label: "Voice Notes & Journals",
        icon: "heroicons:microphone"
      },
      {
        id: "mood",
        label: "Daily Mood Check-ins",
        icon: "heroicons:face-smile"
      }
    ];
    const familyMemberData = {
      appa: {
        name: "Ravi Krishna",
        role: "appa",
        age: 45,
        relationship: "Father",
        tamilTitle: "அப்பா",
        sanskritTitle: "पिता",
        birthday: "1979-08-15",
        anniversary: "2005-05-20",
        profession: "Software Engineer",
        preferences: {
          food: [
            "Sambar Rice",
            "Rasam",
            "Curd Rice",
            "Vathal Curry",
            "Coffee"
          ],
          health: ["Morning walk", "Yoga", "Diabetic diet awareness"],
          rituals: ["Sandhyavandanam", "Vishnu Sahasranamam", "Temple visits"],
          hobbies: ["Classical music", "Chess", "Gardening"]
        },
        healthNotes: "Diabetic - avoid sugar, regular BP checkups",
        currentMedications: ["Metformin 500mg - Twice daily", "BP tablet - Morning"],
        spiritualRoutines: ["5:30 AM - Sandhyavandanam", "6:30 PM - Evening prayers"],
        personalityTraits: [
          "Responsible",
          "Traditional",
          "Tech-savvy",
          "Family-oriented"
        ],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Content",
            note: "Good day at work, evening temple visit"
          },
          {
            date: "2024-01-14",
            mood: "Stressed",
            note: "Project deadline pressure"
          },
          {
            date: "2024-01-13",
            mood: "Happy",
            note: "Family dinner together, Akka's good results"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-12",
            title: "Work-Life Balance Thoughts",
            duration: "3:45"
          },
          {
            date: "2024-01-10",
            title: "Teaching Thambi Chess",
            duration: "2:20"
          }
        ]
      },
      amma: {
        name: "Lakshmi Ravi",
        role: "amma",
        age: 42,
        relationship: "Mother",
        tamilTitle: "அம்மா",
        sanskritTitle: "माता",
        birthday: "1982-03-25",
        anniversary: "2005-05-20",
        profession: "Homemaker & Part-time Tutor",
        preferences: {
          food: [
            "Variety rice",
            "Traditional sweets",
            "Filter coffee",
            "Coconut-based dishes"
          ],
          health: ["Yoga", "Pranayama", "Ayurvedic medicines", "Oil massage"],
          rituals: [
            "Lakshmi Stotram",
            "Lalitha Sahasranamam",
            "Friday Varalakshmi worship"
          ],
          hobbies: [
            "Carnatic music",
            "Kolam",
            "Cooking",
            "Reading Tamil literature"
          ]
        },
        healthNotes: "Thyroid condition - regular medication, calcium supplements",
        currentMedications: ["Thyroxine 75mcg - Morning empty stomach", "Calcium tablets"],
        spiritualRoutines: [
          "Morning - Lakshmi prayers",
          "Evening - Lalitha Sahasranamam"
        ],
        personalityTraits: ["Nurturing", "Organized", "Artistic", "Spiritual"],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Peaceful",
            note: "Successful kolam competition at temple"
          },
          {
            date: "2024-01-14",
            mood: "Busy",
            note: "Preparation for Thambi's school function"
          },
          {
            date: "2024-01-13",
            mood: "Happy",
            note: "Akka helped with dinner preparation"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-11",
            title: "Paati's Recipe Stories",
            duration: "8:15"
          },
          {
            date: "2024-01-09",
            title: "Children's Progress Reflection",
            duration: "5:30"
          }
        ]
      },
      paati: {
        name: "Kamala Sundaram",
        role: "paati",
        age: 72,
        relationship: "Grandmother (Appa's Mother)",
        tamilTitle: "பாட்டி",
        sanskritTitle: "पितामही",
        birthday: "1952-12-08",
        anniversary: "1970-11-15",
        profession: "Retired Teacher",
        preferences: {
          food: [
            "Simple dal rice",
            "Buttermilk",
            "Steamed idli",
            "Warm milk",
            "Traditional medicines"
          ],
          health: [
            "Gentle yoga",
            "Temple walks",
            "Ayurvedic treatments",
            "Oil baths"
          ],
          rituals: [
            "All major slokas",
            "Daily Vishnu worship",
            "Full moon fasting"
          ],
          hobbies: [
            "Story-telling",
            "Teaching Sanskrit",
            "Knitting",
            "Temple service"
          ]
        },
        healthNotes: "Arthritis, mild diabetes, regular eye checkups needed",
        currentMedications: ["Joint pain tablets", "Diabetic medicine", "Eye drops"],
        spiritualRoutines: ["4:30 AM - Suprabhatam", "Full Vishnu Sahasranamam daily"],
        personalityTraits: ["Wise", "Patient", "Traditional", "Story-teller"],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Blessed",
            note: "Grandchildren spent time learning slokas"
          },
          {
            date: "2024-01-14",
            mood: "Tired",
            note: "Joint pain due to weather change"
          },
          {
            date: "2024-01-13",
            mood: "Content",
            note: "Temple ladies group meeting was enjoyable"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-10",
            title: "Memories of Old Coimbatore",
            duration: "12:30"
          },
          {
            date: "2024-01-08",
            title: "Teaching Akka Bharatanatyam Stories",
            duration: "7:45"
          }
        ]
      },
      thatha: {
        name: "Sundaram Krishnan",
        role: "thatha",
        age: 75,
        relationship: "Grandfather (Appa's Father)",
        tamilTitle: "தாத்தா",
        sanskritTitle: "पितामह",
        birthday: "1949-06-12",
        anniversary: "1970-11-15",
        profession: "Retired Bank Manager",
        preferences: {
          food: [
            "Light breakfast",
            "Sambar rice",
            "Buttermilk",
            "Evening coffee"
          ],
          health: [
            "Morning walks",
            "Pranayama",
            "Regular medicine",
            "Afternoon rest"
          ],
          rituals: ["Gayatri Mantra", "Rudram", "Monthly Ekadashi fasting"],
          hobbies: [
            "Reading newspapers",
            "Teaching children math",
            "Playing cards",
            "Garden care"
          ]
        },
        healthNotes: "Heart condition, BP monitoring, regular cardiologist visits",
        currentMedications: [
          "Heart tablets - Morning & evening",
          "BP medicine",
          "Blood thinner"
        ],
        spiritualRoutines: ["5:00 AM - Sandhyavandanam", "Evening - Rudram chanting"],
        personalityTraits: [
          "Disciplined",
          "Knowledgeable",
          "Gentle",
          "Mathematical mind"
        ],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Proud",
            note: "Thambi solved difficult math problem"
          },
          {
            date: "2024-01-14",
            mood: "Peaceful",
            note: "Good consultation with cardiologist"
          },
          {
            date: "2024-01-13",
            mood: "Engaged",
            note: "Enjoyed discussion about current affairs"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-09",
            title: "Banking Days Stories",
            duration: "9:20"
          },
          {
            date: "2024-01-07",
            title: "Math Tips for Grandchildren",
            duration: "4:15"
          }
        ]
      },
      akka: {
        name: "Priya Ravi",
        role: "akka",
        age: 16,
        relationship: "Elder Daughter",
        tamilTitle: "அக்காள்",
        sanskritTitle: "बड़ी बहन",
        birthday: "2008-09-10",
        anniversary: null,
        profession: "11th Grade Student - JEE Aspirant",
        preferences: {
          food: [
            "South Indian breakfast",
            "Fruits",
            "Milkshakes",
            "Healthy snacks"
          ],
          health: [
            "Badminton",
            "Yoga",
            "Dance practice",
            "Eye care from studying"
          ],
          rituals: [
            "Morning prayers",
            "Friday Lakshmi worship",
            "Festival participation"
          ],
          hobbies: ["Classical dance", "Drawing", "Music", "Reading novels"]
        },
        healthNotes: "Growing teenager - good nutrition needed, eye strain from studies",
        currentMedications: ["Vitamin D supplements", "Iron tablets if needed"],
        spiritualRoutines: ["Morning prayers before studies", "Weekend temple visits"],
        personalityTraits: ["Studious", "Artistic", "Responsible", "Ambitious"],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Confident",
            note: "Physics mock test went well"
          },
          {
            date: "2024-01-14",
            mood: "Stressed",
            note: "Chemistry syllabus feeling overwhelming"
          },
          {
            date: "2024-01-13",
            mood: "Happy",
            note: "Dance performance appreciated by family"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-12",
            title: "JEE Preparation Thoughts",
            duration: "6:30"
          },
          {
            date: "2024-01-11",
            title: "Dance Competition Experience",
            duration: "4:50"
          }
        ]
      },
      thambi: {
        name: "Arjun Ravi",
        role: "thambi",
        age: 11,
        relationship: "Younger Son",
        tamilTitle: "தம்பி",
        sanskritTitle: "छोटा भाई",
        birthday: "2013-04-22",
        anniversary: null,
        profession: "6th Grade Student",
        preferences: {
          food: ["Curd rice", "Dosa", "Sweets", "Fruits", "Chocolate milk"],
          health: ["Cricket", "Cycling", "Swimming", "Running"],
          rituals: ["Simple slokas", "Ganesha prayers", "Festival celebrations"],
          hobbies: ["Cricket", "Video games", "Drawing", "Building blocks"]
        },
        healthNotes: "Active child - ensure proper nutrition and rest, monitor screen time",
        currentMedications: ["Multivitamin syrup", "As needed for minor illnesses"],
        spiritualRoutines: ["Evening prayers with family", "Simple Sanskrit slokas"],
        personalityTraits: ["Energetic", "Curious", "Playful", "Quick learner"],
        recentMoods: [
          {
            date: "2024-01-15",
            mood: "Excited",
            note: "Won cricket match at school"
          },
          {
            date: "2024-01-14",
            mood: "Tired",
            note: "Late night due to homework"
          },
          {
            date: "2024-01-13",
            mood: "Happy",
            note: "Learned new chess moves from Thatha"
          }
        ],
        voiceNotes: [
          {
            date: "2024-01-10",
            title: "Cricket Match Story",
            duration: "2:45"
          },
          {
            date: "2024-01-08",
            title: "School Science Project Ideas",
            duration: "3:20"
          }
        ]
      }
    };
    function getCurrentMember() {
      return familyMemberData[selectedMember];
    }
    function getRoleColor(role) {
      const colors = {
        appa: "from-blue-500 to-indigo-500",
        amma: "from-pink-500 to-rose-500",
        paati: "from-purple-500 to-violet-500",
        thatha: "from-green-500 to-emerald-500",
        akka: "from-orange-500 to-amber-500",
        thambi: "from-cyan-500 to-blue-500"
      };
      return colors[role] || "from-gray-500 to-gray-600";
    }
    function getAgeGroup(age) {
      return "adult";
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Family Member Profiles</h1> <p class="text-gray-600 dark:text-gray-300">कुटुम्बम् | Our beloved family circle with love, care, and memories</p></div></div></div> <div class="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">पारिवारिक संस्कार | Family Values</h3> <p class="text-white/90">"वसुधैव कुटुम्बकम् | The world is one family. In our home, every member is cherished, their needs understood, their dreams supported, and their well-being prioritized with love and devotion."</p> <p class="text-sm text-white/70 mt-2">Tamil: "குடும்பம் என்பது அன்பின் கூட்டம் - ஒவ்வொருவரின் நலமும் நம் கடமை"</p></div></div></div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(familyMemberData));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [memberId, member] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`relative p-4 rounded-xl transition-all duration-200 border-2 ${stringify(selectedMember === memberId ? "border-purple-500 shadow-lg transform scale-105" : "border-gray-200 dark:border-gray-700 hover:border-purple-300")}`)} style="background: linear-gradient(135deg, var(--tw-gradient-stops)); --tw-gradient-from: rgb(249 250 251); --tw-gradient-to: rgb(243 244 246);"><div class="text-center"><div${attr_class(`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${stringify(getRoleColor(member.role))} flex items-center justify-center text-white font-bold text-lg`)}>${escape_html(member.name[0])}</div> <h3 class="font-bold text-gray-900 dark:text-white text-sm">${escape_html(member.name)}</h3> <p class="text-xs text-gray-600 dark:text-gray-400">${escape_html(member.tamilTitle)}</p> <p class="text-xs text-purple-600">${escape_html(member.role.charAt(0).toUpperCase() + member.role.slice(1))}</p></div> `);
      if (selectedMember === memberId) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute inset-0 rounded-xl bg-purple-500/10 pointer-events-none"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array_1 = ensure_array_like(tabs);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tab = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-purple-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      const member = getCurrentMember();
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><div class="flex items-center space-x-4 mb-6"><div${attr_class(`w-16 h-16 rounded-full bg-gradient-to-br ${stringify(getRoleColor(member.role))} flex items-center justify-center text-white font-bold text-2xl`)}>${escape_html(member.name[0])}</div> <div><h2 class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(member.name)}</h2> <p class="text-lg text-gray-600 dark:text-gray-400">${escape_html(member.tamilTitle)} • ${escape_html(member.sanskritTitle)}</p> <p class="text-sm text-purple-600">${escape_html(member.relationship)} • ${escape_html(member.profession)}</p></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div><h4 class="font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Age:</span> <span class="font-medium">${escape_html(member.age)} years</span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Birthday:</span> <span class="font-medium">${escape_html(new Date(member.birthday).toLocaleDateString())}</span></div> `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Anniversary:</span> <span class="font-medium">${escape_html(new Date(member.anniversary).toLocaleDateString())}</span></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Age Group:</span> <span class="font-medium capitalize">${escape_html(getAgeGroup())}</span></div></div></div> <div><h4 class="font-semibold text-gray-900 dark:text-white mb-3">Personality Traits</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_2 = ensure_array_like(member.personalityTraits);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let trait = each_array_2[$$index_2];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full">${escape_html(trait)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="space-y-4"><div><h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:heart", class: "w-4 h-4 mr-2 text-red-500" });
      $$renderer2.push(`<!----> Food Preferences</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_3 = ensure_array_like(member.preferences.food);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let food = each_array_3[$$index_3];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded">${escape_html(food)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:star",
        class: "w-4 h-4 mr-2 text-orange-500"
      });
      $$renderer2.push(`<!----> Spiritual Practices</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_4 = ensure_array_like(member.preferences.rituals);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let ritual = each_array_4[$$index_4];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded">${escape_html(ritual)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:puzzle-piece",
        class: "w-4 h-4 mr-2 text-blue-500"
      });
      $$renderer2.push(`<!----> Hobbies &amp; Interests</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_5 = ensure_array_like(member.preferences.hobbies);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let hobby = each_array_5[$$index_5];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded">${escape_html(hobby)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:star",
        class: "w-5 h-5 mr-2 text-orange-500"
      });
      $$renderer2.push(`<!----> Daily Spiritual Routine</h3> <div class="space-y-3"><!--[-->`);
      const each_array_6 = ensure_array_like(member.spiritualRoutines);
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let routine = each_array_6[$$index_6];
        $$renderer2.push(`<div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><p class="text-sm text-orange-800 dark:text-orange-200">${escape_html(routine)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:heart",
        class: "w-5 h-5 mr-2 text-green-500"
      });
      $$renderer2.push(`<!----> Health &amp; Wellness</h3> <div class="space-y-3"><div><h4 class="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">Health Notes:</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(member.healthNotes)}</p></div> <div><h4 class="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">Wellness Activities:</h4> <div class="flex flex-wrap gap-1"><!--[-->`);
      const each_array_7 = ensure_array_like(member.preferences.health);
      for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
        let activity = each_array_7[$$index_7];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded">${escape_html(activity)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-12 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl"><h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> पारिवारिक ज्ञान | Family Wisdom</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h5 class="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Care &amp; Understanding:</h5> <ul class="text-sm text-indigo-700 dark:text-indigo-300 space-y-1"><li>• Each family member has unique needs and preferences</li> <li>• Health and spiritual well-being go hand in hand</li> <li>• Regular check-ins strengthen family bonds</li> <li>• Mood tracking helps understand emotional patterns</li></ul></div> <div><h5 class="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Daily Practices:</h5> <ul class="text-sm text-indigo-700 dark:text-indigo-300 space-y-1"><li>• Personalized reminders for health and rituals</li> <li>• Voice notes preserve precious family memories</li> <li>• Spiritual routines bring peace and structure</li> <li>• Understanding preferences improves family harmony</li></ul></div></div> <blockquote class="mt-4 p-3 bg-indigo-200 dark:bg-indigo-800 rounded-lg italic text-indigo-800 dark:text-indigo-200">"मातृदेवो भव पितृदेवो भव | Mother and father are like God. Every family member is a divine blessing, deserving of love, understanding, and personalized care."</blockquote></div></div></div>`);
  });
}
export {
  _page as default
};
