<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { 
    messages, 
    getUnreadMessagesCount, 
    markMessageAsRead, 
    markAllMessagesAsRead
  } from '../data/notifications.js';
  import { dropdownAnimations, motionHover } from '../utils/motion.js';

  export let isOpen = false;
  export let onClose = () => {};

  let dropdownElement;
  let unreadCount = getUnreadMessagesCount();

  // Reactive statement to update unread count
  $: unreadCount = getUnreadMessagesCount();

  function handleMessageClick(message) {
    if (!message.read) {
      markMessageAsRead(message.id);
    }
    // Handle message click - could open message detail or navigate to messages page
    console.log('Message clicked:', message);
  }

  function handleMarkAllAsRead() {
    markAllMessagesAsRead();
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-base-content';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-base-content/30';
      default:
        return 'bg-base-content/30';
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
    <h3 class="text-lg font-semibold text-base-content">Messages</h3>
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

  <!-- Messages List -->
  <div class="dropdown-scroll">
    {#if messages.length === 0}
      <div class="p-6 text-center">
        <Icon icon="heroicons:envelope" class="w-12 h-12 text-base-content/40 mx-auto mb-2" />
        <p class="text-base-content/60">No messages</p>
      </div>
    {:else}
      {#each messages as message (message.id)}
        <div 
          class="p-4 border-b border-base-200 hover:bg-base-50 cursor-pointer transition-colors {!message.read ? 'bg-primary/5' : ''}"
          on:click={() => handleMessageClick(message)}
          use:motionHover
        >
          <div class="flex items-start space-x-3 overflow-x-hidden">
            <!-- Avatar -->
            <div class="flex-shrink-0 relative">
              <img 
                src={message.sender.avatar} 
                alt={message.sender.name}
                class="w-10 h-10 rounded-full object-cover bg-base-200"
                on:error={(event) => {
                  const target = event.target;
                  if (target instanceof HTMLImageElement) {
                    target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback';
                  }
                }}
              >
              <div class="absolute -bottom-1 -right-1 w-3 h-3 {getStatusColor(message.sender.status)} rounded-full border-2 border-base-100"></div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0 overflow-x-hidden">
              <div class="flex items-start justify-between overflow-x-hidden">
                <div class="flex items-center space-x-2 min-w-0 overflow-x-hidden">
                  <p class="text-sm font-medium text-base-content {!message.read ? 'font-semibold' : ''} truncate break-words">
                    {message.sender.name}
                  </p>
                  <span class="text-xs {getPriorityColor(message.priority)} flex-shrink-0">
                    {message.priority}
                  </span>
                </div>
                {#if !message.read}
                  <span class="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></span>
                {/if}
              </div>
              <p class="text-sm font-medium text-base-content/80 mt-1 break-words">
                {message.subject}
              </p>
              <p class="text-sm text-base-content/70 mt-1 break-words">
                {message.preview}
              </p>
              <p class="text-xs text-base-content/50 mt-2">
                {message.time}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Footer -->
  {#if messages.length > 0}
    <div class="p-3 border-t border-base-300 bg-base-50">
      <button 
        class="w-full text-sm text-primary hover:text-primary-focus font-medium transition-colors"
        on:click={() => {
          // Navigate to full messages page
          console.log('View all messages');
        }}
      >
        View all messages
      </button>
    </div>
  {/if}
</div> 