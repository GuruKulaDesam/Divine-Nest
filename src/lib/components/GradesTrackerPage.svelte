<script>
  // GradesTrackerPage.svelte
  // This is a comprehensive, emotionally intelligent, and role-aware Grades Tracking Suite for families
  import { onMount } from "svelte";
  let studentProfiles = [
    {
      name: "Ananya",
      school: "Kovaipudur Public School",
      board: "CBSE",
      grade: "6",
      section: "B",
      academicGoals: "90% in Math, fluent Tamil",
      emotionalNotes: "Happy, a bit stressed before exams",
      learningStyle: "Visual",
    },
  ];
  let gradebook = [
    { subject: "Math", monthly: [85, 88, 92], avg: 88.3, grade: "A", remarks: "Strong in geometry" },
    { subject: "Science", monthly: [78, 82, 80], avg: 80.0, grade: "B+", remarks: "Needs diagram clarity" },
    { subject: "Tamil", monthly: [90, 94, 96], avg: 93.3, grade: "A+", remarks: "Excellent fluency" },
    { subject: "English", monthly: [88, 85, 89], avg: 87.3, grade: "A", remarks: "Good vocabulary" },
    { subject: "Social Sci.", monthly: [75, 80, 78], avg: 77.6, grade: "B", remarks: "Revise map work" },
    { subject: "Computer", monthly: [95, 98, 97], avg: 96.6, grade: "A+", remarks: "Logical thinking strong" },
  ];
  let assignments = [
    { date: "Oct 10", task: "Math worksheet", status: "✅ Done", notes: "Reviewed by Appa" },
    { date: "Oct 12", task: "Tamil essay", status: "⏳ Pending", notes: "Topic: 'Pongal in my village'" },
    { date: "Oct 15", task: "Science test", status: "📌 Upcoming", notes: "Focus on diagrams" },
    { date: "Oct 18", task: "English speech prep", status: "📝 In Progress", notes: "Practice with Amma" },
  ];
  let studyLogs = [
    { week: "Week 1", focus: "Fractions, Tamil prose", time: "6 hrs", confidence: "😊 High", mood: "Calm" },
    { week: "Week 2", focus: "Science diagrams", time: "4 hrs", confidence: "😐 Medium", mood: "Tired" },
    { week: "Week 3", focus: "Social map work", time: "3 hrs", confidence: "😟 Low", mood: "Stressed" },
  ];
  let teacherFeedback = [
    { subject: "Math", comment: "Good grasp, needs speed", action: "Practice timed tests" },
    { subject: "English", comment: "Creative writing is excellent", action: "Submit for school mag" },
    { subject: "Science", comment: "Diagrams unclear", action: "Use colored labels" },
    { subject: "Tamil", comment: "Reads fluently, needs grammar polish", action: "Weekly grammar drills" },
  ];
  let wellbeing = [
    { day: "Monday", mood: "😊", sleep: "8 hrs", energy: "High", notes: "Played riddles with Paati" },
    { day: "Tuesday", mood: "😐", sleep: "6 hrs", energy: "Medium", notes: "Felt tired after school" },
    { day: "Wednesday", mood: "😟", sleep: "5 hrs", energy: "Low", notes: "Exam stress" },
  ];
  let milestones = [
    { date: "Sep 25", event: "1st prize in Tamil essay", celebrated: "Amma’s sweet pongal", tag: "Pride" },
    { date: "Oct 5", event: "Completed Math workbook", celebrated: "Appa’s movie night", tag: "Joy" },
    { date: "Oct 7", event: "Helped sibling revise", celebrated: "Paati’s blessing & kolam", tag: "Gratitude" },
  ];
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold mb-4">🧠 Comprehensive Grades & Growth Tracker – Family Edition</h1>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">🧭 Student Profile & Context</h2>
    <table class="table-auto w-full mb-2">
      <tbody>
        {#each studentProfiles as s}
          <tr><td>👧 Name</td><td>{s.name}</td></tr>
          <tr><td>🏫 School & Board</td><td>{s.school} ({s.board})</td></tr>
          <tr><td>🎓 Grade & Section</td><td>Class {s.grade} – Section {s.section}</td></tr>
          <tr><td>🎯 Academic Goals</td><td>{s.academicGoals}</td></tr>
          <tr><td>🧘 Emotional Notes</td><td>{s.emotionalNotes}</td></tr>
          <tr><td>🧑‍🎓 Learning Style</td><td>{s.learningStyle}</td></tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">📊 Subject-Wise Gradebook</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Subject</th><th>Monthly Scores</th><th>Term Avg</th><th>Grade</th><th>Remarks</th></tr>
      </thead>
      <tbody>
        {#each gradebook as g}
          <tr>
            <td>{g.subject}</td>
            <td>{g.monthly.join(", ")}</td>
            <td>{g.avg}</td>
            <td>{g.grade}</td>
            <td>{g.remarks}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">🗂️ Assignment & Exam Tracker</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Date</th><th>Task / Exam</th><th>Status</th><th>Notes</th></tr>
      </thead>
      <tbody>
        {#each assignments as a}
          <tr>
            <td>{a.date}</td>
            <td>{a.task}</td>
            <td>{a.status}</td>
            <td>{a.notes}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">📚 Study Plan & Revision Logs</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Week</th><th>Focus Areas</th><th>Time Spent</th><th>Confidence</th><th>Mood</th></tr>
      </thead>
      <tbody>
        {#each studyLogs as s}
          <tr>
            <td>{s.week}</td>
            <td>{s.focus}</td>
            <td>{s.time}</td>
            <td>{s.confidence}</td>
            <td>{s.mood}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">🧑‍🏫 Teacher Feedback & PTM Notes</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Subject</th><th>Teacher Comment</th><th>Action Plan</th></tr>
      </thead>
      <tbody>
        {#each teacherFeedback as t}
          <tr>
            <td>{t.subject}</td>
            <td>{t.comment}</td>
            <td>{t.action}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">🧘 Wellbeing & Motivation Tracker</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Day</th><th>Mood</th><th>Sleep</th><th>Energy</th><th>Notes</th></tr>
      </thead>
      <tbody>
        {#each wellbeing as w}
          <tr>
            <td>{w.day}</td>
            <td>{w.mood}</td>
            <td>{w.sleep}</td>
            <td>{w.energy}</td>
            <td>{w.notes}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">🏆 Milestones & Achievements</h2>
    <table class="table-auto w-full mb-2">
      <thead>
        <tr><th>Date</th><th>Event / Achievement</th><th>Celebrated With</th><th>Emotional Tag</th></tr>
      </thead>
      <tbody>
        {#each milestones as m}
          <tr>
            <td>{m.date}</td>
            <td>{m.event}</td>
            <td>{m.celebrated}</td>
            <td>{m.tag}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
