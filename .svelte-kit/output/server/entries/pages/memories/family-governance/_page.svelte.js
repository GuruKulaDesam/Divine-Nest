import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { T as escape_html } from "../../../../chunks/context.js";
function FamilyGovernancePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "constitution";
    const tabs = [
      {
        id: "constitution",
        label: "Family Constitution",
        icon: "heroicons:document-text"
      },
      {
        id: "rules",
        label: "Family Rules",
        icon: "heroicons:clipboard-document-list"
      },
      {
        id: "decisions",
        label: "Decision Making",
        icon: "heroicons:check-circle"
      },
      {
        id: "meetings",
        label: "Family Meetings",
        icon: "heroicons:user-group"
      },
      { id: "values", label: "Core Values", icon: "heroicons:heart" }
    ];
    let familyConstitution = {
      preamble: `We, the members of the Iyer family, in order to form a more harmonious household, establish justice in our daily interactions, ensure domestic tranquility, provide for the common welfare, and secure the blessings of unity for ourselves and our posterity, do establish this Family Constitution.

Based on the principles of:
• सर्वे भवन्तु सुखिनः (May all be happy)
• वसुधैव कुटुम्बकम् (The world is one family)
• अहिंसा परमो धर्मः (Non-violence is the highest virtue)`,
      articles: [
        {
          title: "Article I: Family Membership and Rights",
          content: `All family members, by birth or marriage, are equal in dignity and respect. Each member has the right to:
        • Express opinions and feelings respectfully
        • Receive support during difficulties
        • Pursue personal growth and education
        • Maintain cultural and spiritual practices
        • Privacy and personal space
        • Participate in family decisions affecting them`
        },
        {
          title: "Article II: Responsibilities and Duties",
          content: `Each family member shall:
        • Contribute to household harmony and maintenance
        • Respect elders and guide younger members
        • Share in family traditions and celebrations
        • Support family financial well-being according to capability
        • Maintain family honor and reputation
        • Preserve and pass on cultural heritage`
        },
        {
          title: "Article III: Decision Making Process",
          content: `Family decisions shall be made through:
        • Consensus for major decisions affecting all members
        • Elder guidance for cultural and traditional matters
        • Democratic voting for household management
        • Delegation to appropriate family members for daily operations
        • Emergency protocols for urgent situations`
        },
        {
          title: "Article IV: Conflict Resolution",
          content: `Disputes shall be resolved through:
        • Open family discussion with respectful listening
        • Mediation by neutral family members
        • Elder council guidance when needed
        • External counseling if internal resolution fails
        • Temporary cooling-off periods when emotions are high`
        },
        {
          title: "Article V: Amendments",
          content: `This constitution may be amended with:
        • Agreement of 75% of adult family members
        • Approval from family elders
        • Written documentation of changes
        • Grace period for implementation
        • Regular review every three years`
        }
      ]
    };
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Family Governance</h1> <p class="text-gray-600 dark:text-gray-300">राज्यं धर्मेण धर्यते | A kingdom is sustained by righteousness</p></div></div></div> <div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:scale", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">पारिवारिक शासन | Family Governance</h3> <p class="text-white/90">"A well-governed family is the foundation of a harmonious society. Through clear principles and shared decision-making, we create lasting peace."</p> <p class="text-sm text-white/70 mt-2">Tamil: "நல்ல குடும்ப நிர்வாகம் அமைதியான சமுதாயத்தின் அடித்தளம்"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-blue-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">📜 Family Constitution</h3> <div class="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700"><h4 class="text-lg font-bold text-amber-900 dark:text-amber-100 mb-4">प्रस्तावना | Preamble</h4> <div class="prose dark:prose-invert max-w-none"><p class="text-amber-800 dark:text-amber-200 whitespace-pre-line">${escape_html(familyConstitution.preamble)}</p></div></div> <div class="space-y-6"><!--[-->`);
      const each_array_1 = ensure_array_like(familyConstitution.articles);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let article = each_array_1[$$index_1];
        $$renderer2.push(`<div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700"><h4 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">${escape_html(article.title)}</h4> <div class="prose dark:prose-invert max-w-none"><p class="text-blue-800 dark:text-blue-200 whitespace-pre-line">${escape_html(article.content)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl"><h4 class="font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:scale", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> संविधान का आधार | Constitutional Foundation</h4> <blockquote class="italic text-purple-700 dark:text-purple-300 mb-2">"धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ।<br/> यदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित्॥"</blockquote> <p class="text-sm text-purple-600 dark:text-purple-400">"What is found here regarding dharma, artha, kama, and moksha may be found elsewhere, but what is not found here cannot be found anywhere else."</p> <p class="text-xs text-purple-500 dark:text-purple-500 mt-2">Tamil: "இங்கே காணப்படும் நீதி, செல்வம், காமம், மோக்ஷம் ஆகியவை எங்கும் காணலாம், ஆனால் இங்கே இல்லாதது எங்கும் இல்லை"</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  FamilyGovernancePage($$renderer);
}
export {
  _page as default
};
