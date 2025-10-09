import "clsx";
import { a as ensure_array_like, b as attr_class, d as attr, j as attr_style, s as stringify } from "./index2.js";
import "./dexie-db.js";
import { e as escape_html } from "./context.js";
function NotesModern($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let notes = [];
    let todoLists = [];
    let newNote = "";
    let noteColor = "#6366f1";
    let attachments = [];
    let search = "";
    let notifications = [];
    function groupedTodos() {
      const map = /* @__PURE__ */ new Map();
      todoLists.forEach((item) => {
        if (item.isGroup) map.set(item.id, { group: item, items: [] });
      });
      todoLists.forEach((item) => {
        if (item.groupId && map.has(item.groupId)) map.get(item.groupId).items.push(item);
      });
      return Array.from(map.values());
    }
    function filteredNotes() {
      return notes.filter((n) => {
        const matchesSearch = !search;
        return matchesSearch;
      }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    }
    $$renderer2.push(`<div class="notes-app min-h-screen p-6 svelte-1l5usla"><div class="fixed bottom-4 right-4 z-50 space-y-2 svelte-1l5usla"><!--[-->`);
    const each_array = ensure_array_like(notifications);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let notification = each_array[$$index];
      $$renderer2.push(`<div${attr_class("notification-card bg-white/90 backdrop-blur-lg border border-white/20 rounded-lg p-4 shadow-lg animate-slide-in-right max-w-sm svelte-1l5usla", void 0, {
        "bg-green-50": notification.type === "success",
        "bg-red-50": notification.type === "error",
        "bg-blue-50": notification.type === "info"
      })}><div class="flex items-center gap-3 svelte-1l5usla">`);
      if (notification.type === "success") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center svelte-1l5usla"><svg class="w-4 h-4 text-white svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" class="svelte-1l5usla"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (notification.type === "error") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center svelte-1l5usla"><svg class="w-4 h-4 text-white svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-1l5usla"></path></svg></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center svelte-1l5usla"><svg class="w-4 h-4 text-white svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" class="svelte-1l5usla"></path></svg></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <p class="text-sm font-medium text-gray-800 svelte-1l5usla">${escape_html(notification.message)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="max-w-7xl mx-auto svelte-1l5usla"><div class="text-center mb-8 svelte-1l5usla"><h1 class="text-5xl font-bold text-theme mb-2 drop-shadow-lg svelte-1l5usla">📝 My Notes</h1> <p class="text-theme/80 text-lg svelte-1l5usla">Create, organize, and remember everything important</p></div> <div class="flex justify-center mb-8 svelte-1l5usla"><div class="bg-white/20 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/30 svelte-1l5usla"><div class="flex space-x-2 svelte-1l5usla"><button${attr_class(
      `px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${stringify(
        "bg-white text-purple-600 shadow-lg"
      )}`,
      "svelte-1l5usla"
    )}>📚 My Notes (${escape_html(notes.length)})</button> <button${attr_class(
      `px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${stringify("text-theme hover:bg-white/20")}`,
      "svelte-1l5usla"
    )}>✅ Checklists (${escape_html(groupedTodos().length)})</button></div></div></div> <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 svelte-1l5usla"><div class="text-center mb-6 svelte-1l5usla"><div class="text-6xl mb-4 text-blue-400 animate-pulse svelte-1l5usla">🎤</div> <h2 class="text-2xl font-bold text-theme mb-2 svelte-1l5usla">Voice Input</h2> <p class="text-theme/80 svelte-1l5usla">Speak to create notes or checklists automatically</p></div> <div class="space-y-4 svelte-1l5usla"><div class="flex justify-center gap-4 mb-4 svelte-1l5usla"><button${attr_class(`btn btn-sm ${stringify("btn-primary")}`, "svelte-1l5usla")}>📝 Notes</button> <button${attr_class(`btn btn-sm ${stringify("btn-outline")}`, "svelte-1l5usla")}>✅ Checklists</button></div> <div class="flex justify-center gap-4 svelte-1l5usla"><button${attr_class(`btn btn-circle btn-lg ${stringify("btn-success")} shadow-lg`, "svelte-1l5usla")}${attr("disabled", true, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-8 h-8 svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd" class="svelte-1l5usla"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <button class="btn btn-circle btn-lg btn-warning shadow-lg svelte-1l5usla">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-8 h-8 svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1H4zM14 3a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1h-1z" class="svelte-1l5usla"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="text-center text-theme/60 text-sm svelte-1l5usla">Voice input automatically creates ${escape_html("notes")}!</div></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 svelte-1l5usla"><div class="text-center mb-6 svelte-1l5usla"><div class="text-6xl mb-4 svelte-1l5usla">✍️</div> <h2 class="text-2xl font-bold text-theme mb-2 svelte-1l5usla">Create Note</h2> <p class="text-theme/80 svelte-1l5usla">Write your thoughts or paste content</p></div> <div class="space-y-4 svelte-1l5usla"><div class="flex items-center gap-4 justify-center svelte-1l5usla"><label for="note-color-input" class="text-theme font-medium svelte-1l5usla">Color:</label> <input type="color"${attr("value", noteColor)} class="w-12 h-10 rounded-lg border-2 border-white/30 svelte-1l5usla" id="note-color-input"/></div> <textarea class="textarea textarea-bordered w-full h-64 resize-none bg-white/20 text-white placeholder-white/50 border-white/30 svelte-1l5usla" placeholder="Start writing your note...">`);
      const $$body = escape_html(newNote);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea> <div class="flex flex-wrap gap-2 justify-center svelte-1l5usla"><label class="btn btn-outline btn-sm text-white border-white/50 hover:bg-white/20 svelte-1l5usla"><input type="file" accept="image/*" class="hidden svelte-1l5usla"/> <span class="text-green-400 svelte-1l5usla">📷</span> Add Image</label></div> `);
      if (attachments.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex flex-wrap gap-2 justify-center svelte-1l5usla"><!--[-->`);
        const each_array_1 = ensure_array_like(attachments);
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let a = each_array_1[i];
          $$renderer2.push(`<button class="relative group svelte-1l5usla" aria-label="Remove attachment"><img${attr("src", a)} alt="attachment" class="w-16 h-16 object-cover rounded-lg border-2 border-white/30 svelte-1l5usla"/> <div class="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center text-white font-bold svelte-1l5usla">×</div></button>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="text-center text-theme/60 text-sm svelte-1l5usla">Notes are automatically saved as you type!</div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 svelte-1l5usla"><div class="flex items-center justify-between mb-6 svelte-1l5usla"><h2 class="text-3xl font-bold text-theme svelte-1l5usla">📚 My Notes</h2> <div class="flex items-center gap-4 svelte-1l5usla"><input class="input input-bordered bg-white/20 text-theme placeholder-theme/50 border-white/30 svelte-1l5usla" placeholder="🔍 Search notes..."${attr("value", search)}/></div></div> `);
      if (filteredNotes().length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-16 svelte-1l5usla"><div class="text-8xl mb-6 svelte-1l5usla">📝</div> <h3 class="text-2xl font-bold text-theme mb-4 svelte-1l5usla">No notes yet!</h3> <p class="text-theme/80 mb-6 svelte-1l5usla">Use voice input above or type in the note editor to create your first note</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 svelte-1l5usla"><!--[-->`);
        const each_array_5 = ensure_array_like(filteredNotes());
        for (let $$index_6 = 0, $$length = each_array_5.length; $$index_6 < $$length; $$index_6++) {
          let note = each_array_5[$$index_6];
          $$renderer2.push(`<div class="card bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 svelte-1l5usla"${attr_style(`background-color: ${stringify(note.color)}20; border-color: ${stringify(note.color)}40;`)}><div class="card-body p-6 svelte-1l5usla"><div class="flex justify-between items-start mb-3 svelte-1l5usla"><h3 class="card-title text-lg font-bold text-white line-clamp-2 svelte-1l5usla">${escape_html(note.title)}</h3> <div class="dropdown dropdown-end svelte-1l5usla"><button class="btn btn-ghost btn-sm text-white/80 hover:text-white svelte-1l5usla" aria-label="Note options menu"><svg class="w-5 h-5 svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" class="svelte-1l5usla"></path></svg></button> <ul class="dropdown-content menu p-2 shadow bg-white/90 backdrop-blur rounded-box w-48 svelte-1l5usla"><li class="svelte-1l5usla"><button class="text-gray-700 w-full text-left svelte-1l5usla">`);
          if (note.pinned) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="text-yellow-400 svelte-1l5usla">📌</span> Unpin`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span class="text-blue-400 svelte-1l5usla">📌</span> Pin`);
          }
          $$renderer2.push(`<!--]--></button></li> <li class="svelte-1l5usla"><button class="text-red-600 w-full text-left svelte-1l5usla"><span class="text-red-500 svelte-1l5usla">🗑️</span> Delete</button></li></ul></div></div> <div class="text-white/90 text-sm line-clamp-4 mb-4 whitespace-pre-wrap svelte-1l5usla">${escape_html(note.body)}</div> `);
          if (note.attachments && note.attachments.length > 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="flex flex-wrap gap-2 mb-4 svelte-1l5usla"><!--[-->`);
            const each_array_6 = ensure_array_like(note.attachments);
            for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
              let a = each_array_6[$$index_5];
              if (a.startsWith("data:audio")) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<button class="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-white/30 svelte-1l5usla" aria-label="Play audio attachment"><svg class="w-4 h-4 text-white svelte-1l5usla" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" class="svelte-1l5usla"></path></svg></button>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`<img${attr("src", a)} alt="attachment" class="w-12 h-12 object-cover rounded-lg border-2 border-white/30 svelte-1l5usla"/>`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]--></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="flex justify-between items-center text-xs text-white/60 svelte-1l5usla"><span class="svelte-1l5usla">Created: ${escape_html(new Date(note.createdAt || note.updatedAt).toLocaleDateString())} by ${escape_html(note.user || "Unknown")}</span> `);
          if (note.pinned) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="text-yellow-400 drop-shadow-lg svelte-1l5usla">📌</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function FamilyNotesModernPage($$renderer) {
  NotesModern($$renderer);
}
export {
  FamilyNotesModernPage as default
};
