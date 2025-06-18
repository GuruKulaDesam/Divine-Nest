<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { 
    notifications, 
    getUnreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead
  } from '../data/notifications.js';
  import { dropdownAnimations, motionHover } from '../utils/motion.js';

  export let isOpen = false;
  export let onClose = () => {};

  let dropdownElement;
  let unreadCount = getUnreadNotificationsCount();

  // Reactive statement to update unread count
  $: unreadCount = getUnreadNotificationsCount();

  function handleNotificationClick(notification) {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
    // Handle notification click - could navigate to relevant page
    console.log('Notification clicked:', notification);
  }

  function handleMarkAllAsRead() {
    markAllNotificationsAsRead();
  }

  function getNotificationIcon(type) {
    switch (type) {
      case 'success':
        return 'heroicons:check-circle';
      case 'warning':
        return 'heroicons:exclamation-triangle';
      case 'error':
        return 'heroicons:x-circle';
      case 'info':
        return 'heroicons:information-circle';
      default:
        return 'heroicons:bell';
    }
  }

  function getNotificationColor(type) {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'info':
        return 'text-info';
      default:
        return 'text-base-content';
    }
  }

  onMount(() => {
    if (isOpen && dropdownElement) {
      dropdownAnimations.open(dropdownElement);
    }
  });

  $: if (isOpen && dropdownElement) {
    dropdownAnimations.open(dropdownElement);
  } else if (!isOpen && dropdownElement) {
    dropdownAnimations.close(dropdownElement);
  }
</script>

<div 
  bind:this={dropdownElement}
  class="absolute right-0 mt-2 w-80 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50 max-h-96 overflow-hidden"
>
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-base-300">
    <h3 class="text-lg font-semibold text-base-content">Notifications</h3>
    <div class="flex items-center space-x-2">
      {#if unreadCount > 0}
        <button 
          class="text-sm text-primary hover:text-primary-focus transition-colors"
          on:click={handleMarkAllAsRead}
        >
          Mark all as read
        </button>
      {/if}
      <button 
        class="p-1 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded transition-colors"
        on:click={onClose}
      >
        <Icon icon="heroicons:x-mark" class="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Notifications List -->
  <div class="dropdown-scroll">
    {#if notifications.length === 0}
      <div class="p-6 text-center">
        <Icon icon="heroicons:bell" class="w-12 h-12 text-base-content/40 mx-auto mb-2" />
        <p class="text-base-content/60">No notifications</p>
      </div>
    {:else}
      {#each notifications as notification (notification.id)}
        <div 
          class="p-4 border-b border-base-200 hover:bg-base-50 cursor-pointer transition-colors {!notification.read ? 'bg-primary/5' : ''}"
          on:click={() => handleNotificationClick(notification)}
          use:motionHover
        >
          <div class="flex items-start space-x-3 overflow-x-hidden">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <Icon 
                icon={getNotificationIcon(notification.type)} 
                class="w-5 h-5 {getNotificationColor(notification.type)}" 
              />
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0 overflow-x-hidden">
              <div class="flex items-start justify-between overflow-x-hidden">
                <p class="text-sm font-medium text-base-content {!notification.read ? 'font-semibold' : ''} break-words">
                  {notification.title}
                </p>
                {#if !notification.read}
                  <span class="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></span>
                {/if}
              </div>
              <p class="text-sm text-base-content/70 mt-1 break-words">
                {notification.message}
              </p>
              <p class="text-xs text-base-content/50 mt-2">
                {notification.time}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Footer -->
  {#if notifications.length > 0}
    <div class="p-3 border-t border-base-300 bg-base-50">
      <button 
        class="w-full text-sm text-primary hover:text-primary-focus font-medium transition-colors"
        on:click={() => {
          // Navigate to full notifications page
          console.log('View all notifications');
        }}
      >
        View all notifications
      </button>
    </div>
  {/if}
</div> 