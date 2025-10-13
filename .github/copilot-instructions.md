# Divine-Nest (Home Maker) - Complete Developer Guide

## 🎯 Project Overview

**Divine-Nest** is a comprehensive family management dashboard designed for modern South Indian households. It combines traditional cultural values with modern technology to help families manage daily life, rituals, finances, and household operations.

### Target Users
- South Indian families managing traditional households
- Multi-generational families with elders, children, and working parents
- Families following Hindu traditions and festivals
- Users who prefer voice commands in regional languages (Tamil, Telugu, Kannada, Malayalam)

### Core Features
- **🏠 Household Management**: Grocery tracking, chores, repairs, emergency services
- **👨‍👩‍👧‍👦 Family Coordination**: Member profiles, roles, responsibilities
- **📅 Calendar & Events**: Festival tracking, family events, reminders
- **🎤 Voice Assistant**: Bilingual Tamil-English voice commands
- **💰 Finance Tracking**: Budget, expenses, income, savings
- **📝 Notes & Tasks**: Voice-enabled notes, todo lists, reminders
- **🍽️ Meal Planning**: Traditional South Indian meal planning
- **🛐 Cultural Features**: Panchangam, festivals, rituals, prayers
- **📱 PWA + Mobile App**: Installable on Android, works offline

---

## 🛠️ Technology Stack

### Frontend Framework
- **SvelteKit 2.x**: File-based routing, SSR, SPA capabilities
- **Svelte 5.x**: Reactive components, stores, lifecycle management
- **Vite**: Fast build tool, HMR, optimized bundling

### UI & Styling
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **Melt UI**: Headless UI components for accessibility
- **Motion**: Animation library for smooth transitions
- **Iconify**: Unified icon system (Heroicons, Material Design, etc.)

### Data Storage
- **Web**: IndexedDB via Dexie.js (persistent local storage)
- **Mobile**: SQLite via Capacitor plugins
- **Unified API**: `sqliteService.ts` abstracts platform differences

### Mobile & PWA
- **Capacitor 7.x**: Native mobile app framework
- **PWA Features**: Service worker, offline support, installable
- **Android Build**: Gradle-based APK generation

### Voice & AI
- **Web Speech API**: Speech recognition and synthesis
- **Custom Intent Parser**: Regex-based command understanding
- **Bilingual Support**: Tamil-English voice commands

### Internationalization
- **Svelte I18n**: Multi-language support
- **14 Languages**: English, Tamil, Telugu, Kannada, Malayalam, Hindi, Bengali, Gujarati, Marathi, Oriya, Punjabi, Indonesian, Spanish, Korean

### Additional Libraries
- **Chart.js**: Data visualization and analytics
- **Leaflet**: Interactive maps
- **FullCalendar**: Event calendar management
- **Firebase Crashlytics**: Error reporting and analytics

---

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SvelteKit     │    │   Capacitor     │    │   SQLite/       │
│   Frontend      │◄──►│   Bridge        │◄──►│   IndexedDB     │
│   (Web/Mobile)  │    │   (Native)      │    │   (Storage)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Service       │    │   Plugins       │    │   Service       │
│   Layer         │    │   (Geolocation, │    │   Worker        │
│   (Business     │    │    Speech, etc.)│    │   (Caching)     │
│    Logic)       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Architectural Patterns

#### 1. **Platform Abstraction**
- **Problem**: Web vs Mobile have different storage APIs
- **Solution**: Unified `sqliteService.ts` with platform detection
- **Usage**: `Capacitor.isNativePlatform()` to branch logic

#### 2. **Service Layer Pattern**
- **Problem**: Direct storage access scattered throughout code
- **Solution**: All data operations through service classes
- **Location**: `src/lib/services/` - never access storage directly

#### 3. **Store-Based State Management**
- **Problem**: Component state synchronization
- **Solution**: Svelte stores with localStorage persistence
- **Location**: `src/lib/stores/` - reactive state management

#### 4. **File-Based Routing**
- **Problem**: Complex routing configuration
- **Solution**: SvelteKit file-based routing
- **Location**: `src/routes/` - folder structure = URL structure

#### 5. **Component Composition**
- **Problem**: UI consistency across platforms
- **Solution**: Shared components with platform-specific layouts
- **Location**: `src/lib/components/` - reusable UI components

---

## 📁 Project Structure

