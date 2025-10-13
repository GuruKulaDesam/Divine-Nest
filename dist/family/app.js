(() => {
  const prompts = {
    taskSuggestions: `Based on the past 30 days of tasks for [User Name], suggest 3 recurring tasks they might want to schedule this week. Include task name, suggested time, and priority.`,
    mealPlan: `Generate a vegetarian South Indian meal plan for 5 days. Include breakfast, lunch, and dinner. Avoid repeating dishes. Highlight seasonal ingredients.`,
    journalSummary: `Summarize the last 3 journal entries for [User Name]. Identify emotional tone, recurring themes, and suggest a reflection prompt.`,
    familyNudge: `Compose a gentle reminder message for [Recipient Name] to [Action]. Use warm, respectful language suitable for family.`
  };

  const models = `type User = {
  id: string;
  name: string;
  role: 'homemaker' | 'student' | 'professional' | 'elder';
  preferences: { theme: string; language: string };
}

type Task = {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

type MealPlan = {
  id: string;
  date: string;
  meals: { breakfast: string; lunch: string; dinner: string };
  ingredients: string[];
}

type JournalEntry = {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
}`;

  // mount prompt list
  const promptListEl = document.getElementById('prompt-list');
  promptListEl.textContent = Object.values(prompts).join('\n\n---\n\n');

  document.getElementById('copy-prompts').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(promptListEl.textContent);
      alert('Prompts copied to clipboard');
    } catch (e) { alert('Copy failed: ' + e.message); }
  });

  // mount data model
  document.getElementById('data-model').textContent = models;
  document.getElementById('download-model').addEventListener('click', () => {
    const blob = new Blob([models], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'models.ts'; a.click(); URL.revokeObjectURL(url);
  });

  // Onboarding UI
  const startBtn = document.getElementById('start-onboard');
  const downloadProfile = document.getElementById('download-profile');
  const root = document.getElementById('onboard-root');

  function renderStep(step, state) {
    root.innerHTML = '';
    const container = document.createElement('div'); container.className = 'panel';
    const h = document.createElement('h3'); h.textContent = step.title; container.appendChild(h);
    if (step.type === 'choices') {
      step.options.forEach(opt => {
        const btn = document.createElement('button'); btn.className = 'btn'; btn.style.marginRight='8px'; btn.textContent = opt.label;
        btn.onclick = () => { state[step.key] = opt.value; next(); };
        container.appendChild(btn);
      });
    } else if (step.type === 'form') {
      const form = document.createElement('div'); form.style.display='flex'; form.style.flexDirection='column'; form.style.gap='8px';
      step.fields.forEach(f => {
        const label = document.createElement('label'); label.textContent = f.label; const input = document.createElement('input'); input.value = f.default||''; input.placeholder = f.placeholder || '';
        input.oninput = (e) => state[f.key] = e.target.value;
        form.appendChild(label); form.appendChild(input);
      });
      container.appendChild(form);
    }
    root.appendChild(container);
  }

  const steps = [
    { id: 'welcome', title: 'Welcome — choose a background vibe', type: 'choices', key: 'theme', options: [{label:'Calm',value:'calm'},{label:'Focused',value:'focused'},{label:'Festive',value:'festive'}] },
    { id: 'role', title: 'Who are you?', type: 'choices', key: 'role', options: [{label:'Homemaker',value:'homemaker'},{label:'Student',value:'student'},{label:'Professional',value:'professional'},{label:'Elder',value:'elder'}] },
    { id: 'daily', title: 'Daily rhythm — basic times', type: 'form', fields: [{key:'wake','label':'Wake-up time','default':'06:30'},{key:'breakfast','label':'Breakfast time','default':'08:00'},{key:'lunch','label':'Lunch time','default':'13:00'},{key:'dinner','label':'Dinner time','default':'20:00'}] },
    { id: 'modules', title: 'Choose modules', type: 'choices', key: 'modules', options: [{label:'Calendar+Tasks+Notes',value:['calendar','tasks','notes']},{label:'Meals+Notes',value:['meals','notes']},{label:'Full family pack',value:['calendar','tasks','meals','notes','finance','health','chat']}] }
  ];

  let stepIndex = 0;
  const state = {};

  function next() {
    stepIndex++;
    if (stepIndex >= steps.length) finish(); else renderStep(steps[stepIndex], state);
  }

  function finish() {
    root.innerHTML = '';
    const out = document.createElement('div'); out.className='panel';
    out.innerHTML = `<h3>All set — your sample profile</h3><pre>${JSON.stringify(state,null,2)}</pre>`;
    root.appendChild(out);
    downloadProfile.disabled = false;
    downloadProfile.onclick = () => {
      const blob = new Blob([JSON.stringify(state,null,2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'family-profile.json'; a.click(); URL.revokeObjectURL(url);
    };
  }

  startBtn.addEventListener('click', () => { stepIndex = 0; renderStep(steps[0], state); downloadProfile.disabled = true; });

})();
