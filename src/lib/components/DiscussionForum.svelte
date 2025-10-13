<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { userProfile } from '$lib/stores/userProfile';

  export let tableName: string;
  export let recordId: string;

  let comments = [];
  let newComment = '';
  let isSubmitting = false;

  // Load comments (in a real app, this would be from a database)
  onMount(() => {
    loadComments();
  });

  function loadComments() {
    // Mock comments - in a real app, fetch from database
    comments = [
      {
        id: '1',
        author: 'Mother',
        content: 'Great work on organizing the inventory!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes: 2
      },
      {
        id: '2',
        author: 'Father',
        content: 'We need to restock the spices soon.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        likes: 1
      }
    ];
  }

  async function addComment() {
    if (!newComment.trim() || isSubmitting) return;

    isSubmitting = true;

    try {
      const comment = {
        id: Date.now().toString(),
        author: $userProfile.name || 'Anonymous',
        content: newComment.trim(),
        timestamp: new Date().toISOString(),
        likes: 0
      };

      comments = [...comments, comment];
      newComment = '';
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function likeComment(commentId: string) {
    comments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
  }

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h3 class="card-title">
      <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
      Discussion ({comments.length})
    </h3>

    <!-- Comments List -->
    <div class="space-y-4 max-h-64 overflow-y-auto">
      {#each comments as comment}
        <div class="flex gap-3">
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-8">
              <span class="text-xs">{comment.author.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium text-sm">{comment.author}</span>
              <span class="text-xs text-base-content/50">{formatTimestamp(comment.timestamp)}</span>
            </div>
            <p class="text-sm">{comment.content}</p>
            <div class="flex items-center gap-4 mt-2">
              <button
                class="btn btn-ghost btn-xs"
                on:click={() => likeComment(comment.id)}
              >
                <Icon icon="heroicons:heart" class="w-4 h-4" />
                {comment.likes}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Add Comment -->
    <div class="divider"></div>
    <div class="flex gap-2">
      <textarea
        bind:value={newComment}
        class="textarea textarea-bordered flex-1"
        placeholder="Add a comment..."
        rows="2"
        on:keydown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addComment();
          }
        }}
      ></textarea>
      <button
        class="btn btn-primary"
        on:click={addComment}
        disabled={!newComment.trim() || isSubmitting}
      >
        {#if isSubmitting}
          <span class="loading loading-spinner loading-sm"></span>
        {:else}
          <Icon icon="heroicons:paper-airplane" class="w-4 h-4" />
        {/if}
      </button>
    </div>
  </div>
</div>