```
divine-nest/
├── 📱 Mobile App (Capacitor)
│   └── android/                    # Android project files
│       ├── app/
│       │   ├── build.gradle       # Android app config
│       │   └── capacitor.build.gradle
│       └── gradle.properties      # Build settings
|
├── 🌐 Web App (SvelteKit)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/        # Reusable UI components
│   │   │   │   ├── DesktopLayout.svelte
│   │   │   │   ├── MobileLayout.svelte
│   │   │   │   └── DashboardTiles.svelte
│   │   │   ├── services/          # Business logic & data access
│   │   │   │   ├── sqliteService.ts     # Unified storage API
│   │   │   │   ├── notificationService.js
│   │   │   │   └── crashAnalytics.ts
│   │   │   ├── stores/            # Reactive state management
│   │   │   │   ├── userProfile.ts
│   │   │   │   ├── todos.ts
│   │   │   │   └── theme.js
│   │   │   ├── utils/             # Helper functions
│   │   │   │   ├── platform.ts    # Platform detection
│   │   │   │   ├── dexie-db.js    # IndexedDB setup
│   │   │   │   └── secureStorage.ts
│   │   │   ├── voice/             # Voice assistant
│   │   │   │   ├── intentParser.ts
│   │   │   │   ├── speechCapture.ts
│   │   │   │   └── wakeWord.ts
│   │   │   ├── i18n/              # Internationalization
│   │   │   │   ├── locales/       # Translation files
│   │   │   │   └── index.js       # i18n setup
│   │   │   └── models.ts          # TypeScript interfaces
│   │   ├── routes/                # Pages (file-based routing)
│   │   │   ├── +layout.svelte     # Root layout
│   │   │   ├── +page.svelte       # Home page
│   │   │   ├── home/              # Household management
│   │   │   ├── food/              # Meal planning
│   │   │   ├── finances/          # Money management
│   │   │   └── setup/             # Onboarding
│   │   └── assets/                # Static assets
│   ├── public/                    # Public assets
│   │   ├── service-worker.js      # PWA service worker
│   │   ├── manifest.webmanifest   # PWA manifest
│   │   └── family/                # Static microsite
│   └── package.json               # Dependencies & scripts
|
└── ⚙️ Configuration
    ├── svelte.config.js           # SvelteKit config
    ├── vite.config.js             # Build config
    ├── tailwind.config.js         # Styling config
    ├── capacitor.config.ts        # Mobile config
    ├── tsconfig.json              # TypeScript config
    └── .github/
        └── copilot-instructions.md # This file!
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (check with `node --version`)
- **npm or yarn** (comes with Node.js)
- **Android Studio** (for mobile development)
- **Java JDK 11+** (for Android builds)

### 1. Clone & Install
```bash
git clone https://github.com/GuruKulaDesam/Divine-Nest.git
cd divine-nest
npm install
```

### 2. Development Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### 3. First-Time Setup
1. Visit `http://localhost:3000`
2. Complete household setup wizard
3. Configure family members, region, preferences
4. Start using the app!

### 4. Android Development (Optional)
```bash
# Build web assets and sync to Android
npm run android:build

# Open Android Studio
npm run android:open

# Run on device/emulator
npm run android:run
```

---

## 🔧 Key Components Deep Dive

### 1. **Storage System (`sqliteService.ts`)**
The heart of data persistence with platform abstraction:

```typescript
// Platform detection
const isWeb = typeof window !== 'undefined' && !Capacitor.isNativePlatform();

// Unified API - works on both web and mobile
await sqliteService.saveTodo({ title: 'Buy groceries', category: 'grocery' });
const todos = await sqliteService.getTodos();
```

**Web**: Uses SQL.js + localStorage for IndexedDB-like persistence
**Mobile**: Uses native SQLite via Capacitor plugins

### 2. **Layout System**
Responsive layouts that adapt to platform:

- **DesktopLayout**: Full sidebar navigation, multi-column layout
- **MobileLayout**: Bottom navigation, touch-optimized
- **Platform Detection**: `isDesktopScreen()`, `isMobilePlatform()`

### 3. **Voice Assistant**
Bilingual command processing:

```typescript
// Tamil: "சேர்க்க பட்டியலில் பால்" (Add milk to list)
// English: "add milk to shopping list"
const intent = parseIntent("சேர்க்க பட்டியலில் பால்");
// Returns: { type: 'createTodo', title: 'பால்', confidence: 0.8 }
```

### 4. **State Management**
Svelte stores with persistence:

```typescript
// Reactive store with localStorage backup
export const userProfile = writable<UserProfile>(defaultProfile);

// Actions for complex operations
export const userProfileActions = {
  updateProfile: (profile) => { /* ... */ },
  loadProfile: () => { /* ... */ }
};
```

### 5. **Internationalization**
14 languages with fallback support:

```javascript
// In components
import { _ } from 'svelte-i18n';
<h1>{$_('home.welcome')}</h1>

// Language switching
locale.set('ta'); // Switch to Tamil
```

---

## 📱 PWA & Mobile Development

### PWA Features
- **Installable**: Add to home screen like native app
- **Offline Support**: Service worker caches assets
- **Push Notifications**: Firebase integration
- **Background Sync**: Data syncs when online

