import "clsx";
import Dexie from "dexie";
import { b as attr_class, d as attr, a as ensure_array_like, s as stringify } from "../../../chunks/index2.js";
import { T as escape_html } from "../../../chunks/context.js";
const lifeflowDB = new Dexie("LifeFlowDB");
lifeflowDB.version(1).stores({
  // Emotional Health tracking
  emotions: "++id, date, emotion, intensity, context, notes, timestamp",
  emotionalPatterns: "++id, pattern, frequency, triggers, copingStrategies, lastUpdated",
  // Legacy Memory - preserving family stories and wisdom
  familyStories: "++id, title, storyteller, content, category, tags, dateRecorded, importance",
  wisdomLessons: "++id, lesson, source, context, application, dateLearned, category",
  familyValues: "++id, value, description, examples, importance, lastReviewed",
  // Life Transitions - major life events and changes
  lifeEvents: "++id, eventType, person, date, description, impact, lessons, status",
  transitions: "++id, transitionType, stage, challenges, supportNeeded, progress, completionDate",
  // Family Governance - decision making and family rules
  familyDecisions: "++id, decision, proposer, dateProposed, status, outcome, impact",
  familyRules: "++id, rule, category, importance, enforcement, lastReviewed, exceptions",
  governanceMeetings: "++id, date, agenda, attendees, decisions, actionItems, nextMeeting"
});
const {
  emotions,
  emotionalPatterns,
  familyStories,
  wisdomLessons,
  familyValues,
  lifeEvents,
  transitions,
  familyDecisions,
  familyRules,
  governanceMeetings
} = lifeflowDB;
function LifeFlowDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let newEmotion = { emotion: "", intensity: 5, context: "", notes: "" };
    let emotions2 = [];
    function getEmotionColor(intensity) {
      if (intensity >= 8) return "text-green-400";
      if (intensity >= 6) return "text-yellow-400";
      if (intensity >= 4) return "text-orange-400";
      return "text-red-400";
    }
    getThemeAwareTextColor("primary");
    getThemeAwareTextColor("secondary");
    getThemeAwareTextColor("muted");
    getThemeAwareBgColor("card");
    getThemeAwareBgColor("overlay");
    getThemeCardClasses();
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-wrap gap-2 mb-6"><button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify(
      "bg-primary text-primary-content shadow-lg"
    )}`)}>💭 Emotional Health</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>📖 Legacy Memory</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>🌱 Life Transitions</button> <button${attr_class(`px-4 py-2 rounded-lg transition-all duration-300 ${stringify("bg-base-200 text-base-content hover:bg-base-300")}`)}>⚖️ Family Governance</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg"><h3 class="text-xl font-semibold text-base-content mb-4">Track Your Emotions</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><input${attr("value", newEmotion.emotion)} placeholder="Emotion (e.g., Joy, Gratitude, Anxiety)" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <div class="flex items-center space-x-2"><label class="text-base-content/80">Intensity:</label> <input type="range" min="1" max="10"${attr("value", newEmotion.intensity)} class="range range-primary flex-1"/> <span class="text-base-content w-8">${escape_html(newEmotion.intensity)}</span></div> <input${attr("value", newEmotion.context)} placeholder="Context (e.g., Family gathering, Work stress)" class="input input-bordered w-full text-base-content placeholder-base-content/50"/> <textarea placeholder="Additional notes..." rows="2" class="textarea textarea-bordered w-full text-base-content placeholder-base-content/50">`);
      const $$body = escape_html(newEmotion.notes);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <button class="btn btn-primary mt-4">Add Emotion</button></div> <div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(emotions2);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let emotion = each_array[$$index];
        $$renderer2.push(`<div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"><div class="flex justify-between items-start"><div><h4 class="text-lg font-semibold text-white">${escape_html(emotion.emotion)}</h4> <p class="text-white/70">${escape_html(emotion.context)}</p> `);
        if (emotion.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-white/60 text-sm mt-2">${escape_html(emotion.notes)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="text-right"><div${attr_class(`text-2xl ${stringify(getEmotionColor(emotion.intensity))}`)}>${escape_html(emotion.intensity)}/10</div> <div class="text-white/50 text-sm">${escape_html(new Date(emotion.date).toLocaleDateString())}</div></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200"><div class="container mx-auto px-4 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-base-content mb-2">🌊 Life Flow</h1> <p class="text-base-content/70">Emotional Intelligence &amp; Family Governance</p></div> `);
    LifeFlowDashboard($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
