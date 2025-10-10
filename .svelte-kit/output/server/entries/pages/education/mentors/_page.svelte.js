import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function MentorsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredMentors;
    let mentors = [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        subject: "Mathematics",
        experience: "15 years",
        rating: 4.8,
        students: 245,
        specialization: "Advanced Calculus, Algebra",
        availability: "Mon-Fri: 6-8 PM",
        contact: "+91-98765-43210",
        email: "rajesh.kumar@example.com",
        status: "active"
      },
      {
        id: 2,
        name: "Mrs. Priya Sharma",
        subject: "English Literature",
        experience: "12 years",
        rating: 4.9,
        students: 189,
        specialization: "Shakespeare, Modern Literature",
        availability: "Tue-Sat: 5-7 PM",
        contact: "+91-98765-43211",
        email: "priya.sharma@example.com",
        status: "active"
      },
      {
        id: 3,
        name: "Mr. Arjun Patel",
        subject: "Physics",
        experience: "18 years",
        rating: 4.7,
        students: 312,
        specialization: "Quantum Physics, Mechanics",
        availability: "Mon-Wed: 7-9 PM",
        contact: "+91-98765-43212",
        email: "arjun.patel@example.com",
        status: "active"
      }
    ];
    let searchQuery = "";
    let selectedSubject = "all";
    let selectedRating = "all";
    const subjects = ["all", ...new Set(mentors.map((m) => m.subject))];
    const ratings = ["all", "4.0+", "4.5+"];
    function getRatingStars(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      return "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    }
    function getStatusColor(status) {
      return status === "active" ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100";
    }
    function getRatingColor(rating) {
      if (rating >= 4.5) return "text-green-600";
      if (rating >= 4) return "text-yellow-600";
      return "text-red-600";
    }
    filteredMentors = mentors.filter((mentor) => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || mentor.subject.toLowerCase().includes(searchQuery.toLowerCase()) || mentor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === "all";
      const matchesRating = selectedRating === "all";
      return matchesSearch && matchesSubject && matchesRating;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Mentors</h1> <p class="text-base-content/70 mt-1">Connect with experienced mentors for academic guidance</p></div> <div class="flex gap-2"><button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Mentor</button></div></div> <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Mentors</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name, subject..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Subject</span></label> `);
    $$renderer2.select(
      {
        value: selectedSubject,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(subjects);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let subject = each_array[$$index];
          $$renderer3.option({ value: subject }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(subject === "all" ? "All Subjects" : subject)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Minimum Rating</span></label> `);
    $$renderer2.select(
      {
        value: selectedRating,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(ratings);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let rating = each_array_1[$$index_1];
          $$renderer3.option({ value: rating }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(rating === "all" ? "All Ratings" : rating)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="flex items-center gap-3"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/70">Total Mentors</p> <p class="text-2xl font-bold text-base-content">${escape_html(mentors.length)}</p></div></div></div> <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="flex items-center gap-3"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, { icon: "mdi:school", class: "w-6 h-6 text-green-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/70">Active Mentors</p> <p class="text-2xl font-bold text-base-content">${escape_html(mentors.filter((m) => m.status === "active").length)}</p></div></div></div> <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="flex items-center gap-3"><div class="p-3 bg-yellow-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "mdi:account-multiple",
      class: "w-6 h-6 text-yellow-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/70">Total Students</p> <p class="text-2xl font-bold text-base-content">${escape_html(mentors.reduce((sum, m) => sum + m.students, 0))}</p></div></div></div> <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="flex items-center gap-3"><div class="p-3 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, { icon: "mdi:star", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-base-content/70">Avg Rating</p> <p class="text-2xl font-bold text-base-content">${escape_html((mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length).toFixed(1))}</p></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredMentors);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let mentor = each_array_2[$$index_2];
      $$renderer2.push(`<div class="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow"><div class="p-6 border-b border-base-300"><div class="flex items-start justify-between"><div class="flex items-center gap-3"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">${escape_html(mentor.name.charAt(0))}</div> <div><h3 class="font-semibold text-base-content">${escape_html(mentor.name)}</h3> <p class="text-sm text-base-content/70">${escape_html(mentor.subject)}</p></div></div> <span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(getStatusColor(mentor.status))}`)}>${escape_html(mentor.status)}</span></div></div> <div class="p-6 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><span${attr_class(`text-sm font-medium ${stringify(getRatingColor(mentor.rating))}`)}>${escape_html(getRatingStars(mentor.rating))}</span> <span class="text-sm text-base-content/70">(${escape_html(mentor.rating)})</span></div> <span class="text-sm text-base-content/70">${escape_html(mentor.experience)}</span></div> <div><p class="text-sm font-medium text-base-content mb-1">Specialization</p> <p class="text-sm text-base-content/70">${escape_html(mentor.specialization)}</p></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "mdi:account-multiple",
        class: "w-4 h-4 text-base-content/50"
      });
      $$renderer2.push(`<!----> <span class="text-sm text-base-content/70">${escape_html(mentor.students)} students</span></div> <div><p class="text-sm font-medium text-base-content mb-1">Availability</p> <p class="text-sm text-base-content/70">${escape_html(mentor.availability)}</p></div> <div class="space-y-2"><div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:phone", class: "w-4 h-4 text-base-content/50" });
      $$renderer2.push(`<!----> <span class="text-sm text-base-content/70">${escape_html(mentor.contact)}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:email", class: "w-4 h-4 text-base-content/50" });
      $$renderer2.push(`<!----> <span class="text-sm text-base-content/70">${escape_html(mentor.email)}</span></div></div></div> <div class="p-6 border-t border-base-300 bg-base-200/50"><div class="flex gap-2"><button class="btn btn-primary btn-sm flex-1">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Book Session</button> <button class="btn btn-outline btn-sm">`);
      Icon($$renderer2, { icon: "mdi:message", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Message</button> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>View Profile</a></li> <li><a>View Reviews</a></li> <li><a class="text-error">Report</a></li></ul></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredMentors.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:account-search",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content mb-2">No mentors found</h3> <p class="text-base-content/70">Try adjusting your search criteria or filters</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  MentorsPage($$renderer);
}
export {
  _page as default
};