### Service Worker (`public/service-worker.js`)
```javascript
// Caches static assets and API responses
const STATIC_CACHE = 'home-management-suite-static-v1.0.0';
const DYNAMIC_CACHE = 'home-management-suite-dynamic-v1.0.0';

// Cache-first strategy for assets, network-first for data
```

### Android Build Process
1. **Web Build**: `npm run build` → `dist/` folder
2. **Capacitor Sync**: `npx cap sync android`
3. **Android Studio**: Open `android/` folder
4. **Build APK**: Gradle build system

### Capacitor Configuration (`capacitor.config.ts`)
```typescript
const config: CapacitorConfig = {
  appId: 'com.gurukuladesam.homemanagementsuite',
  appName: 'Home Management Suite',
  webDir: 'dist',
  plugins: {
    SQLite: { /* SQLite config */ },
    Geolocation: {},
    FirebaseCrashlytics: { enabled: true }
  }
};
```

---

## 🎤 Voice Assistant Architecture

### Intent Processing Pipeline
1. **Wake Word Detection**: "Hey Home" or "வீடு" (Veedu)
2. **Speech Recognition**: Web Speech API or Capacitor plugin
3. **Intent Parsing**: Regex patterns for command understanding
4. **Action Execution**: Route to appropriate service method

### Bilingual Support
```typescript
// intentParser.ts
const todoPatterns = [
  /(add|சேர்க்க).*?(to my list|பட்டியலில்)/,
  /(remind me|நினைவூட்ட).*?(to buy|வாங்க)/,
  /(need to|வேண்டும்).*?(buy|வாங்க)/
];
```

### Voice Commands Examples
- **Tamil**: "சேர்க்க பட்டியலில் பால்" → Add milk to shopping list
- **English**: "remind me to call mom at 6pm" → Create reminder
- **Mixed**: "add rice to shopping list and remind me tomorrow"

---

## 🔄 Data Flow Patterns

### 1. **Component → Service → Storage**
```svelte
<!-- TodoForm.svelte -->
<script>
  import { sqliteService } from '$lib/services/sqliteService';

  async function addTodo(title) {
    await sqliteService.saveTodo({ title, category: 'grocery' });
    todos.update(list => [...list, newTodo]);
  }
</script>
```

### 2. **Store → Component → UI Update**
```typescript
// stores/todos.ts
export const todos = writable<Todo[]>([]);

// Component subscribes and updates UI reactively
$: console.log('Todos changed:', $todos);
```

### 3. **Platform Branching**
```typescript
// Always check platform before native APIs
if (Capacitor.isNativePlatform()) {
  // Use Capacitor plugins
  const { Geolocation } = await import('@capacitor/geolocation');
} else {
  // Use web APIs or fallbacks
  navigator.geolocation.getCurrentPosition();
}
```

---

## 🧪 Testing & Debugging

### Manual Testing (Primary Approach)
- **Dev Server**: `npm run dev` for hot reload
- **Android Emulator**: Test mobile-specific features
- **Browser DevTools**: Console, Network, Application tabs
- **PWA Testing**: Lighthouse audit, offline mode

### Key Test Scenarios
1. **Platform Switching**: Test web ↔ mobile data sync
2. **Voice Commands**: Test in different languages
3. **Offline Mode**: Disable network, test functionality
4. **PWA Installation**: Add to home screen, test notifications

### Debugging Tools
- **Browser DevTools**: Network, Console, Application (IndexedDB)
- **Android Studio**: Device logs, debugging
- **Firebase Crashlytics**: Error reporting
- **Performance Monitor**: `src/lib/utils/performance.ts`

---

## 🚢 Deployment

### Web Deployment (GitHub Pages)
```bash
# Build for production
npm run build

# Deploy (automated via GitHub Actions)
# See .github/workflows/deploy.yml
```

### Android Deployment
```bash
# Debug build
npm run android:build-debug

# Release build (requires keystore)
npm run android:build-release

# Manual signing and distribution
```

### Build Artifacts
- **Web**: `dist/` folder (static files)
- **Android**: `android/app/build/outputs/apk/` (APK files)

---

## 🛠️ Common Development Tasks

### Adding a New Feature

#### 1. **New Data Entity**
```typescript
// 1. Define interface in models.ts
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisine: 'south-indian' | 'north-indian';
}

// 2. Add table in sqliteService.ts
`CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  cuisine TEXT
)`

// 3. Add CRUD methods
async saveRecipe(recipe: Recipe) { /* ... */ }
async getRecipes() { /* ... */ }
```

