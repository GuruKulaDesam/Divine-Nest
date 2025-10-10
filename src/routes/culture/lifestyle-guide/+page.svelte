<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  function navigateBack() {
    goto("/wisdom");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="text-center flex-1">
        <h1 class="text-5xl font-bold text-gray-800 mb-2">📘 தமிழ் வாழ்வியல் வழிகாட்டி</h1>
        <p class="text-xl text-gray-600">விரிவான வடிவம் – 10 வயதிற்கும் மேற்பட்ட குழந்தைகளுக்கான முழுமையான வழிகாட்டி</p>
        <p class="text-lg text-amber-700 italic mt-2">பழமையான தமிழர் வாழ்க்கை, பஞ்சாங்க ஒழுக்கம், குடும்ப பங்கு, ஆன்மீக நுண்ணறிவு</p>
      </div>
      <button on:click={navigateBack} class="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 transform hover:scale-105">
        <Icon icon="heroicons:arrow-left" class="w-5 h-5 mr-2 inline" />
        Back to Wisdom
      </button>
    </div>

    <!-- Introduction Card -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">வணக்கம்! Welcome to the Tamil Way of Life</h2>
        <p class="text-lg text-gray-700 mb-4">This comprehensive guide is designed for children aged 10–20 years to understand and embrace the beautiful traditions of Tamil culture, family values, and spiritual wisdom that have sustained our ancestors for generations.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4">
            <Icon icon="heroicons:clock" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 class="font-semibold text-blue-800">Time Management</h3>
            <p class="text-sm text-blue-700">Living in harmony with cosmic rhythms</p>
          </div>
          <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4">
            <Icon icon="heroicons:users" class="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 class="font-semibold text-green-800">Family Roles</h3>
            <p class="text-sm text-green-700">Understanding responsibilities and contributions</p>
          </div>
          <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 class="font-semibold text-purple-800">Spiritual Wisdom</h3>
            <p class="text-sm text-purple-700">Inner peace and emotional intelligence</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Part 1: Time Management -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:clock" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">🧭 பகுதி 1: கால ஒழுக்கம் – தமிழர் நேரக் கட்டமைப்பு</h2>
          <p class="text-lg text-gray-600">Time Discipline – The Tamil Time Structure</p>
        </div>
      </div>

      <p class="text-gray-700 mb-6 text-lg">தமிழ் வாழ்க்கை முறையில் ஒரு நாள் நான்கு முக்கியமான காலங்களாகப் பிரிக்கப்படுகிறது:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 border border-orange-200">
          <h3 class="text-xl font-bold text-orange-800 mb-3">🌅 காலை (பகல்)</h3>
          <p class="text-orange-700 mb-2">Morning (Brahma Muhurtham)</p>
          <ul class="text-sm text-orange-600 space-y-1">
            <li>• எழுதல், எண்ணெய் குளியல்</li>
            <li>• கோலம், ச்லோகா, பூஜை</li>
            <li>• 4:30–6:00 AM</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <h3 class="text-xl font-bold text-green-800 mb-3">☀️ மதியம்</h3>
          <p class="text-green-700 mb-2">Noon (Sattvic Time)</p>
          <ul class="text-sm text-green-600 space-y-1">
            <li>• சத்துவ உணவு, ஓய்வு</li>
            <li>• அமைதி, சிந்தனை</li>
            <li>• மதிய சாப்பாடு</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border border-purple-200">
          <h3 class="text-xl font-bold text-purple-800 mb-3">🌇 மாலை (சந்தியா)</h3>
          <p class="text-purple-700 mb-2">Evening (Sandhya)</p>
          <ul class="text-sm text-purple-600 space-y-1">
            <li>• விளக்கு ஏற்றுதல்</li>
            <li>• பஜனை, கோயில் செல்லுதல்</li>
            <li>• 6:00–6:30 PM</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-6 border border-indigo-200">
          <h3 class="text-xl font-bold text-indigo-800 mb-3">🌙 இரவு</h3>
          <p class="text-indigo-700 mb-2">Night (Contemplation)</p>
          <ul class="text-sm text-indigo-600 space-y-1">
            <li>• சிந்தனை, நன்றி</li>
            <li>• தூக்க ஒழுக்கம்</li>
            <li>• கதைகள், அமைதி</li>
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-6 border border-amber-200">
        <h3 class="text-xl font-bold text-amber-800 mb-4">📅 பஞ்சாங்கம் – Panchangam</h3>
        <p class="text-amber-700 mb-4">பஞ்சாங்கம் என்பது தமிழர் காலக் கணிப்பின் அடிப்படை. இது ஐந்து கூறுகளைக் கொண்டது:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="text-center">
            <div class="text-2xl mb-2">🌙</div>
            <div class="font-semibold text-amber-800">திதி</div>
            <div class="text-sm text-amber-600">Tithi (Lunar day)</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">⭐</div>
            <div class="font-semibold text-amber-800">நட்சத்திரம்</div>
            <div class="text-sm text-amber-600">Nakshatra (Star)</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">⚡</div>
            <div class="font-semibold text-amber-800">யோகம்</div>
            <div class="text-sm text-amber-600">Yogam (Energy)</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🔮</div>
            <div class="font-semibold text-amber-800">கரணம்</div>
            <div class="text-sm text-amber-600">Karanam (Action)</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">👻</div>
            <div class="font-semibold text-amber-800">ராகு காலம்</div>
            <div class="text-sm text-amber-600">Rahu Kalam</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Part 2: Daily Rituals -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:sparkles" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">📿 பகுதி 2: தினசரி வழிபாடுகள் – ஒழுக்கமும் ஒளியும்</h2>
          <p class="text-lg text-gray-600">Daily Rituals – Discipline and Light</p>
        </div>
      </div>

      <div class="overflow-x-auto mb-6">
        <table class="w-full bg-white/60 rounded-2xl overflow-hidden shadow-lg">
          <thead class="bg-gradient-to-r from-orange-200 to-red-200">
            <tr>
              <th class="px-6 py-4 text-left font-bold text-gray-800">நேரம் / Time</th>
              <th class="px-6 py-4 text-left font-bold text-gray-800">வழிபாடுகள் / Rituals</th>
              <th class="px-6 py-4 text-left font-bold text-gray-800">பங்கு / Role</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-orange-200 hover:bg-orange-50 transition-colors">
              <td class="px-6 py-4 font-bold text-orange-800">🌅 காலை / Morning</td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-2">
                  <div><strong>ப்ரம்ம முகூர்த்தம்:</strong> எழுதல், மன அமைதி</div>
                  <div><strong>எண்ணெய் குளியல்:</strong> சீமை எண்ணெய், நெல்லிக்காய்</div>
                  <div><strong>கோலம்:</strong> அரிசி மாவு, பூக்கள்</div>
                  <div><strong>ச்லோகா:</strong> கணபதி, லக்ஷ்மி, சரஸ்வதி</div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-1">
                  <div><strong>பாட்டி:</strong> பூஜை தயார், பஞ்சாங்கம்</div>
                  <div><strong>குழந்தைகள்:</strong> உதவி, கற்றல்</div>
                </div>
              </td>
            </tr>
            <tr class="border-t border-green-200 hover:bg-green-50 transition-colors">
              <td class="px-6 py-4 font-bold text-green-800">☀️ மதியம் / Noon</td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-2">
                  <div><strong>சத்துவ உணவு:</strong> இட்லி, சாம்பார், ரசம்</div>
                  <div><strong>ஓய்வு:</strong> சிறிது அமைதியான நேரம்</div>
                  <div><strong>சிந்தனை:</strong> "இன்று என்ன கற்றேன்?"</div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-1">
                  <div><strong>அம்மா:</strong> சமைத்தல்</div>
                  <div><strong>குடும்பம்:</strong> ஒன்றாக உண்ணுதல்</div>
                </div>
              </td>
            </tr>
            <tr class="border-t border-purple-200 hover:bg-purple-50 transition-colors">
              <td class="px-6 py-4 font-bold text-purple-800">🌇 மாலை / Evening</td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-2">
                  <div><strong>விளக்கு ஏற்றுதல்:</strong> சந்தியா நேரம்</div>
                  <div><strong>பஜனை:</strong> "கண்ணா கண்ணா", வீணை</div>
                  <div><strong>கோயில் செல்லுதல்:</strong> பூ வைத்தல்</div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-1">
                  <div><strong>அப்பா:</strong> விளக்கு, பஜனை</div>
                  <div><strong>குழந்தைகள்:</strong> பாடுதல், உதவுதல்</div>
                </div>
              </td>
            </tr>
            <tr class="border-t border-indigo-200 hover:bg-indigo-50 transition-colors">
              <td class="px-6 py-4 font-bold text-indigo-800">🌙 இரவு / Night</td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-2">
                  <div><strong>நன்றி:</strong> "அம்மா சமைத்த உணவுக்கு நன்றி"</div>
                  <div><strong>கதைகள்:</strong> அவ்வையார், கண்ணன்</div>
                  <div><strong>தூக்க ஒழுக்கம்:</strong> 9:00–9:30 PM</div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">
                <div class="space-y-1">
                  <div><strong>பாட்டி:</strong> கதை சொல்லல்</div>
                  <div><strong>குழந்தைகள்:</strong> சிந்தித்தல், நன்றி</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Part 3: Family Roles -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:users" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">👨‍👩‍👧‍👦 பகுதி 3: குடும்ப பங்கு மற்றும் பொறுப்பு</h2>
          <p class="text-lg text-gray-600">Family Roles and Responsibilities</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 border border-pink-200">
          <div class="text-center mb-4">
            <div class="text-4xl mb-2">👩</div>
            <h3 class="text-xl font-bold text-pink-800">பாட்டி / Grandmother</h3>
          </div>
          <ul class="text-sm text-pink-700 space-y-2">
            <li><strong>பஞ்சாங்கம் பார்ப்பது</strong></li>
            <li><strong>விரதம் மற்றும் பூஜை</strong></li>
            <li><strong>பசுமை உணவுகள்</strong></li>
            <li><strong>கதை சொல்லல்</strong></li>
          </ul>
          <p class="text-xs text-pink-600 mt-3 italic">"நேரக் கணிப்பாளர் – அவர் வழிகாட்டும் நேரத்தில் குடும்பம் இயங்கும்"</p>
        </div>

        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
          <div class="text-center mb-4">
            <div class="text-4xl mb-2">👩‍🍳</div>
            <h3 class="text-xl font-bold text-blue-800">அம்மா / Mother</h3>
          </div>
          <ul class="text-sm text-blue-700 space-y-2">
            <li><strong>சமையல்</strong></li>
            <li><strong>சுத்தம்</strong></li>
            <li><strong>குழந்தை பராமரிப்பு</strong></li>
            <li><strong>திருவிழா ஏற்பாடு</strong></li>
          </ul>
          <p class="text-xs text-blue-600 mt-3 italic">"பசுமை நெறியாளர் – உணவிலும் ஒழுக்கத்திலும் வழிநடத்துகிறார்"</p>
        </div>

        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <div class="text-center mb-4">
            <div class="text-4xl mb-2">👨</div>
            <h3 class="text-xl font-bold text-green-800">அப்பா / Father</h3>
          </div>
          <ul class="text-sm text-green-700 space-y-2">
            <li><strong>வேலை மற்றும் பொறுப்பு</strong></li>
            <li><strong>ஆன்மீக வழிகாட்டி</strong></li>
            <li><strong>நேர ஒழுக்கம்</strong></li>
            <li><strong>பாட்டிக்கு உதவுதல்</strong></li>
          </ul>
          <p class="text-xs text-green-600 mt-3 italic">"ஒழுக்க நெறியாளர் – நேரம், பணம், ஆன்மீகம் சமநிலைப்படுத்துகிறார்"</p>
        </div>

        <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border border-purple-200">
          <div class="text-center mb-4">
            <div class="text-4xl mb-2">🧒</div>
            <h3 class="text-xl font-bold text-purple-800">குழந்தைகள் / Children</h3>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-purple-800">10–13 வயது:</h4>
              <ul class="text-xs text-purple-700 space-y-1">
                <li>• கோலம் போட உதவுதல்</li>
                <li>• ச்லோகா கற்றல்</li>
                <li>• "நன்றி" சொல்லும் பழக்கம்</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-purple-800">14–17 வயது:</h4>
              <ul class="text-xs text-purple-700 space-y-1">
                <li>• பஜனை பாடுதல்</li>
                <li>• சமையலில் உதவுதல்</li>
                <li>• சிந்தனை பழக்கம்</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-purple-800">18–20 வயது:</h4>
              <ul class="text-xs text-purple-700 space-y-1">
                <li>• குடும்ப திட்டமிடல்</li>
                <li>• ஆன்மீக சிந்தனைகள்</li>
                <li>• பாரம்பரிய வாரிசு</li>
              </ul>
            </div>
          </div>
          <p class="text-xs text-purple-600 mt-3 italic">"பாரம்பரிய வாரிசுகள் – பழமையை உணர்ந்து புதிய தலைமுறைக்கு வழிகாட்ட வேண்டும்"</p>
        </div>
      </div>

      <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-6 border border-indigo-200">
        <h3 class="text-xl font-bold text-indigo-800 mb-4">📋 குடும்ப ஒழுக்க அட்டவணை</h3>
        <div class="overflow-x-auto">
          <table class="w-full bg-white/60 rounded-xl overflow-hidden">
            <thead class="bg-indigo-200">
              <tr>
                <th class="px-4 py-3 text-left font-bold text-indigo-800">நாள்</th>
                <th class="px-4 py-3 text-left font-bold text-indigo-800">பாட்டி</th>
                <th class="px-4 py-3 text-left font-bold text-indigo-800">அம்மா</th>
                <th class="px-4 py-3 text-left font-bold text-indigo-800">அப்பா</th>
                <th class="px-4 py-3 text-left font-bold text-indigo-800">குழந்தை</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-indigo-200">
                <td class="px-4 py-3 font-semibold text-indigo-800">திங்கள்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பஞ்சாங்கம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சமைத்தல்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">வேலை</td>
                <td class="px-4 py-3 text-sm text-indigo-700">கோலம்</td>
              </tr>
              <tr class="border-t border-indigo-200 bg-indigo-50/50">
                <td class="px-4 py-3 font-semibold text-indigo-800">செவ்வாய்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">விரதம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சுத்தம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பஜனை</td>
                <td class="px-4 py-3 text-sm text-indigo-700">ச்லோகா</td>
              </tr>
              <tr class="border-t border-indigo-200">
                <td class="px-4 py-3 font-semibold text-indigo-800">புதன்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">கதை சொல்லல்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சமையல்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">கோயில்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பஜனை</td>
              </tr>
              <tr class="border-t border-indigo-200 bg-indigo-50/50">
                <td class="px-4 py-3 font-semibold text-indigo-800">வியாழன்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பூஜை</td>
                <td class="px-4 py-3 text-sm text-indigo-700">திருவிழா தயார்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">வேலை</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பாட்டிக்கு உதவி</td>
              </tr>
              <tr class="border-t border-indigo-200">
                <td class="px-4 py-3 font-semibold text-indigo-800">வெள்ளி</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பசுமை உணவு</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சுத்தம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பஜனை</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சிந்தனை</td>
              </tr>
              <tr class="border-t border-indigo-200 bg-indigo-50/50">
                <td class="px-4 py-3 font-semibold text-indigo-800">சனி</td>
                <td class="px-4 py-3 text-sm text-indigo-700">அமாவாசை/பௌர்ணமி</td>
                <td class="px-4 py-3 text-sm text-indigo-700">சுத்தம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">கோயில்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">பஞ்சாங்கம் பார்ப்பு</td>
              </tr>
              <tr class="border-t border-indigo-200">
                <td class="px-4 py-3 font-semibold text-indigo-800">ஞாயிறு</td>
                <td class="px-4 py-3 text-sm text-indigo-700">ஓய்வு</td>
                <td class="px-4 py-3 text-sm text-indigo-700">குடும்ப உணவு</td>
                <td class="px-4 py-3 text-sm text-indigo-700">குடும்ப திட்டம்</td>
                <td class="px-4 py-3 text-sm text-indigo-700">"நன்றி"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Part 4: Festivals -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:cake" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">🪔 பகுதி 4: திருவிழாக்கள் – வாழ்வின் பாடங்கள்</h2>
          <p class="text-lg text-gray-600">Festivals – Life's Lessons</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🌾</div>
            <h3 class="text-xl font-bold text-green-800">பொங்கல்</h3>
            <p class="text-green-700">Pongal</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-green-800">பாடம்:</h4>
              <p class="text-sm text-green-700">நன்றி, பசுமை, குடும்ப ஒற்றுமை</p>
            </div>
            <div>
              <h4 class="font-semibold text-green-800">பங்கு:</h4>
              <ul class="text-xs text-green-700 space-y-1">
                <li>• பாட்டி: பஞ்சாங்கம், நல்ல நேரம்</li>
                <li>• அம்மா: பொங்கல் சமைத்தல்</li>
                <li>• குழந்தைகள்: "பொங்கலோ பொங்கல்!"</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 border border-pink-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🎉</div>
            <h3 class="text-xl font-bold text-pink-800">நவராத்திரி</h3>
            <p class="text-pink-700">Navaratri</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-pink-800">பாடம்:</h4>
              <p class="text-sm text-pink-700">பெண்களின் வலிமை, பக்தி</p>
            </div>
            <div>
              <h4 class="font-semibold text-pink-800">பங்கு:</h4>
              <ul class="text-xs text-pink-700 space-y-1">
                <li>• பாட்டி: கொலு பொம்மைகள்</li>
                <li>• அம்மா: சுந்தல், பூஜை</li>
                <li>• குழந்தைகள்: பஜனை பாடுதல்</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 border border-orange-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🪔</div>
            <h3 class="text-xl font-bold text-orange-800">கார்த்திகை தீபம்</h3>
            <p class="text-orange-700">Kartikai Deepam</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-orange-800">பாடம்:</h4>
              <p class="text-sm text-orange-700">ஒளி, சுத்தம், ஆன்மீக விழிப்பு</p>
            </div>
            <div>
              <h4 class="font-semibold text-orange-800">பங்கு:</h4>
              <ul class="text-xs text-orange-700 space-y-1">
                <li>• பாட்டி: கார்த்திகை விரதம்</li>
                <li>• அம்மா: பொரி உருண்டை</li>
                <li>• குழந்தைகள்: விளக்கு ஒளி வரிசை</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-6 border border-red-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🪔</div>
            <h3 class="text-xl font-bold text-red-800">தீபாவளி</h3>
            <p class="text-red-700">Deepavali</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-red-800">பாடம்:</h4>
              <p class="text-sm text-red-700">புதுமை, மகிழ்ச்சி பகிர்வு</p>
            </div>
            <div>
              <h4 class="font-semibold text-red-800">பங்கு:</h4>
              <ul class="text-xs text-red-700 space-y-1">
                <li>• பாட்டி: எண்ணெய் குளியல்</li>
                <li>• அம்மா: இனிப்பு, சுத்தம்</li>
                <li>• குழந்தைகள்: பட்டாசு பொறுப்புடன்</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🌕</div>
            <h3 class="text-xl font-bold text-blue-800">பௌர்ணமி</h3>
            <p class="text-blue-700">Pournami</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-blue-800">பாடம்:</h4>
              <p class="text-sm text-blue-700">மன அமைதி, சந்திர ஒளி</p>
            </div>
            <div>
              <h4 class="font-semibold text-blue-800">பங்கு:</h4>
              <ul class="text-xs text-blue-700 space-y-1">
                <li>• பாட்டி: சந்திர வழிபாடு</li>
                <li>• அம்மா: பசுமை உணவு</li>
                <li>• குழந்தைகள்: "ஓம் சோமாய நமஹ"</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🌑</div>
            <h3 class="text-xl font-bold text-gray-800">அமாவாசை</h3>
            <p class="text-gray-700">Amavasai</p>
          </div>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-800">பாடம்:</h4>
              <p class="text-sm text-gray-700">சுத்தம், துக்கம், மறதி</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">பங்கு:</h4>
              <ul class="text-xs text-gray-700 space-y-1">
                <li>• பாட்டி: பித்ரு பூஜை</li>
                <li>• அம்மா: சுத்தம்</li>
                <li>• குழந்தைகள்: சிந்தனை</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Part 5: Spiritual Wisdom -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:heart" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">🧘 பகுதி 5: ஆன்மீக நுண்ணறிவு – மன ஒழுக்கம், உணர்ச்சி வளர்ச்சி</h2>
          <p class="text-lg text-gray-600">Spiritual Wisdom – Mind Discipline, Emotional Growth</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🌿</div>
            <h3 class="text-xl font-bold text-blue-800">மன அமைதி</h3>
            <p class="text-blue-700">Mental Peace</p>
          </div>
          <ul class="text-sm text-blue-700 space-y-2">
            <li>• சஹனம் (பொறுமை)</li>
            <li>• தினசரி 5 நிமிட அமைதி</li>
            <li>• "இன்று என்ன தவறு செய்தேன்?"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🙏</div>
            <h3 class="text-xl font-bold text-green-800">பக்தி</h3>
            <p class="text-green-700">Devotion</p>
          </div>
          <ul class="text-sm text-green-700 space-y-2">
            <li>• அர்ப்பணம் (அர்ப்பணிப்பு)</li>
            <li>• தினசரி ஒரு ச்லோகா</li>
            <li>• வாரம் ஒரு பஜனை</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 border border-pink-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">💖</div>
            <h3 class="text-xl font-bold text-pink-800">நன்றி</h3>
            <p class="text-pink-700">Gratitude</p>
          </div>
          <ul class="text-sm text-pink-700 space-y-2">
            <li>• மன பசுமை</li>
            <li>• வாரம் ஒரு "நன்றி கடிதம்"</li>
            <li>• கண்களில் பார்வை</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-6 border border-indigo-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🧘‍♀️</div>
            <h3 class="text-xl font-bold text-indigo-800">தியானம்</h3>
            <p class="text-indigo-700">Meditation</p>
          </div>
          <ul class="text-sm text-indigo-700 space-y-2">
            <li>• சிந்தனை</li>
            <li>• வாரம் ஒரு மௌன நேரம்</li>
            <li>• "நான் யாருக்கு உதவினேன்?"</li>
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-6 border border-amber-200">
        <h3 class="text-xl font-bold text-amber-800 mb-4">📋 ஆன்மீக ஒழுக்க அட்டவணை</h3>
        <div class="overflow-x-auto">
          <table class="w-full bg-white/60 rounded-xl overflow-hidden">
            <thead class="bg-amber-200">
              <tr>
                <th class="px-4 py-3 text-left font-bold text-amber-800">நாள்</th>
                <th class="px-4 py-3 text-left font-bold text-amber-800">சஹனம்</th>
                <th class="px-4 py-3 text-left font-bold text-amber-800">பக்தி</th>
                <th class="px-4 py-3 text-left font-bold text-amber-800">நன்றி</th>
                <th class="px-4 py-3 text-left font-bold text-amber-800">தியானம்</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-amber-200">
                <td class="px-4 py-3 font-semibold text-amber-800">திங்கள்</td>
                <td class="px-4 py-3 text-sm text-amber-700">அமைதியாக பதில்</td>
                <td class="px-4 py-3 text-sm text-amber-700">ச்லோகா</td>
                <td class="px-4 py-3 text-sm text-amber-700">அம்மாவுக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"நான் யார்?"</td>
              </tr>
              <tr class="border-t border-amber-200 bg-amber-50/50">
                <td class="px-4 py-3 font-semibold text-amber-800">செவ்வாய்</td>
                <td class="px-4 py-3 text-sm text-amber-700">தவறு ஒப்புக்கொள்</td>
                <td class="px-4 py-3 text-sm text-amber-700">பஜனை</td>
                <td class="px-4 py-3 text-sm text-amber-700">பாட்டிக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"நாளை என்ன செய்யலாம்?"</td>
              </tr>
              <tr class="border-t border-amber-200">
                <td class="px-4 py-3 font-semibold text-amber-800">புதன்</td>
                <td class="px-4 py-3 text-sm text-amber-700">சிந்தித்து பேசு</td>
                <td class="px-4 py-3 text-sm text-amber-700">கோயில்</td>
                <td class="px-4 py-3 text-sm text-amber-700">அப்பாவுக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"நான் யாருக்கு உதவினேன்?"</td>
              </tr>
              <tr class="border-t border-amber-200 bg-amber-50/50">
                <td class="px-4 py-3 font-semibold text-amber-800">வியாழன்</td>
                <td class="px-4 py-3 text-sm text-amber-700">மன்னிப்பு கேள்</td>
                <td class="px-4 py-3 text-sm text-amber-700">பூஜை</td>
                <td class="px-4 py-3 text-sm text-amber-700">தாத்தாவுக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"நான் யாரை மன்னிக்க வேண்டும்?"</td>
              </tr>
              <tr class="border-t border-amber-200">
                <td class="px-4 py-3 font-semibold text-amber-800">வெள்ளி</td>
                <td class="px-4 py-3 text-sm text-amber-700">அமைதி நேரம்</td>
                <td class="px-4 py-3 text-sm text-amber-700">ச்லோகா</td>
                <td class="px-4 py-3 text-sm text-amber-700">சகோதரருக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"இன்று என்ன தவறு?"</td>
              </tr>
              <tr class="border-t border-amber-200 bg-amber-50/50">
                <td class="px-4 py-3 font-semibold text-amber-800">சனி</td>
                <td class="px-4 py-3 text-sm text-amber-700">சஹனம் பயிற்சி</td>
                <td class="px-4 py-3 text-sm text-amber-700">பஜனை</td>
                <td class="px-4 py-3 text-sm text-amber-700">நண்பருக்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">"நான் எப்படி உணர்கிறேன்?"</td>
              </tr>
              <tr class="border-t border-amber-200">
                <td class="px-4 py-3 font-semibold text-amber-800">ஞாயிறு</td>
                <td class="px-4 py-3 text-sm text-amber-700">சிந்தனை</td>
                <td class="px-4 py-3 text-sm text-amber-700">தியானம்</td>
                <td class="px-4 py-3 text-sm text-amber-700">உலகத்திற்கு நன்றி</td>
                <td class="px-4 py-3 text-sm text-amber-700">மௌன நேரம்</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Part 6: Cultural Lifestyle -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:musical-note" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">🎨 பகுதி 6: தமிழர் கலை, மொழி, உணவு, இயற்கை – பண்பாட்டு வாழ்வியல்</h2>
          <p class="text-lg text-gray-600">Tamil Arts, Language, Food, Nature – Cultural Lifestyle</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🗣️</div>
            <h3 class="text-xl font-bold text-blue-800">தமிழ் மொழி</h3>
            <p class="text-blue-700">Tamil Language</p>
          </div>
          <ul class="text-sm text-blue-700 space-y-2">
            <li>• மரியாதையின் இசை</li>
            <li>• தினசரி ஒரு சொல் கற்றல்</li>
            <li>• பாட்டியுடன் உரையாடல்</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🍲</div>
            <h3 class="text-xl font-bold text-green-800">தமிழ் உணவு</h3>
            <p class="text-green-700">Tamil Food</p>
          </div>
          <ul class="text-sm text-green-700 space-y-2">
            <li>• சத்துவம், பசுமை</li>
            <li>• சமையலில் பங்கு</li>
            <li>• "பாட்டி சமைக்கும் கஞ்சி"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl p-6 border border-brown-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🌳</div>
            <h3 class="text-xl font-bold text-brown-800">இயற்கை</h3>
            <p class="text-brown-700">Nature</p>
          </div>
          <ul class="text-sm text-brown-700 space-y-2">
            <li>• பஞ்சபூதங்கள்</li>
            <li>• மழைக்கு நன்றி</li>
            <li>• பூமி, காற்று, நீர், தீ</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border border-purple-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🎶</div>
            <h3 class="text-xl font-bold text-purple-800">தமிழ் கலைகள்</h3>
            <p class="text-purple-700">Tamil Arts</p>
          </div>
          <ul class="text-sm text-purple-700 space-y-2">
            <li>• இசை, நாடகம், ஓவியம்</li>
            <li>• வாரம் ஒரு பஜனை</li>
            <li>• கோலம் போட்டல்</li>
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl p-6 border border-cyan-200">
        <h3 class="text-xl font-bold text-cyan-800 mb-4">📋 பண்பாட்டு வளர்ச்சி அட்டவணை</h3>
        <div class="overflow-x-auto">
          <table class="w-full bg-white/60 rounded-xl overflow-hidden">
            <thead class="bg-cyan-200">
              <tr>
                <th class="px-4 py-3 text-left font-bold text-cyan-800">நாள்</th>
                <th class="px-4 py-3 text-left font-bold text-cyan-800">மொழி</th>
                <th class="px-4 py-3 text-left font-bold text-cyan-800">உணவு</th>
                <th class="px-4 py-3 text-left font-bold text-cyan-800">இயற்கை</th>
                <th class="px-4 py-3 text-left font-bold text-cyan-800">கலை</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-cyan-200">
                <td class="px-4 py-3 font-semibold text-cyan-800">திங்கள்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">தமிழ் சொல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">சத்துவ உணவு</td>
                <td class="px-4 py-3 text-sm text-cyan-700">மழை – நன்றி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பஜனை</td>
              </tr>
              <tr class="border-t border-cyan-200 bg-cyan-50/50">
                <td class="px-4 py-3 font-semibold text-cyan-800">செவ்வாய்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பழமொழி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">கஞ்சி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பூ – பூஜை</td>
                <td class="px-4 py-3 text-sm text-cyan-700">கோலம்</td>
              </tr>
              <tr class="border-t border-cyan-200">
                <td class="px-4 py-3 font-semibold text-cyan-800">புதன்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">உரையாடல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பசுமை உணவு</td>
                <td class="px-4 py-3 text-sm text-cyan-700">காற்று – தீபம்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">நாடகம்</td>
              </tr>
              <tr class="border-t border-cyan-200 bg-cyan-50/50">
                <td class="px-4 py-3 font-semibold text-cyan-800">வியாழன்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">"நன்றி" சொல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பழம்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">நீர் – சந்திரன்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">ஓவியம்</td>
              </tr>
              <tr class="border-t border-cyan-200">
                <td class="px-4 py-3 font-semibold text-cyan-800">வெள்ளி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">"அறம்" சொல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">சாம்பார்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பூமி – பொங்கல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">வீணை</td>
              </tr>
              <tr class="border-t border-cyan-200 bg-cyan-50/50">
                <td class="px-4 py-3 font-semibold text-cyan-800">சனி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">பாட்டி உரை</td>
                <td class="px-4 py-3 text-sm text-cyan-700">சுந்தல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">மரம் – நிழல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">மிருதங்கம்</td>
              </tr>
              <tr class="border-t border-cyan-200">
                <td class="px-4 py-3 font-semibold text-cyan-800">ஞாயிறு</td>
                <td class="px-4 py-3 text-sm text-cyan-700">குடும்ப உரையாடல்</td>
                <td class="px-4 py-3 text-sm text-cyan-700">இனிப்பு</td>
                <td class="px-4 py-3 text-sm text-cyan-700">மண் – பூமி</td>
                <td class="px-4 py-3 text-sm text-cyan-700">நாதஸ்வரம்</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Part 7: Practical Tools -->
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8 transform hover:scale-105 transition-all duration-300">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon icon="heroicons:wrench-screwdriver" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800">🛠️ பகுதி 7: நடைமுறை கருவிகள் – பயிற்சி, சிந்தனை, உதவியாளர்</h2>
          <p class="text-lg text-gray-600">Practical Tools – Practice, Reflection, Assistant</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 border border-blue-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">📅</div>
            <h3 class="text-xl font-bold text-blue-800">தமிழ் நாட்காட்டி</h3>
            <p class="text-blue-700">Tamil Calendar</p>
          </div>
          <ul class="text-sm text-blue-700 space-y-2">
            <li>• திதி, நட்சத்திரம், ராகு காலம்</li>
            <li>• திருவிழாக்கள், விரத நாட்கள்</li>
            <li>• "இன்று சதயம் – சிவ வழிபாடு"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">📿</div>
            <h3 class="text-xl font-bold text-green-800">ச்லோகா அட்டைகள்</h3>
            <p class="text-green-700">Sloka Cards</p>
          </div>
          <ul class="text-sm text-green-700 space-y-2">
            <li>• கணபதி, லக்ஷ்மி, சரஸ்வதி</li>
            <li>• தமிழில் அர்த்தம் மற்றும் மெலடி</li>
            <li>• தினசரி ஒரு ச்லோகா</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 border border-purple-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">💖</div>
            <h3 class="text-xl font-bold text-purple-800">உணர்ச்சி நிலை</h3>
            <p class="text-purple-700">Emotional Tracker</p>
          </div>
          <ul class="text-sm text-purple-700 space-y-2">
            <li>• "நான் எப்படி உணர்கிறேன்?"</li>
            <li>• தினசரி உணர்ச்சி குறிப்பு</li>
            <li>• "இன்று என்ன தவறு செய்தேன்?"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 border border-orange-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">📝</div>
            <h3 class="text-xl font-bold text-orange-800">வாராந்திர சிந்தனை</h3>
            <p class="text-orange-700">Weekly Reflection</p>
          </div>
          <ul class="text-sm text-orange-700 space-y-2">
            <li>• "நான் யாருக்கு உதவினேன்?"</li>
            <li>• "நான் யாரை மன்னிக்க வேண்டும்?"</li>
            <li>• வாரம் ஒரு சிந்தனை பதிவு</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 border border-pink-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">🎙️</div>
            <h3 class="text-xl font-bold text-pink-800">"சிவோ" உதவியாளர்</h3>
            <p class="text-pink-700">Shivo Assistant</p>
          </div>
          <ul class="text-sm text-pink-700 space-y-2">
            <li>• தினசரி பாடம் கேட்கும் பழக்கம்</li>
            <li>• "சிவோ, இன்று என்ன செய்யலாம்?"</li>
            <li>• "சிவோ, பாட்டி என்ன சொல்வார்?"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-6 border border-indigo-200">
          <div class="text-center mb-4">
            <div class="text-3xl mb-2">📦</div>
            <h3 class="text-xl font-bold text-indigo-800">Printable Tools</h3>
            <p class="text-indigo-700">Ready-to-Use</p>
          </div>
          <ul class="text-sm text-indigo-700 space-y-2">
            <li>• தமிழ் நாட்காட்டி (Sticker format)</li>
            <li>• ச்லோகா அட்டைகள் (PDF-ready)</li>
            <li>• உணர்ச்சி குறிப்பு அட்டவணை</li>
            <li>• சிந்தனை குறிப்புகள்</li>
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-200">
        <h3 class="text-xl font-bold text-gray-800 mb-4">🎯 இறுதி செய்தி / Final Message</h3>
        <p class="text-gray-700 mb-4 text-lg">இந்த வழிகாட்டி ஒரு புத்தகம் அல்ல – இது ஒரு வாழ்க்கை முறை. ஒவ்வொரு நாளும், ஒவ்வொரு சிந்தனையும், ஒவ்வொரு செயலும் உங்கள் ஆன்மீக பயணத்தின் ஒரு அங்கம்.</p>
        <p class="text-gray-700 mb-4 text-lg italic">"பழமையை கற்றுக்கொள், நிகழ்காலத்தில் வாழ், எதிர்காலத்தை கட்டமை செய்"</p>
        <p class="text-gray-700 text-lg">
          <strong>உங்கள் தமிழ் வாழ்க்கை பயணம் இங்கே தொடங்குகிறது! 🌟</strong>
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="text-center">
      <button on:click={navigateBack} class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
        <Icon icon="heroicons:arrow-left" class="w-6 h-6 mr-2 inline" />
        Back to Wisdom Menu
      </button>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }
</style>
