export function inferEmotion(text: string): string {
  if (!text) return 'neutral';

  const lowerText = text.toLowerCase();

  // Tamil emotion keywords
  const tamilEmotions = {
    calm: ['அமைதி', 'சாந்தி', 'ஶாந்தி', 'அமைதியாக', 'நிம்மதி'],
    irritable: ['கோபம்', 'எரிச்சல்', 'சலிப்பு', 'தொல்லை', 'கடுப்பு'],
    sad: ['துக்கம்', 'வருத்தம்', 'கவலை', 'இருள்', 'கண்ணீர்'],
    energized: ['ஆற்றல்', 'சக்தி', 'மகிழ்ச்சி', 'உற்சாகம்', 'ஒளி'],
    low: ['களைப்பு', 'சோர்வு', 'வலி', 'நலிவு', 'பலவீனம்']
  };

  // English emotion keywords
  const englishEmotions = {
    calm: ['calm', 'peace', 'peaceful', 'relaxed', 'serene', 'quiet'],
    irritable: ['irritated', 'angry', 'annoyed', 'frustrated', 'moody'],
    sad: ['sad', 'depressed', 'unhappy', 'down', 'blue', 'tearful'],
    energized: ['energized', 'happy', 'excited', 'vibrant', 'alive', 'strong'],
    low: ['tired', 'fatigued', 'pain', 'weak', 'exhausted', 'drained']
  };

  // Check Tamil keywords first
  for (const [emotion, keywords] of Object.entries(tamilEmotions)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return emotion;
    }
  }

  // Check English keywords
  for (const [emotion, keywords] of Object.entries(englishEmotions)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return emotion;
    }
  }

  // Default emotion based on context
  if (lowerText.includes('period') || lowerText.includes('மாதவிடாய்')) {
    return 'low'; // Common during periods
  }

  return 'neutral';
}

export function getEmotionColor(emotion: string): string {
  const colors = {
    calm: 'bg-blue-100 text-blue-800 border-blue-200',
    irritable: 'bg-red-100 text-red-800 border-red-200',
    sad: 'bg-gray-100 text-gray-800 border-gray-200',
    energized: 'bg-green-100 text-green-800 border-green-200',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    neutral: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return colors[emotion as keyof typeof colors] || colors.neutral;
}

export function getEmotionIcon(emotion: string): string {
  const icons = {
    calm: 'heroicons:face-smile',
    irritable: 'heroicons:face-frown',
    sad: 'heroicons:face-frown',
    energized: 'heroicons:bolt',
    low: 'heroicons:battery-50',
    neutral: 'heroicons:minus-circle'
  };

  return icons[emotion as keyof typeof icons] || icons.neutral;
}