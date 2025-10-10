export const traditionalColors = [
  { name: 'Sandalwood', tamil: 'சந்தனம்', hex: '#8B4513' },
  { name: 'Turmeric', tamil: 'மஞ்சள்', hex: '#DAA520' },
  { name: 'Indigo', tamil: 'நீலம்', hex: '#4B0082' },
  { name: 'Saffron', tamil: 'குங்குமம்', hex: '#FF6B35' },
  { name: 'Rose', tamil: 'ரோஜா', hex: '#DC143C' },
  { name: 'Jasmine', tamil: 'மல்லிகை', hex: '#F5F5DC' },
  { name: 'Lotus', tamil: 'தாமரை', hex: '#FF69B4' },
  { name: 'Peacock', tamil: 'மயில்', hex: '#00CED1' },
  { name: 'Emerald', tamil: 'மரகதம்', hex: '#008B8B' }
];

export const traditionalKolamPatterns = [
  {
    id: 'simple-dots-4',
    name: 'Simple 4 Dots',
    tamilName: 'எளிய 4 புள்ளிகள்',
    description: 'Basic kolam pattern with 4 dots - perfect for beginners',
    difficulty: 'beginner',
    category: 'basic',
    dots: 4,
    lines: 4,
    strokes: 8,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="150" r="3" fill="#8B4513"/>
      <circle cx="50" cy="150" r="3" fill="#8B4513"/>
    </svg>`
  },
  {
    id: 'lotus-8',
    name: 'Lotus Pattern',
    tamilName: 'தாமரை கோலம்',
    description: 'Traditional lotus kolam with 8 dots representing prosperity',
    difficulty: 'beginner',
    category: 'floral',
    dots: 8,
    lines: 12,
    strokes: 16,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="40" r="3" fill="#8B4513"/>
      <circle cx="140" cy="60" r="3" fill="#8B4513"/>
      <circle cx="160" cy="100" r="3" fill="#8B4513"/>
      <circle cx="140" cy="140" r="3" fill="#8B4513"/>
      <circle cx="100" cy="160" r="3" fill="#8B4513"/>
      <circle cx="60" cy="140" r="3" fill="#8B4513"/>
      <circle cx="40" cy="100" r="3" fill="#8B4513"/>
      <circle cx="60" cy="60" r="3" fill="#8B4513"/>
    </svg>`
  },
  {
    id: 'star-10',
    name: 'Star Kolam',
    tamilName: 'நட்சத்திர கோலம்',
    description: '10-dot star pattern symbolizing guidance and direction',
    difficulty: 'intermediate',
    category: 'geometric',
    dots: 10,
    lines: 15,
    strokes: 20,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="30" r="3" fill="#8B4513"/>
      <circle cx="130" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="80" r="3" fill="#8B4513"/>
      <circle cx="160" cy="110" r="3" fill="#8B4513"/>
      <circle cx="150" cy="140" r="3" fill="#8B4513"/>
      <circle cx="130" cy="170" r="3" fill="#8B4513"/>
      <circle cx="100" cy="180" r="3" fill="#8B4513"/>
      <circle cx="70" cy="170" r="3" fill="#8B4513"/>
      <circle cx="50" cy="140" r="3" fill="#8B4513"/>
      <circle cx="40" cy="110" r="3" fill="#8B4513"/>
    </svg>`
  }
];

export function getPatternsByDifficulty(difficulty) {
  return traditionalKolamPatterns.filter(pattern => pattern.difficulty === difficulty);
}

export function getPatternsByCategory(category) {
  return traditionalKolamPatterns.filter(pattern => pattern.category === category);
}

export function getRandomPattern(difficulty) {
  let patterns = traditionalKolamPatterns;
  if (difficulty) {
    patterns = patterns.filter(p => p.difficulty === difficulty);
  }
  return patterns[Math.floor(Math.random() * patterns.length)];
}

export const kolamCategories = [
  { id: 'basic', name: 'Basic Patterns', description: 'Simple kolam for beginners' },
  { id: 'floral', name: 'Floral Designs', description: 'Flower and nature inspired patterns' },
  { id: 'geometric', name: 'Geometric Shapes', description: 'Mathematical and symmetrical designs' },
  { id: 'animal', name: 'Animal Motifs', description: 'Patterns inspired by animals and birds' },
  { id: 'architectural', name: 'Temple & Architecture', description: 'Traditional architectural elements' },
  { id: 'sacred', name: 'Sacred Geometry', description: 'Spiritual and mandala patterns' }
];

export const difficultyLevels = [
  { id: 'beginner', name: 'Beginner', description: '4-8 dots, simple patterns' },
  { id: 'intermediate', name: 'Intermediate', description: '10-16 dots, moderate complexity' },
  { id: 'advanced', name: 'Advanced', description: '18-24 dots, complex patterns' },
  { id: 'master', name: 'Master', description: '25+ dots, intricate designs' }
];