#### 2. **New Page/Route**
```bash
# 1. Create folder in src/routes/
mkdir src/routes/recipes

# 2. Create +page.svelte
# src/routes/recipes/+page.svelte
<script>
  import RecipesList from '$lib/components/RecipesList.svelte';
</script>

<svelte:head>
  <title>Recipes - Home Management Suite</title>
</svelte:head>

<RecipesList />
```

#### 3. **Voice Command Support**
```typescript
// 1. Add patterns in intentParser.ts
if (text.match(/(recipe|சமையல்).*?(for|க்கு)/)) {
  return {
    type: 'findRecipe',
    cuisine: extractCuisine(text),
    confidence: 0.8
  };
}

// 2. Handle in voice assistant component
if (intent.type === 'findRecipe') {
  const recipes = await sqliteService.getRecipesByCuisine(intent.cuisine);
  // Show results...
}
```

#### 4. **New Component**
```svelte
<!-- src/lib/components/RecipeCard.svelte -->
<script>
  export let recipe: Recipe;
  export let onEdit: (recipe: Recipe) => void;
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h3 class="card-title">{recipe.name}</h3>
    <p class="text-sm opacity-70">{recipe.cuisine}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" on:click={() => onEdit(recipe)}>
        Edit
      </button>
    </div>
  </div>
</div>
```

### Platform-Specific Code
```typescript
// Always check platform first
import { isMobilePlatform } from '$lib/utils/platform';

if (isMobilePlatform()) {
  // Mobile-specific code
  const { Camera } = await import('@capacitor/camera');
  const photo = await Camera.getPhoto(options);
} else {
  // Web fallback
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();
}
```

---

## 🔧 Configuration Files

### `svelte.config.js` - SvelteKit Configuration
```javascript
export default {
  preprocess: [vitePreprocess(), preprocessMeltUI()],
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: 'index.html'  // SPA fallback for PWA
    }),
    paths: { base: '' }  // GitHub Pages deployment
  }
};
```

### `capacitor.config.ts` - Mobile Configuration
```typescript
export const config: CapacitorConfig = {
  appId: 'com.gurukuladesam.homemanagementsuite',
  appName: 'Home Management Suite',
  webDir: 'dist',
  plugins: {
    SQLite: { iosIsEncryption: false, androidIsEncryption: false },
    FirebaseCrashlytics: { enabled: true }
  }
};
```

### `tailwind.config.js` - Styling Configuration
```javascript
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: { extend: {} },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']  // Available themes
  }
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Storage Not Working**
```bash
# Check if service is initialized
console.log('SQLite initialized:', sqliteService.isInitialized);

# Web: Check localStorage
localStorage.getItem('divine_nest_db');

# Mobile: Check Capacitor permissions
```

#### 2. **Voice Recognition Not Working**
```javascript
// Check browser support
if ('webkitSpeechRecognition' in window) {
  // Safari/Chrome support
} else if ('SpeechRecognition' in window) {
  // Firefox support
} else {
  // Fallback to text input
}
```

#### 3. **PWA Not Installing**
- Check `manifest.webmanifest` is served correctly
- Verify HTTPS (required for PWA)
- Check service worker registration
- Use Lighthouse PWA audit

#### 4. **Android Build Fails**
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android:build

# Check Java version
java -version  # Should be 11+

# Check Android SDK
echo $ANDROID_HOME
```

#### 5. **i18n Not Loading**
```javascript
// Check locale is set
import { locale } from 'svelte-i18n';
console.log('Current locale:', get(locale));

// Force reload translations
locale.set('en');
```

---

## 📚 Additional Resources

### Key Files to Study
- `src/lib/services/sqliteService.ts` - Storage abstraction
- `src/lib/components/DesktopLayout.svelte` - Layout patterns
- `src/lib/voice/intentParser.ts` - Voice command processing
- `src/lib/stores/userProfile.ts` - State management
- `src/routes/+layout.svelte` - App initialization

### External Documentation
- [SvelteKit Docs](https://kit.svelte.dev/)
- [Capacitor Docs](https://capacitorjs.com/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Tailwind CSS](https://tailwindcss.com/)

### Development Tips
- Use `console.log()` extensively for debugging
- Test on both web and mobile platforms
- Voice commands work best in quiet environments
- PWA features require HTTPS in production
- Android builds are slower - use web dev for rapid iteration

---

## 🎯 Development Workflow Summary

1. **Setup**: Clone, install, run dev server
2. **Develop**: Add features using established patterns
3. **Test**: Manual testing on web + mobile
4. **Build**: `npm run build` for web, `npm run android:build` for mobile
5. **Deploy**: GitHub Pages (web), APK distribution (mobile)

**Remember**: This is a family management app for South Indian households. Features should respect cultural traditions while providing modern convenience. Voice commands should support both Tamil and English. Data should work offline-first with optional cloud sync.

For questions or clarifications, check existing code patterns first, then ask in issues!
