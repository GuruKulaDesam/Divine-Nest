<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let activeSection = "overview";
  let selectedMember = "all";
  let healthMetrics = null;
  let loading = true;

  // Calculate current section info
  $: currentSection = HealthSections.find((s) => s.id === activeSection);

  // Health Sections for navigation
  const HealthSections = [
    {
      id: "overview",
      name: "Health Overview",
      tamil: "உடல் நல கண்ணோட்டம்",
      icon: "heroicons:shield-check",
      color: "green"
    },
    {
      id: "fitness",
      name: "Fitness & Activity",
      tamil: "உடற்பயிற்சி & செயல்பாடு",
      icon: "heroicons:cursor-arrow-rays",
      color: "blue"
    },
    {
      id: "wellness",
      name: "Wellness & Sleep",
      tamil: "நலன் & தூக்கம்",
      icon: "heroicons:moon",
      color: "purple"
    },
    {
      id: "womens",
      name: "Women's Health",
      tamil: "பெண்கள் உடல் நலன்",
      icon: "heroicons:heart",
      color: "pink"
    },
    {
      id: "medical",
      name: "Medical Records",
      tamil: "மருத்துவ பதிவுகள்",
      icon: "heroicons:clipboard-document-list",
      color: "red"
    }
  ];

  // Family Members for health tracking
  const FamilyMembers = [
    { id: "all", name: "All Family", tamil: "குடும்பம் முழுவதும்", avatar: "���‍���‍���‍���" },
    { id: "father", name: "Father", tamil: "தந்தை", avatar: "���" },
    { id: "mother", name: "Mother", tamil: "தாய்", avatar: "���" },
    { id: "son", name: "Son", tamil: "மகன்", avatar: "���" },
    { id: "daughter", name: "Daughter", tamil: "மகள்", avatar: "���" }
  ];

  onMount(async () => {
    // Simulate health data loading
    setTimeout(() => {
      healthMetrics = {
        steps: 8420,
        calories: 1850,
        sleep: 7.5,
        water: 6,
        heartRate: 72,
        weight: 65.5,
        bloodPressure: "120/80",
        activeMinutes: 45,
        stressLevel: 3,
        mood: "good"
      };
      loading = false;
    }, 1000);
  });

  function switchSection(sectionId) {
    activeSection = sectionId;
  }

  function switchMember(memberId) {
    selectedMember = memberId;
  }

  function navigateToPeriodTracker() {
    // Navigate to period tracker
  }

  function navigateToBeautyGuide() {
    // Navigate to beauty guide
  }

  // Calculate stats
  $: {
    const stepGoal = 10000;
    const waterGoal = 8;
    const sleepGoal = 8;
    const calorieGoal = 2000;
  }
</script>

