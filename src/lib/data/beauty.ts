// Beauty Guide Data - Traditional Tamil Wisdom & Modern Insights

export const beautyCategories = {
  skin: {
    title: 'தோல் பராமரிப்பு',
    english: 'Skin Care',
    icon: 'heroicons:sparkles',
    description: 'தமிழ் மரபு முறைகள் மற்றும் நவீன அறிவியல்'
  },
  hair: {
    title: 'முடி பராமரிப்பு',
    english: 'Hair Care',
    icon: 'heroicons:scissors',
    description: 'இயற்கை பொருட்கள் மற்றும் சமீபத்திய முறைகள்'
  },
  makeup: {
    title: 'அலங்காரம்',
    english: 'Makeup',
    icon: 'heroicons:eye',
    description: 'தமிழ் மரபு அலங்காரம் மற்றும் நவீன டிரெண்டுகள்'
  },
  wellness: {
    title: 'உடல் நலம்',
    english: 'Wellness',
    icon: 'heroicons:heart',
    description: 'உள் மற்றும் வெளி அழகு பராமரிப்பு'
  }
};

export const traditionalRemedies = {
  skin: [
    {
      name: 'தயிர் முக மூடி',
      english: 'Yogurt Face Mask',
      ingredients: ['தயிர்', 'தேன்', 'எலுமிச்சை சாறு'],
      benefits: 'தோல் ஒளி மற்றும் மென்மையை அதிகரிக்கும்',
      instructions: 'தயிர், தேன் மற்றும் எலுமிச்சை சாறு கலந்து 15 நிமிடம் வைத்திருந்து கழுவவும்',
      cyclePhase: 'எல்லா நாட்களும்'
    },
    {
      name: 'நெய் மஞ்சள் தடவல்',
      english: 'Turmeric Ghee Massage',
      ingredients: ['நெய்', 'மஞ்சள் தூள்', 'மிளகு'],
      benefits: 'தோல் நிறத்தை சீராக்கி ஒளியூட்டும்',
      instructions: 'நெய்யில் மஞ்சள் கலந்து முகத்தில் தடவி 20 நிமிடம் வைத்திருக்கவும்',
      cyclePhase: 'மாதவிடாய் காலம்'
    }
  ],
  hair: [
    {
      name: 'அம்லா முடி எண்ணெய்',
      english: 'Amla Hair Oil',
      ingredients: ['அம்லா', 'கற்பூரம்', 'கடுக்காய் எண்ணெய்'],
      benefits: 'முடி வளர்ச்சியை அதிகரித்து வலுப்படுத்தும்',
      instructions: 'அம்லாவை நீரில் ஊறவைத்து எண்ணெய் சேர்த்து தலைக்கு தேய்க்கவும்',
      cyclePhase: 'எல்லா நாட்களும்'
    },
    {
      name: 'கற்பூர முடி பாக்',
      english: 'Camphor Hair Pack',
      ingredients: ['கற்பூரம்', 'எண்ணெய்', 'முட்டை மஞ்சள்'],
      benefits: 'முடி உதிர்வை குறைத்து வலுப்படுத்தும்',
      instructions: 'கற்பூரம் மற்றும் மஞ்சள் கலந்து முடியில் தடவி 30 நிமிடம் வைத்திருக்கவும்',
      cyclePhase: 'மாதவிடாய் காலம்'
    }
  ]
};

export const modernTips = {
  skin: [
    {
      title: 'உணவு மற்றும் தோல்',
      content: 'ஆன்டிஆக்ஸிடன்ட் நிறைந்த உணவுகள் தோலை பாதுகாக்கும். விட்டமின் C மற்றும் E நிறைந்த பழங்கள் சாப்பிடுங்கள்.',
      icon: 'heroicons:apple'
    },
    {
      title: 'தண்ணீர் குடித்தல்',
      content: 'தினமும் 8 கிளாஸ் தண்ணீர் குடிப்பது தோலை ஹைட்ரேட் செய்து ஒளியூட்டும்.',
      icon: 'heroicons:droplets'
    },
    {
      title: 'தூக்கம் முக்கியம்',
      content: 'எல்லாம் 7-8 மணி நேர தூக்கம் தோல் செல்களை புதுப்பிக்க உதவும்.',
      icon: 'heroicons:moon'
    }
  ],
  hair: [
    {
      title: 'சூடான எண்ணெய் மசாஜ்',
      content: 'வாரம் ஒரு முறை சூடான எண்ணெய் மசாஜ் செய்வது முடியை வலுப்படுத்தும்.',
      icon: 'heroicons:fire'
    },
    {
      title: 'புரோட்டீன் நிறைந்த உணவு',
      content: 'முடி வளர்ச்சிக்கு புரோட்டீன் முக்கியம். முட்டை, கொட்டை வகைகள் சாப்பிடுங்கள்.',
      icon: 'heroicons:egg'
    },
    {
      title: 'குறைந்த வெப்பம்',
      content: 'ஹேர்ட்ரையர் மற்றும் ஸ்ட்ரெய்ட்னர்களை குறைவாக பயன்படுத்துங்கள்.',
      icon: 'heroicons:thermometer'
    }
  ]
};

export const seasonalTips = {
  summer: {
    title: 'கோடை பராமரிப்பு',
    english: 'Summer Care',
    tips: [
      'தோலை ஈரப்பதமாக வைத்திருங்கள்',
      'சூரிய ஒளியில் இருந்து பாதுகாப்பு',
      'இலகு தோல் பராமரிப்பு பொருட்கள் பயன்படுத்துங்கள்'
    ]
  },
  winter: {
    title: 'குளிர்கால பராமரிப்பு',
    english: 'Winter Care',
    tips: [
      'தோலை ஈரப்பதமாக்கும் க்ரீம்கள் பயன்படுத்துங்கள்',
      'சூடான தண்ணீரில் குளிக்காமல் இருங்கள்',
      'முடியை ஈரப்பதமாக்கும் மாஸ்க்குகள் போடுங்கள்'
    ]
  },
  monsoon: {
    title: 'மழைக்கால பராமரிப்பு',
    english: 'Monsoon Care',
    tips: [
      'தோலை சுத்தமாக வைத்திருங்கள்',
      'பூஞ்சை தொற்றை தடுக்கும் பொருட்கள் பயன்படுத்துங்கள்',
      'முடியை உலர வைத்திருங்கள்'
    ]
  }
};

export const beautyWisdom = [
  {
    quote: "அழகு என்பது வெளிப்புறம் மட்டுமல்ல, உள் அழகு முக்கியம்",
    english: "Beauty is not just external, inner beauty is important",
    author: "தமிழ் மரபு"
  },
  {
    quote: "தோல் பராமரிப்பு தினமும் செய்ய வேண்டிய ஒன்று",
    english: "Skin care is something to be done daily",
    author: "நவீன அறிவியல்"
  },
  {
    quote: "உணவு மற்றும் தூக்கம் அழகை தீர்மானிக்கும்",
    english: "Food and sleep determine beauty",
    author: "ஆரோக்கிய நிபுணர்"
  }
];