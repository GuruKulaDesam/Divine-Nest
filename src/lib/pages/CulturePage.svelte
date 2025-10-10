<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  function navigateBack() {
    goto("/");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="text-center flex-1">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">📘 Culture</h1>
        <p class="text-lg text-gray-600">Cultural Guide for Modern Children</p>
      </div>
      <button on:click={navigateBack} class="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
        <Icon icon="heroicons:arrow-left" class="w-5 h-5 mr-2 inline" />
        Back to Home
      </button>
    </div>

    <!-- Main Title Card -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 mb-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">📘 Living the South Indian Culture</h2>
        <p class="text-xl text-gray-600 mb-4">A Comprehensive Guide for Children (10–20 years)</p>
        <p class="text-lg text-amber-700 italic">Rooted in Tamil tradition, Panchangam rhythm, and ancestral wisdom</p>
      </div>
    </div>

    <!-- Comprehensive Guide Link -->
    <div class="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">📚</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">தமிழ் வாழ்வியல் வழிகாட்டி</h2>
        <p class="text-xl text-gray-700 mb-6">Complete Tamil Lifestyle Guide for Children</p>
        <p class="text-lg text-amber-800 mb-8 italic">7 comprehensive parts covering time management, rituals, family roles, festivals, spiritual wisdom, cultural lifestyle, and practical tools</p>
        <button on:click={() => goto("/wisdom/lifestyle-guide")} class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:book-open" class="w-6 h-6" />
          <span>Read the Complete Guide</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Daily Voice Guide Link -->
    <div class="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">🎙️</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">தினசரி ஒலி வழிகாட்டி</h2>
        <p class="text-xl text-gray-700 mb-6">30-Day Voice Journey with Shivo</p>
        <p class="text-lg text-purple-800 mb-8 italic">Daily Tamil wisdom spoken in the loving voices of Paati, Amma, Appa, and your inner child—each day brings one lesson, one reflection, and one practice</p>
        <button on:click={() => goto("/wisdom/daily-voice-guide")} class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:microphone" class="w-6 h-6" />
          <span>Start the Voice Journey</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- 25 Things to Remember Link -->
    <div class="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-indigo-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">📜</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">25 நினைவில் வைக்க வேண்டியவை</h2>
        <p class="text-xl text-gray-700 mb-6">25 Things to Remember</p>
        <p class="text-lg text-indigo-800 mb-8 italic">"தமிழராக ஒழுக்கமாக வாழ 25 தவிர்க்க வேண்டிய செயல்கள்"—இவை பாட்டி, அப்பா, அம்மா, மற்றும் சித்தர்கள் சொல்லும் நெறி வழிகள்</p>
        <button on:click={() => goto("/wisdom/things-to-remember")} class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:light-bulb" class="w-6 h-6" />
          <span>Read the Wisdom</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- 25 Things to Follow Link -->
    <div class="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">25 செய்யவேண்டியவை</h2>
        <p class="text-xl text-gray-700 mb-6">25 Things to Follow</p>
        <p class="text-lg text-green-800 mb-8 italic">"தமிழராக ஒழுக்கமாக வாழ 25 செய்யவேண்டிய செயல்கள்"—இவை தமிழர் வாழ்வியல், ஆன்மீக நெறி, குடும்ப பாசம், இயற்கை மரியாதை, மற்றும் பண்பாட்டு ஒழுக்கம் ஆகியவற்றின் அடித்தளமாக அமைந்தவை</p>
        <button on:click={() => goto("/wisdom/things-to-follow")} class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:check-circle" class="w-6 h-6" />
          <span>Follow the Path</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- 25 Places to Visit Link -->
    <div class="bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">🗺️</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">25 செல்லவேண்டிய இடங்கள்</h2>
        <p class="text-xl text-gray-700 mb-6">25 Places to Visit</p>
        <p class="text-lg text-cyan-800 mb-8 italic">"தமிழராக வாழும் ஒவ்வொருவரும் வாழ்நாளில் குறைந்தது ஒருமுறை சென்று காணவேண்டிய 25 இடங்கள்"—இவை ஆன்மீக புனிதங்கள், வரலாறு, கலை, இயற்கை, மற்றும் சித்தர் வழியின் உச்சங்கள்</p>
        <button on:click={() => goto("/wisdom/places-to-visit")} class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:map" class="w-6 h-6" />
          <span>Explore the Places</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- 25 Ways to Live Link -->
    <div class="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-200 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <div class="text-6xl mb-4">💰</div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">25 வழிகள் வாழ</h2>
        <p class="text-xl text-gray-700 mb-6">25 Ways to Live</p>
        <p class="text-lg text-emerald-800 mb-8 italic">"தமிழ் வாழ்வியலை பின்பற்றும் 25 விதமான வாழ்க்கை முறைகள்"—இவை ஒவ்வொன்றும் தனித்துவமான நடை, ஆனால் தமிழின் நெறி, பாசம், ஆன்மீகம், பண்பாடு, இயற்கை மரியாதை ஆகியவற்றை உள்ளடக்கியது.</p>
        <button on:click={() => goto("/wisdom/ways-to-live")} class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3">
          <Icon icon="heroicons:banknotes" class="w-6 h-6" />
          <span>Explore Ways to Live</span>
          <Icon icon="heroicons:arrow-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Part 1: Living Rhythmically -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:clock" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 1: LIVING RHYTHMICALLY — THE SOUTH INDIAN CLOCK</h3>
      </div>

      <p class="text-gray-700 mb-4">South Indian life is not linear—it's <strong>cyclical</strong>, guided by:</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold text-blue-800 mb-2">Kaalam (காலம்)</h4>
          <p class="text-sm text-blue-700">Morning (பகல்), Noon (மதியம்), Evening (மாலை), Night (இரவு)</p>
        </div>
        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold text-purple-800 mb-2">Panchangam</h4>
          <p class="text-sm text-purple-700">Tithi (lunar day), Nakshatra (star), Yogam, Karanam, Rahu Kalam, Yamagandam</p>
        </div>
        <div class="bg-green-50 rounded-xl p-4">
          <h4 class="font-semibold text-green-800 mb-2">Seasonal Shifts</h4>
          <p class="text-sm text-green-700">Aadi rains, Margazhi chill, Chithirai bloom</p>
        </div>
      </div>

      <div class="bg-amber-50 rounded-xl p-4">
        <h4 class="font-semibold text-amber-800 mb-2">Children Learn:</h4>
        <ul class="text-sm text-amber-700 space-y-1">
          <li>• To wake before sunrise (Brahma Muhurtham)</li>
          <li>• To avoid key tasks during Rahu Kalam</li>
          <li>• To align study, play, and rest with cosmic timing</li>
        </ul>
      </div>
    </div>

    <!-- Part 2: Daily Rituals -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 2: DAILY RITUALS — EMBODYING TRADITION</h3>
      </div>

      <div class="overflow-x-auto mb-4">
        <table class="w-full bg-white/50 rounded-xl overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-gray-800">Time</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-800">Rituals & Practices</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-orange-800">Morning</td>
              <td class="px-4 py-3 text-gray-700">Oil bath (சீமை எண்ணெய்), kolam, prayer, sloka</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-orange-800">Noon</td>
              <td class="px-4 py-3 text-gray-700">Sattvic lunch, rest, quiet time</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-orange-800">Evening</td>
              <td class="px-4 py-3 text-gray-700">Lamp lighting, bhajans, temple visit</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-orange-800">Night</td>
              <td class="px-4 py-3 text-gray-700">Gratitude, storytime, sleep hygiene</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-orange-50 rounded-xl p-4">
        <h4 class="font-semibold text-orange-800 mb-2">Children Learn:</h4>
        <ul class="text-sm text-orange-700 space-y-1">
          <li>• To chant simple slokas (e.g. "Karagre Vasate Lakshmi…")</li>
          <li>• To help with kolam and lamp lighting</li>
          <li>• To respect food as prasad, not just nutrition</li>
        </ul>
      </div>
    </div>

    <!-- Part 3: Role-Aware Responsibility -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:user-group" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 3: ROLE-AWARE RESPONSIBILITY</h3>
      </div>

      <p class="text-gray-700 mb-4">South Indian homes are <strong>role-aware</strong>, not hierarchical. Children learn:</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold text-purple-800 mb-2">Respect for Elders</h4>
          <p class="text-sm text-purple-700">Touching feet, using "Neenga", "Ungal"</p>
        </div>
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold text-blue-800 mb-2">Responsibility by Age</h4>
          <p class="text-sm text-blue-700">Helping Paati with pooja, Appa with errands</p>
        </div>
        <div class="bg-pink-50 rounded-xl p-4">
          <h4 class="font-semibold text-pink-800 mb-2">Gender Balance</h4>
          <p class="text-sm text-pink-700">Boys learn cooking, girls learn budgeting</p>
        </div>
      </div>

      <div class="bg-purple-50 rounded-xl p-4">
        <h4 class="font-semibold text-purple-800 mb-2">They're Taught:</h4>
        <ul class="text-sm text-purple-700 space-y-1">
          <li>• To serve water before meals</li>
          <li>• To sit with elders during temple rituals</li>
          <li>• To observe silence during sandhya time</li>
        </ul>
      </div>
    </div>

    <!-- Part 4: Festivals as Teachers -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:fire" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 4: FESTIVALS AS TEACHERS</h3>
      </div>

      <p class="text-gray-700 mb-4">Each festival is a <strong>lesson in values</strong>:</p>

      <div class="overflow-x-auto mb-4">
        <table class="w-full bg-white/50 rounded-xl overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-gray-800">Festival</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-800">Value Taught</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-800">Child's Role</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-amber-800">Pongal</td>
              <td class="px-4 py-3 text-gray-700">Gratitude to nature</td>
              <td class="px-4 py-3 text-gray-700">Decorate pot, chant "Pongalo Pongal!"</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-amber-800">Navaratri</td>
              <td class="px-4 py-3 text-gray-700">Feminine strength, devotion</td>
              <td class="px-4 py-3 text-gray-700">Arrange golu, sing bhajans</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-amber-800">Karthigai</td>
              <td class="px-4 py-3 text-gray-700">Light over darkness</td>
              <td class="px-4 py-3 text-gray-700">Light lamps, help with pori urundai</td>
            </tr>
            <tr class="border-t border-gray-200">
              <td class="px-4 py-3 font-medium text-amber-800">Deepavali</td>
              <td class="px-4 py-3 text-gray-700">Renewal, joy</td>
              <td class="px-4 py-3 text-gray-700">Wake early, oil bath, burst crackers mindfully</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-amber-50 rounded-xl p-4">
        <h4 class="font-semibold text-amber-800 mb-2">Children Learn:</h4>
        <ul class="text-sm text-amber-700 space-y-1">
          <li>• Why we fast on Ekadashi</li>
          <li>• Why we avoid cutting nails on Amavasya</li>
          <li>• How to prepare prasadam with intention</li>
        </ul>
      </div>
    </div>

    <!-- Part 5: Emotional & Spiritual Intelligence -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:heart" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 5: EMOTIONAL & SPIRITUAL INTELLIGENCE</h3>
      </div>

      <p class="text-gray-700 mb-4">South Indian tradition teaches:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-pink-50 rounded-xl p-4">
          <h4 class="font-semibold text-pink-800 mb-2">Values</h4>
          <p class="text-sm text-pink-700">Sahana (patience), Shraddha (faith), Bhakti (devotion)</p>
        </div>
        <div class="bg-indigo-50 rounded-xl p-4">
          <h4 class="font-semibold text-indigo-800 mb-2">Emotional Regulation</h4>
          <p class="text-sm text-indigo-700">Through music, prayer, silence</p>
        </div>
      </div>

      <div class="bg-pink-50 rounded-xl p-4">
        <h4 class="font-semibold text-pink-800 mb-2">Children Practice:</h4>
        <ul class="text-sm text-pink-700 space-y-1">
          <li>• Journaling gratitude in Tamil</li>
          <li>• Listening to veena or flute during study</li>
          <li>• Asking "What would Paati do?" in moments of doubt</li>
        </ul>
      </div>
    </div>

    <!-- Part 6: Stories of the Old Generation -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:book-open" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 6: STORIES OF THE OLD GENERATION</h3>
      </div>

      <p class="text-gray-700 mb-4">Children read and reflect on:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="bg-green-50 rounded-xl p-4 text-center">
          <h4 class="font-semibold text-green-800 mb-2">Thiruvalluvar</h4>
          <p class="text-sm text-green-700">Ethics, clarity, brevity</p>
        </div>
        <div class="bg-blue-50 rounded-xl p-4 text-center">
          <h4 class="font-semibold text-blue-800 mb-2">Avvaiyar</h4>
          <p class="text-sm text-blue-700">Wisdom, humility, playfulness</p>
        </div>
        <div class="bg-purple-50 rounded-xl p-4 text-center">
          <h4 class="font-semibold text-purple-800 mb-2">Kamarajar</h4>
          <p class="text-sm text-purple-700">Simplicity, service, leadership</p>
        </div>
        <div class="bg-orange-50 rounded-xl p-4 text-center">
          <h4 class="font-semibold text-orange-800 mb-2">Homemakers</h4>
          <p class="text-sm text-orange-700">Amma's budgeting, Paati's rituals, Thatha's discipline</p>
        </div>
      </div>

      <div class="bg-green-50 rounded-xl p-4">
        <h4 class="font-semibold text-green-800 mb-2">They Learn:</h4>
        <ul class="text-sm text-green-700 space-y-1">
          <li>• That greatness is in daily choices</li>
          <li>• That tradition is not rigidity—it's rhythm</li>
          <li>• That Tamil life is lived, not memorized</li>
        </ul>
      </div>
    </div>

    <!-- Part 7: Practical Tools -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
          <Icon icon="heroicons:wrench-screwdriver" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-800">PART 7: PRACTICAL TOOLS</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="flex items-center space-x-3 bg-white/50 rounded-xl p-4">
            <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-blue-500" />
            <div>
              <h4 class="font-medium text-gray-800">Tamil Calendar</h4>
              <p class="text-sm text-gray-600">With stickers for tithi, festivals</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 bg-white/50 rounded-xl p-4">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 text-orange-500" />
            <div>
              <h4 class="font-medium text-gray-800">Sloka Cards</h4>
              <p class="text-sm text-gray-600">With meaning and melody</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 bg-white/50 rounded-xl p-4">
            <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-500" />
            <div>
              <h4 class="font-medium text-gray-800">Emotional Check-in Chart</h4>
              <p class="text-sm text-gray-600">"I feel… I will…"</p>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center space-x-3 bg-white/50 rounded-xl p-4">
            <Icon icon="heroicons:pencil-square" class="w-8 h-8 text-purple-500" />
            <div>
              <h4 class="font-medium text-gray-800">Weekly Reflection Journal</h4>
              <p class="text-sm text-gray-600">"What did I learn from Appa this week?"</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 bg-white/50 rounded-xl p-4">
            <Icon icon="heroicons:microphone" class="w-8 h-8 text-indigo-500" />
            <div>
              <h4 class="font-medium text-gray-800">Voice Assistant (Shivo)</h4>
              <p class="text-sm text-gray-600">Explains rituals in Tamil-English</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tamil Version Header -->
    <div class="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 shadow-lg border border-orange-200/50 mb-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-orange-800 mb-2">தென்னிந்தியத் தமிழர் வாழ்க்கை முறையை முழுமையாக விளக்கும் ஒரு விரிவான வழிகாட்டி</h2>
        <p class="text-orange-700">10 வயதிற்கும் மேற்பட்ட குழந்தைகள் 20-வயதிற்கு செல்லும் வரை தமிழ் மரபு, பஞ்சாங்கம், குடும்பப் பண்பாடு, ஆன்மீக ஒழுக்கம் ஆகியவற்றை முழுமையாக அறிந்து வாழக் கற்றுக்கொள்ளும் வகையில்.</p>
      </div>
    </div>

    <!-- Tamil Version Content -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-6">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">📘 தமிழ் வாழ்க்கை வழிகாட்டி</h2>
        <p class="text-lg text-gray-600">10 வயதிற்கும் மேற்பட்ட குழந்தைகளுக்கான முழுமையான தமிழில் வழிகாட்டி</p>
        <p class="text-sm text-amber-700 italic">பஞ்சாங்க ரீதியான ஒழுக்கம், குடும்ப மரபுகள், ஆன்மீக நெறிகள்</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold text-blue-800 mb-2">🧭 பகுதி 1: கால ஒழுக்கம்</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• காலங்கள்: காலை, மதியம், மாலை, இரவு</li>
            <li>• பஞ்சாங்கம்: திதி, நட்சத்திரம், யோகம், கரணம்</li>
            <li>• பிரதிநாள் ஒழுக்கம்</li>
          </ul>
        </div>

        <div class="bg-orange-50 rounded-xl p-4">
          <h4 class="font-semibold text-orange-800 mb-2">📿 பகுதி 2: தினசரி வழிபாடுகள்</h4>
          <ul class="text-sm text-orange-700 space-y-1">
            <li>• காலை: எண்ணெய் குளியல், கோலம், ச்லோகா</li>
            <li>• மதியம்: சத்துவ உணவு, ஓய்வு</li>
            <li>• மாலை: விளக்கு ஏற்றுதல், பஜனை</li>
            <li>• இரவு: நன்றி கூறுதல், கதைகள்</li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold text-purple-800 mb-2">🧒 பகுதி 3: குடும்பத்தில் பங்கு</h4>
          <ul class="text-sm text-purple-700 space-y-1">
            <li>• மூத்தோருக்கு மரியாதை</li>
            <li>• பொறுப்பு: பூஜை, வேலைகள்</li>
            <li>• பாலின சமநிலை</li>
          </ul>
        </div>

        <div class="bg-amber-50 rounded-xl p-4">
          <h4 class="font-semibold text-amber-800 mb-2">🪔 பகுதி 4: திருவிழாக்கள்</h4>
          <ul class="text-sm text-amber-700 space-y-1">
            <li>• பொங்கல்: இயற்கைக்கு நன்றி</li>
            <li>• நவராத்திரி: பெண்களின் வலிமை</li>
            <li>• கார்த்திகை: ஒளி, சுத்தம்</li>
            <li>• தீபாவளி: புதுமை, மகிழ்ச்சி</li>
          </ul>
        </div>

        <div class="bg-pink-50 rounded-xl p-4">
          <h4 class="font-semibold text-pink-800 mb-2">🧘 பகுதி 5: உணர்ச்சி நுண்ணறிவு</h4>
          <ul class="text-sm text-pink-700 space-y-1">
            <li>• சஹனம், ஸ்ரத்தா, பக்தி</li>
            <li>• பஜனை, ச்லோகா, அமைதி</li>
            <li>• தமிழ் மொழி மூலம் அன்பு</li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-xl p-4">
          <h4 class="font-semibold text-green-800 mb-2">📖 பகுதி 6: பழமையான தமிழர்கள்</h4>
          <ul class="text-sm text-green-700 space-y-1">
            <li>• திருவள்ளுவர்: ஒழுக்கம்</li>
            <li>• அவ்வையார்: ஞானம், பணிவு</li>
            <li>• காமராஜர்: எளிமை, சேவை</li>
            <li>• பாட்டி, அம்மா, அப்பா</li>
          </ul>
        </div>

        <div class="bg-teal-50 rounded-xl p-4 md:col-span-2">
          <h4 class="font-semibold text-teal-800 mb-2">🛠️ பகுதி 7: நடைமுறை கருவிகள்</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="text-sm text-teal-700">
              <strong>🗓️ தமிழ் நாட்காட்டி</strong><br />
              திதி, நட்சத்திரம், திருவிழா
            </div>
            <div class="text-sm text-teal-700">
              <strong>📿 ச்லோகா அட்டைகள்</strong><br />
              பாடும் முறையுடன்
            </div>
            <div class="text-sm text-teal-700">
              <strong>🎙️ "சிவோ" உதவியாளர்</strong><br />
              தினசரி ஒரு பாடம் சொல்லும்
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