<!-- Health & Wellness Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-green-100 p-3 rounded-lg">
            <Icon icon="heroicons:shield-check" class="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">��� Health & Wellness</h1>
            <p class="text-lg text-gray-600">உடல் நலன் & நலன்</p>
            <p class="text-sm text-gray-500">Track fitness, wellness, and family health metrics</p>
          </div>
        </div>

        <!-- Member Selector -->
        <div class="flex space-x-2">
          {#each FamilyMembers as member}
            <button on:click={() => switchMember(member.id)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedMember === member.id ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
              <span class="text-lg">{member.avatar}</span>
              <span class="font-medium">{member.name}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Steps Today</p>
              <p class="text-2xl font-bold">{healthMetrics?.steps.toLocaleString() || 0}</p>
              <p class="text-xs opacity-75">இன்றைய அடிகள்</p>
            </div>
            <Icon icon="heroicons:cursor-arrow-rays" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Sleep Hours</p>
              <p class="text-2xl font-bold">{healthMetrics?.sleep || 0}h</p>
              <p class="text-xs opacity-75">தூக்க நேரம்</p>
            </div>
            <Icon icon="heroicons:moon" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Water Intake</p>
              <p class="text-2xl font-bold">{healthMetrics?.water || 0}/8</p>
              <p class="text-xs opacity-75">நீர் அளவு</p>
            </div>
            <Icon icon="heroicons:beaker" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Heart Rate</p>
              <p class="text-2xl font-bold">{healthMetrics?.heartRate || 0}</p>
              <p class="text-xs opacity-75">இதய துடிப்பு</p>
            </div>
            <Icon icon="heroicons:heart" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Health Sections
            <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each HealthSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : 'text-gray-600 hover:bg-gray-50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Quick Actions Sidebar -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                <Icon icon="heroicons:plus" class="w-4 h-4" />
                <span>Log Activity</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                <Icon icon="heroicons:beaker" class="w-4 h-4" />
                <span>Add Water</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                <Icon icon="heroicons:moon" class="w-4 h-4" />
                <span>Log Sleep</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl shadow-lg p-6">
          {#if activeSection === "overview"}
            <!-- Overview Dashboard -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900">Health Overview</h2>
                <span class="text-sm text-gray-500">உடல் நல கண்ணோட்டம்</span>
              </div>

              <!-- Today's Health Summary -->
              <div class="bg-green-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-green-900 mb-3">Today's Health Summary</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center space-x-3 mb-2">
                      <Icon icon="heroicons:cursor-arrow-rays" class="w-6 h-6 text-blue-600" />
                      <div>
                        <p class="text-sm text-gray-600">Steps</p>
                        <p class="text-xl font-bold text-gray-900">{healthMetrics?.steps.toLocaleString() || 0}</p>
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" style="width: {((healthMetrics?.steps || 0) / 10000) * 100}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Goal: 10,000</p>
                  </div>

                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center space-x-3 mb-2">
                      <Icon icon="heroicons:fire" class="w-6 h-6 text-orange-600" />
                      <div>
                        <p class="text-sm text-gray-600">Calories</p>
                        <p class="text-xl font-bold text-gray-900">{healthMetrics?.calories || 0}</p>
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-orange-600 h-2 rounded-full" style="width: {((healthMetrics?.calories || 0) / 2000) * 100}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Goal: 2,000</p>
                  </div>

                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center space-x-3 mb-2">
                      <Icon icon="heroicons:moon" class="w-6 h-6 text-purple-600" />
                      <div>
                        <p class="text-sm text-gray-600">Sleep</p>
                        <p class="text-xl font-bold text-gray-900">{healthMetrics?.sleep || 0}h</p>
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-purple-600 h-2 rounded-full" style="width: {((healthMetrics?.sleep || 0) / 8) * 100}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Goal: 8 hours</p>
                  </div>

                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center space-x-3 mb-2">
                      <Icon icon="heroicons:beaker" class="w-6 h-6 text-blue-600" />
                      <div>
                        <p class="text-sm text-gray-600">Water</p>
                        <p class="text-xl font-bold text-gray-900">{healthMetrics?.water || 0}</p>
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" style="width: {((healthMetrics?.water || 0) / 8) * 100}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Goal: 8 glasses</p>
                  </div>
                </div>
              </div>

              <!-- Health Insights -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-blue-900 mb-3">Health Insights</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-semibold text-gray-900 mb-2">Blood Pressure</h4>
                    <div class="text-2xl font-bold text-green-600">{healthMetrics?.bloodPressure || "120/80"}</div>
                    <p class="text-sm text-gray-500">Normal range</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-semibold text-gray-900 mb-2">Weight</h4>
                    <div class="text-2xl font-bold text-blue-600">{healthMetrics?.weight || 0}kg</div>
                    <p class="text-sm text-gray-500">-0.5kg this week</p>
                  </div>
                </div>
              </div>

              <!-- Wellness Tips -->
              <div class="bg-purple-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-purple-900 mb-3">Today's Wellness Tips</h3>
                <div class="space-y-3">
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <p class="text-gray-900">��� Stay hydrated! You've had {healthMetrics?.water || 0} glasses today.</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <p class="text-gray-900">���‍♂️ Great job on steps! Keep up the activity for better health.</p>
                  </div>
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <p class="text-gray-900">��� Your sleep quality is excellent. Maintain this routine.</p>
                  </div>
                </div>
              </div>
            </div>

          {:else if activeSection === "fitness"}
            <!-- Fitness & Activity -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Fitness & Activity</h2>

              <!-- Activity Metrics -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white border rounded-lg p-6">
                  <h3 class="text-lg font-semibold mb-4">Step Tracking</h3>
                  <div class="text-center mb-4">
                    <div class="text-4xl font-bold text-blue-600">{healthMetrics?.steps.toLocaleString() || 0}</div>
                    <p class="text-gray-600">steps today</p>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-blue-600 h-3 rounded-full" style="width: {((healthMetrics?.steps || 0) / 10000) * 100}%"></div>
                  </div>
                  <p class="text-sm text-gray-500 mt-2 text-center">Goal: 10,000 steps</p>
                </div>

                <div class="bg-white border rounded-lg p-6">
                  <h3 class="text-lg font-semibold mb-4">Active Minutes</h3>
                  <div class="text-center mb-4">
                    <div class="text-4xl font-bold text-green-600">{healthMetrics?.activeMinutes || 0}</div>
                    <p class="text-gray-600">minutes today</p>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-green-600 h-3 rounded-full" style="width: {((healthMetrics?.activeMinutes || 0) / 60) * 100}%"></div>
                  </div>
                  <p class="text-sm text-gray-500 mt-2 text-center">Goal: 60 minutes</p>
                </div>
              </div>

              <!-- Exercise Log -->
              <div class="bg-white border rounded-lg p-4">
                <h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <Icon icon="heroicons:cursor-arrow-rays" class="w-5 h-5 text-blue-600" />
                      <div>
                        <p class="font-medium">Morning Walk</p>
                        <p class="text-sm text-gray-500">8:00 AM - 9:00 AM</p>
                      </div>
                    </div>
                    <span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <Icon icon="heroicons:bolt" class="w-5 h-5 text-orange-600" />
                      <div>
                        <p class="font-medium">Yoga Session</p>
                        <p class="text-sm text-gray-500">6:00 PM - 7:00 PM</p>
                      </div>
                    </div>
                    <span class="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

          {:else if activeSection === "wellness"}
            <!-- Wellness & Sleep -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Wellness & Sleep</h2>

              <!-- Sleep Tracking -->
              <div class="bg-purple-50 rounded-lg p-6">
                <div class="text-center mb-6">
                  <div class="text-5xl font-bold text-purple-600 mb-2">{healthMetrics?.sleep || 0}h</div>
                  <p class="text-lg text-gray-600">Sleep Duration</p>
                  <p class="text-sm text-gray-500">Last night</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-white p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-blue-600">23:00</div>
                    <p class="text-sm text-gray-600">Bedtime</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-green-600">06:30</div>
                    <p class="text-sm text-gray-600">Wake up</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-purple-600">Excellent</div>
                    <p class="text-sm text-gray-600">Quality</p>
                  </div>
                </div>
              </div>

              <!-- Stress & Mood -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white border rounded-lg p-6">
                  <h3 class="text-lg font-semibold mb-4">Stress Level</h3>
                  <div class="text-center mb-4">
                    <div class="text-4xl font-bold text-red-600">{healthMetrics?.stressLevel || 0}/10</div>
                    <p class="text-gray-600">Current level</p>
                  </div>
                  <div class="flex justify-center space-x-2">
                    {#each Array(10) as _, i}
                      <div class="w-4 h-4 rounded-full {i < (healthMetrics?.stressLevel || 0) ? 'bg-red-500' : 'bg-gray-200'}"></div>
                    {/each}
                  </div>
                </div>

                <div class="bg-white border rounded-lg p-6">
                  <h3 class="text-lg font-semibold mb-4">Mood Today</h3>
                  <div class="text-center mb-4">
                    <div class="text-4xl mb-2">{healthMetrics?.mood === 'good' ? '���' : healthMetrics?.mood === 'okay' ? '���' : '���'}</div>
                    <p class="text-gray-600 capitalize">{healthMetrics?.mood || 'neutral'}</p>
                  </div>
                  <div class="flex justify-center space-x-4">
                    <button class="text-2xl hover:scale-110 transition-transform">���</button>
                    <button class="text-2xl hover:scale-110 transition-transform">���</button>
                    <button class="text-2xl hover:scale-110 transition-transform">���</button>
                  </div>
                </div>
              </div>
            </div>

          {:else if activeSection === "womens"}
            <!-- Women's Health -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Women's Health</h2>

              <!-- Women's Health Features -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Period Tracker -->
                <button on:click={navigateToPeriodTracker} class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl p-6 text-left transition-all transform hover:scale-105">
                  <div class="flex items-center space-x-4">
                    <Icon icon="heroicons:heart" class="w-12 h-12" />
                    <div>
                      <h3 class="text-xl font-bold mb-1">மாதர் விடுமுறை நாள்</h3>
                      <p class="text-sm opacity-90">Period Tracker</p>
                      <p class="text-xs opacity-75 mt-2">Track cycles, get insights, and follow traditional wisdom</p>
                    </div>
                  </div>
                </button>

                <!-- Beauty Guide -->
                <button on:click={navigateToBeautyGuide} class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl p-6 text-left transition-all transform hover:scale-105">
                  <div class="flex items-center space-x-4">
                    <Icon icon="heroicons:sparkles" class="w-12 h-12" />
                    <div>
                      <h3 class="text-xl font-bold mb-1">அழகு வழிகாட்டி</h3>
                      <p class="text-sm opacity-90">Beauty Guide</p>
                      <p class="text-xs opacity-75 mt-2">Traditional Tamil beauty wisdom and modern tips</p>
                    </div>
                  </div>
                </button>
              </div>

              <!-- Health Tips -->
              <div class="bg-pink-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-pink-900 mb-3">Women's Health Tips</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">Nutrition</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Iron-rich foods for energy</li>
                      <li>• Calcium for bone health</li>
                      <li>• Hydration importance</li>
                      <li>• Balanced diet planning</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">Wellness</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Regular health check-ups</li>
                      <li>• Stress management</li>
                      <li>• Adequate rest</li>
                      <li>• Exercise routines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          {:else if activeSection === "medical"}
            <!-- Medical Records -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Medical Records</h2>

              <!-- Recent Records -->
              <div class="bg-red-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-red-900 mb-3">Recent Medical Records</h3>
                <div class="space-y-3">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900">Annual Health Check-up</h4>
                      <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                    </div>
                    <p class="text-sm text-gray-600">Dr. Meena Dental Clinic - January 15, 2024</p>
                    <p class="text-xs text-gray-500">All parameters normal, follow-up in 6 months</p>
                  </div>

                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900">Blood Test</h4>
                      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Results Ready</span>
                    </div>
                    <p class="text-sm text-gray-600">City Lab - January 10, 2024</p>
                    <p class="text-xs text-gray-500">Cholesterol levels slightly elevated, dietary changes recommended</p>
                  </div>
                </div>
              </div>

              <!-- Upcoming Appointments -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-blue-900 mb-3">Upcoming Appointments</h3>
                <div class="space-y-3">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="flex items-center space-x-3">
                      <Icon icon="heroicons:calendar" class="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 class="font-semibold text-gray-900">Dental Check-up</h4>
                        <p class="text-sm text-gray-600">Dr. Meena - February 15, 2024</p>
                        <p class="text-xs text-gray-500">Annual cleaning and examination</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {:else}
            <div class="text-center py-12">
              <Icon icon="heroicons:shield-check" class="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p class="text-gray-600">This health section is under development.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
