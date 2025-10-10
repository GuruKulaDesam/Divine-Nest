import type { PeriodEntry } from '$lib/stores/period';

export function predictNextCycle(entries: PeriodEntry[]): Date | null {
  if (entries.length < 2) return null;

  // Sort entries by date
  const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate cycle lengths
  const cycleLengths: number[] = [];
  for (let i = 1; i < sortedEntries.length; i++) {
    const prevDate = new Date(sortedEntries[i-1].date);
    const currDate = new Date(sortedEntries[i].date);
    const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    cycleLengths.push(diffDays);
  }

  if (cycleLengths.length === 0) return null;

  // Calculate average cycle length
  const avgCycleLength = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;

  // Predict next cycle
  const lastPeriodDate = new Date(sortedEntries[sortedEntries.length - 1].date);
  const nextCycleDate = new Date(lastPeriodDate.getTime() + (avgCycleLength * 24 * 60 * 60 * 1000));

  return nextCycleDate;
}

export function getCurrentCycleDay(entries: PeriodEntry[]): number {
  if (entries.length === 0) return 1;

  const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const lastEntry = sortedEntries[sortedEntries.length - 1];
  const lastDate = new Date(lastEntry.date);
  const today = new Date();

  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1; // +1 because cycle starts on day 1
}

export function getCyclePhase(cycleDay: number): string {
  if (cycleDay <= 5) return 'menstrual';
  if (cycleDay <= 13) return 'follicular';
  if (cycleDay <= 15) return 'ovulation';
  if (cycleDay <= 28) return 'luteal';
  return 'unknown';
}

export function getTamilRitualPrompt(cycleDay: number): string {
  const prompts: { [key: number]: string } = {
    1: "இன்று Day 1. கஞ்சி குடி. பூஜையை மனதிலே பண்ணு.",
    2: "உடல் ஓய்வு தேவை. சூடான கஞ்சி மற்றும் இளநீர் குடி.",
    3: "பசலை கீரை சமைத்து சாப்பிடு. உடல் சுத்தம் முக்கியம்.",
    4: "இஞ்சி கஞ்சி குடி. மன அமைதிக்கு தியானம் செய்.",
    5: "கடைசி நாள். நாளை முதல் புதிய சக்தி வரும்.",
    14: "உணர்ச்சி தெளிவாக இருக்கும். ஒரு புதிய திட்டம் தொடங்கு.",
    15: "சிந்தனை தெளிவு. கனவுகளை கவனி.",
    16: "உடல் சக்தி அதிகரிக்கும். உடற்பயிற்சி செய்.",
    21: "மௌனம் தேவை. பூவால் முகம் துடை. சாந்தி உன் அழகு.",
    25: "உணர்ச்சி மாற்றம். தனிமை தேடு, ஜர்னல் எழுது.",
    28: "கடைசி நாள். அடுத்த மாதத்திற்கு தயார்படு."
  };

  return prompts[cycleDay] || "உன் உடல் சொல்லும் குரலைக் கேள். அமைதியாக இரு.";
}