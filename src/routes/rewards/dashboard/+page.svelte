<script>
  import { onMount } from 'svelte';
  import { rewards, rewardActions } from '$lib/stores/rewards';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { Icon } from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let rewardsList: any[] = [];
  let leaderboard: any[] = [];
  let monthlySummary: any = {};
  let virtueWall: any[] = [];

  // Voice command handler
  function handleVoiceCommand(command: string) {
    if (command.includes('add reward') || command.includes('சேர்க்க பரிசு')) {
      window.location.href = '/rewards/create';
    } else if (command.includes('view rewards') || command.includes('பார்க்க பரிசுகள்')) {
      window.location.href = '/rewards/review';
    } else if (command.includes('leaderboard') || command.includes('தரவரிசை')) {
      // Scroll to leaderboard section
      document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    // Subscribe to stores
    const unsubscribeRewards = rewards.subscribe(value => {
      rewardsList = value;
    });

    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
    });

    // Get analytics data
    leaderboard = rewardActions.getLeaderboard(5);
    monthlySummary = rewardActions.getMonthlySummary(new Date().getFullYear(), new Date().getMonth());
    virtueWall = rewardActions.getVirtueWall(10);

    return () => {
      unsubscribeRewards();
      unsubscribeUser();
    };
  });

  // Filter rewards based on user role
  $: filteredRewards = rewardsList.filter(reward =>
    reward.applicable_roles.includes(currentUserRole)
  );

  // Calculate KPIs
  $: totalPoints = filteredRewards.reduce((sum, reward) => sum + reward.points, 0);
  $: starCount = filteredRewards.filter(reward => reward.type === 'Star').length;
  $: karmaCount = filteredRewards.filter(reward => reward.type === 'Karma').length;
  $: uniquePeople = new Set(filteredRewards.map(reward => reward.person)).size;
</script>

<svelte:head>
  <title>Rewards Dashboard - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('rewards.dashboard.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('rewards.dashboard.subtitle')}</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        placeholder={$_('rewards.dashboard.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="btn btn-outline btn-primary"
      />

      <a href="/rewards/create" class="btn btn-primary">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        {$_('rewards.dashboard.add_reward')}
      </a>

      <a href="/rewards/review" class="btn btn-outline">
        <Icon icon="mdi:view-list" class="w-5 h-5" />
        {$_('rewards.dashboard.view_all')}
      </a>
    </div>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Points -->
    <div class="card bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('rewards.dashboard.total_points')}</h3>
            <p class="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
          </div>
          <Icon icon="mdi:star" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Star Rewards -->
    <div class="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('rewards.dashboard.star_rewards')}</h3>
            <p class="text-3xl font-bold">{starCount}</p>
          </div>
          <Icon icon="mdi:star-outline" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Karma Rewards -->
    <div class="card bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('rewards.dashboard.karma_rewards')}</h3>
            <p class="text-3xl font-bold">{karmaCount}</p>
          </div>
          <Icon icon="mdi:flower" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Active Members -->
    <div class="card bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('rewards.dashboard.active_members')}</h3>
            <p class="text-3xl font-bold">{uniquePeople}</p>
          </div>
          <Icon icon="mdi:account-group" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Leaderboard -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-xl mb-4" id="leaderboard">
          <Icon icon="mdi:trophy" class="w-6 h-6 text-yellow-500" />
          {$_('rewards.dashboard.leaderboard')}
        </h2>

        <div class="space-y-3">
          {#each leaderboard as person, index}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <p class="font-semibold">{person.person}</p>
                  <p class="text-sm opacity-70">{person.starCount} Stars, {person.karmaCount} Karma</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-primary">{person.totalPoints} pts</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Virtue Wall -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-xl mb-4">
          <Icon icon="mdi:wall" class="w-6 h-6 text-green-500" />
          {$_('rewards.dashboard.virtue_wall')}
        </h2>

        <div class="space-y-3 max-h-96 overflow-y-auto">
          {#each virtueWall.slice(0, 8) as reward}
            <div class="p-3 border border-base-300 rounded-lg">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="badge badge-{reward.type === 'Star' ? 'primary' : 'secondary'}">
                    {reward.type}
                  </span>
                  <span class="text-sm opacity-70">{reward.person}</span>
                </div>
                <span class="badge badge-outline">+{reward.points} pts</span>
              </div>
              <p class="text-sm">{reward.reason}</p>
              <p class="text-xs opacity-50 mt-1">{new Date(reward.date).toLocaleDateString()}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Rewards Table -->
  <div class="card bg-base-100 shadow-xl mt-8">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">
        <Icon icon="mdi:clock-outline" class="w-6 h-6" />
        {$_('rewards.dashboard.recent_rewards')}
      </h2>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>{$_('rewards.dashboard.table.person')}</th>
              <th>{$_('rewards.dashboard.table.type')}</th>
              <th>{$_('rewards.dashboard.table.reason')}</th>
              <th>{$_('rewards.dashboard.table.points')}</th>
              <th>{$_('rewards.dashboard.table.date')}</th>
              <th>{$_('rewards.dashboard.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredRewards.slice(0, 10) as reward}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-8 h-8">
                        <span class="text-xs">{reward.person.charAt(0)}</span>
                      </div>
                    </div>
                    <span class="font-medium">{reward.person}</span>
                  </div>
                </td>
                <td>
                  <span class="badge badge-{reward.type === 'Star' ? 'primary' : 'secondary'}">
                    {reward.type}
                  </span>
                </td>
                <td class="max-w-xs truncate" title={reward.reason}>
                  {reward.reason}
                </td>
                <td class="font-bold text-primary">+{reward.points}</td>
                <td>{new Date(reward.date).toLocaleDateString()}</td>
                <td>
                  <a href="/rewards/update/{reward.id}" class="btn btn-sm btn-ghost">
                    <Icon icon="mdi:pencil" class="w-4 h-4" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if filteredRewards.length === 0}
        <div class="text-center py-8">
          <Icon icon="mdi:star-off" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <p class="text-lg opacity-70">{$_('rewards.dashboard.no_rewards')}</p>
          <a href="/rewards/create" class="btn btn-primary mt-4">
            {$_('rewards.dashboard.add_first_reward')}
          </a>
        </div>
      {/if}
    </div>
  </div>

  <!-- Discussion Forum -->
  <DiscussionForum
    tableName="rewards_dashboard"
    recordId="general"
    title={$_('rewards.dashboard.discussion_title')}
    placeholder={$_('rewards.dashboard.discussion_placeholder')}
  />
</div>