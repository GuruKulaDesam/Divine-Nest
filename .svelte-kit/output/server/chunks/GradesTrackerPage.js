import { a as ensure_array_like } from "./index2.js";
import { e as escape_html } from "./context.js";
function GradesTrackerPage($$renderer) {
  let studentProfiles = [
    {
      name: "Ananya",
      school: "Kovaipudur Public School",
      board: "CBSE",
      grade: "6",
      section: "B",
      academicGoals: "90% in Math, fluent Tamil",
      emotionalNotes: "Happy, a bit stressed before exams",
      learningStyle: "Visual"
    }
  ];
  let gradebook = [
    {
      subject: "Math",
      monthly: [85, 88, 92],
      avg: 88.3,
      grade: "A",
      remarks: "Strong in geometry"
    },
    {
      subject: "Science",
      monthly: [78, 82, 80],
      avg: 80,
      grade: "B+",
      remarks: "Needs diagram clarity"
    },
    {
      subject: "Tamil",
      monthly: [90, 94, 96],
      avg: 93.3,
      grade: "A+",
      remarks: "Excellent fluency"
    },
    {
      subject: "English",
      monthly: [88, 85, 89],
      avg: 87.3,
      grade: "A",
      remarks: "Good vocabulary"
    },
    {
      subject: "Social Sci.",
      monthly: [75, 80, 78],
      avg: 77.6,
      grade: "B",
      remarks: "Revise map work"
    },
    {
      subject: "Computer",
      monthly: [95, 98, 97],
      avg: 96.6,
      grade: "A+",
      remarks: "Logical thinking strong"
    }
  ];
  let assignments = [
    {
      date: "Oct 10",
      task: "Math worksheet",
      status: "✅ Done",
      notes: "Reviewed by Appa"
    },
    {
      date: "Oct 12",
      task: "Tamil essay",
      status: "⏳ Pending",
      notes: "Topic: 'Pongal in my village'"
    },
    {
      date: "Oct 15",
      task: "Science test",
      status: "📌 Upcoming",
      notes: "Focus on diagrams"
    },
    {
      date: "Oct 18",
      task: "English speech prep",
      status: "📝 In Progress",
      notes: "Practice with Amma"
    }
  ];
  let studyLogs = [
    {
      week: "Week 1",
      focus: "Fractions, Tamil prose",
      time: "6 hrs",
      confidence: "😊 High",
      mood: "Calm"
    },
    {
      week: "Week 2",
      focus: "Science diagrams",
      time: "4 hrs",
      confidence: "😐 Medium",
      mood: "Tired"
    },
    {
      week: "Week 3",
      focus: "Social map work",
      time: "3 hrs",
      confidence: "😟 Low",
      mood: "Stressed"
    }
  ];
  let teacherFeedback = [
    {
      subject: "Math",
      comment: "Good grasp, needs speed",
      action: "Practice timed tests"
    },
    {
      subject: "English",
      comment: "Creative writing is excellent",
      action: "Submit for school mag"
    },
    {
      subject: "Science",
      comment: "Diagrams unclear",
      action: "Use colored labels"
    },
    {
      subject: "Tamil",
      comment: "Reads fluently, needs grammar polish",
      action: "Weekly grammar drills"
    }
  ];
  let wellbeing = [
    {
      day: "Monday",
      mood: "😊",
      sleep: "8 hrs",
      energy: "High",
      notes: "Played riddles with Paati"
    },
    {
      day: "Tuesday",
      mood: "😐",
      sleep: "6 hrs",
      energy: "Medium",
      notes: "Felt tired after school"
    },
    {
      day: "Wednesday",
      mood: "😟",
      sleep: "5 hrs",
      energy: "Low",
      notes: "Exam stress"
    }
  ];
  let milestones = [
    {
      date: "Sep 25",
      event: "1st prize in Tamil essay",
      celebrated: "Amma’s sweet pongal",
      tag: "Pride"
    },
    {
      date: "Oct 5",
      event: "Completed Math workbook",
      celebrated: "Appa’s movie night",
      tag: "Joy"
    },
    {
      date: "Oct 7",
      event: "Helped sibling revise",
      celebrated: "Paati’s blessing & kolam",
      tag: "Gratitude"
    }
  ];
  $$renderer.push(`<div class="p-6 max-w-4xl mx-auto"><h1 class="text-3xl font-bold mb-4">🧠 Comprehensive Grades &amp; Growth Tracker – Family Edition</h1> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">🧭 Student Profile &amp; Context</h2> <table class="table-auto w-full mb-2"><tbody><!--[-->`);
  const each_array = ensure_array_like(studentProfiles);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let s = each_array[$$index];
    $$renderer.push(`<tr><td>👧 Name</td><td>${escape_html(s.name)}</td></tr> <tr><td>🏫 School &amp; Board</td><td>${escape_html(s.school)} (${escape_html(s.board)})</td></tr> <tr><td>🎓 Grade &amp; Section</td><td>Class ${escape_html(s.grade)} – Section ${escape_html(s.section)}</td></tr> <tr><td>🎯 Academic Goals</td><td>${escape_html(s.academicGoals)}</td></tr> <tr><td>🧘 Emotional Notes</td><td>${escape_html(s.emotionalNotes)}</td></tr> <tr><td>🧑‍🎓 Learning Style</td><td>${escape_html(s.learningStyle)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">📊 Subject-Wise Gradebook</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Subject</th><th>Monthly Scores</th><th>Term Avg</th><th>Grade</th><th>Remarks</th></tr></thead><tbody><!--[-->`);
  const each_array_1 = ensure_array_like(gradebook);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let g = each_array_1[$$index_1];
    $$renderer.push(`<tr><td>${escape_html(g.subject)}</td><td>${escape_html(g.monthly.join(", "))}</td><td>${escape_html(g.avg)}</td><td>${escape_html(g.grade)}</td><td>${escape_html(g.remarks)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">🗂️ Assignment &amp; Exam Tracker</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Date</th><th>Task / Exam</th><th>Status</th><th>Notes</th></tr></thead><tbody><!--[-->`);
  const each_array_2 = ensure_array_like(assignments);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let a = each_array_2[$$index_2];
    $$renderer.push(`<tr><td>${escape_html(a.date)}</td><td>${escape_html(a.task)}</td><td>${escape_html(a.status)}</td><td>${escape_html(a.notes)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">📚 Study Plan &amp; Revision Logs</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Week</th><th>Focus Areas</th><th>Time Spent</th><th>Confidence</th><th>Mood</th></tr></thead><tbody><!--[-->`);
  const each_array_3 = ensure_array_like(studyLogs);
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let s = each_array_3[$$index_3];
    $$renderer.push(`<tr><td>${escape_html(s.week)}</td><td>${escape_html(s.focus)}</td><td>${escape_html(s.time)}</td><td>${escape_html(s.confidence)}</td><td>${escape_html(s.mood)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">🧑‍🏫 Teacher Feedback &amp; PTM Notes</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Subject</th><th>Teacher Comment</th><th>Action Plan</th></tr></thead><tbody><!--[-->`);
  const each_array_4 = ensure_array_like(teacherFeedback);
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let t = each_array_4[$$index_4];
    $$renderer.push(`<tr><td>${escape_html(t.subject)}</td><td>${escape_html(t.comment)}</td><td>${escape_html(t.action)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">🧘 Wellbeing &amp; Motivation Tracker</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Day</th><th>Mood</th><th>Sleep</th><th>Energy</th><th>Notes</th></tr></thead><tbody><!--[-->`);
  const each_array_5 = ensure_array_like(wellbeing);
  for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
    let w = each_array_5[$$index_5];
    $$renderer.push(`<tr><td>${escape_html(w.day)}</td><td>${escape_html(w.mood)}</td><td>${escape_html(w.sleep)}</td><td>${escape_html(w.energy)}</td><td>${escape_html(w.notes)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section> <section class="mb-8"><h2 class="text-xl font-semibold mb-2">🏆 Milestones &amp; Achievements</h2> <table class="table-auto w-full mb-2"><thead><tr><th>Date</th><th>Event / Achievement</th><th>Celebrated With</th><th>Emotional Tag</th></tr></thead><tbody><!--[-->`);
  const each_array_6 = ensure_array_like(milestones);
  for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
    let m = each_array_6[$$index_6];
    $$renderer.push(`<tr><td>${escape_html(m.date)}</td><td>${escape_html(m.event)}</td><td>${escape_html(m.celebrated)}</td><td>${escape_html(m.tag)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></section></div>`);
}
export {
  GradesTrackerPage as default
};
