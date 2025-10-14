<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let enabled = true;
  export let sensitivity = 0.8;

  const dispatch = createEventDispatcher<{
    gesture: { type: string; data?: any };
    tap: { count: number; position: { x: number; y: number } };
    swipe: { direction: string; distance: number };
    shake: { intensity: number };
  }>();

  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let tapCount = 0;
  let lastTapTime = 0;
  let shakeThreshold = 15;
  let shakeCount = 0;
  let lastShakeTime = 0;

  // Gesture recognition variables
  let gestureStartTime = 0;
  let gestureInProgress = false;

  // Enable gesture recognition
  $: if (enabled) {
    initializeGestureRecognition();
  }

  function initializeGestureRecognition() {
    if (typeof window === 'undefined') return;

    // Touch events for mobile/touch devices
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Mouse events for desktop fallback
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Device motion for shake detection
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    // Keyboard shortcuts as gesture fallback
    window.addEventListener('keydown', handleKeyDown);
  }

  function handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      gestureStartTime = Date.now();
      gestureInProgress = true;
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (!gestureInProgress || event.touches.length !== 1) return;

    event.preventDefault(); // Prevent scrolling during gesture
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detect swipe gestures
    if (distance > 50) {
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      let direction = '';

      if (angle >= -45 && angle <= 45) direction = 'right';
      else if (angle >= 45 && angle <= 135) direction = 'down';
      else if (angle >= -135 && angle <= -45) direction = 'up';
      else direction = 'left';

      dispatch('swipe', { direction, distance });
      gestureInProgress = false;
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!gestureInProgress) return;

    const touchEndTime = Date.now();
    const duration = touchEndTime - touchStartTime;
    const touch = event.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX);
    const deltaY = Math.abs(touch.clientY - touchStartY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detect tap gestures
    if (distance < 10 && duration < 300) {
      handleTap(touch.clientX, touch.clientY);
    }

    gestureInProgress = false;
  }

  function handleMouseDown(event: MouseEvent) {
    touchStartX = event.clientX;
    touchStartY = event.clientY;
    touchStartTime = Date.now();
    gestureStartTime = Date.now();
    gestureInProgress = true;
  }

  function handleMouseMove(event: MouseEvent) {
    if (!gestureInProgress) return;

    const deltaX = event.clientX - touchStartX;
    const deltaY = event.clientY - touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 50) {
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      let direction = '';

      if (angle >= -45 && angle <= 45) direction = 'right';
      else if (angle >= 45 && angle <= 135) direction = 'down';
      else if (angle >= -135 && angle <= -45) direction = 'up';
      else direction = 'left';

      dispatch('swipe', { direction, distance });
      gestureInProgress = false;
    }
  }

  function handleMouseUp(event: MouseEvent) {
    if (!gestureInProgress) return;

    const mouseUpTime = Date.now();
    const duration = mouseUpTime - touchStartTime;
    const deltaX = Math.abs(event.clientX - touchStartX);
    const deltaY = Math.abs(event.clientY - touchStartY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 10 && duration < 300) {
      handleTap(event.clientX, event.clientY);
    }

    gestureInProgress = false;
  }

  function handleTap(x: number, y: number) {
    const currentTime = Date.now();

    if (currentTime - lastTapTime < 300) {
      tapCount++;
    } else {
      tapCount = 1;
    }

    lastTapTime = currentTime;

    // Handle multi-tap gestures
    setTimeout(() => {
      if (tapCount > 0) {
        dispatch('tap', { count: tapCount, position: { x, y } });
        tapCount = 0;
      }
    }, 300);
  }

  function handleDeviceMotion(event: DeviceMotionEvent) {
    if (!event.accelerationIncludingGravity) return;

    const { x, y, z } = event.accelerationIncludingGravity;
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    if (acceleration > shakeThreshold) {
      const currentTime = Date.now();
      if (currentTime - lastShakeTime > 500) {
        shakeCount++;
        lastShakeTime = currentTime;

        // Trigger shake gesture after a few shakes
        if (shakeCount >= 3) {
          dispatch('shake', { intensity: acceleration });
          shakeCount = 0;
        }
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Keyboard shortcuts as gesture fallbacks
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        dispatch('gesture', { type: 'swipe_up' });
        break;
      case 'ArrowDown':
        event.preventDefault();
        dispatch('gesture', { type: 'swipe_down' });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        dispatch('gesture', { type: 'swipe_left' });
        break;
      case 'ArrowRight':
        event.preventDefault();
        dispatch('gesture', { type: 'swipe_right' });
        break;
      case ' ':
        event.preventDefault();
        dispatch('gesture', { type: 'tap' });
        break;
      case 'Enter':
        event.preventDefault();
        dispatch('gesture', { type: 'double_tap' });
        break;
    }
  }

  // Gesture action mapping
  export function mapGestureToAction(gesture: { type: string; data?: any }) {
    switch (gesture.type) {
      case 'tap':
        return { action: 'select', target: gesture.data?.position };
      case 'double_tap':
        return { action: 'activate', target: gesture.data?.position };
      case 'swipe_up':
        return { action: 'navigate', target: 'up' };
      case 'swipe_down':
        return { action: 'navigate', target: 'down' };
      case 'swipe_left':
        return { action: 'navigate', target: 'back' };
      case 'swipe_right':
        return { action: 'navigate', target: 'forward' };
      case 'shake':
        return { action: 'emergency', intensity: gesture.data?.intensity };
      default:
        return null;
    }
  }

  // Cleanup
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('keydown', handleKeyDown);
    }
  });
</script>

<!-- Gesture Recognition Component (Invisible) -->
<!-- Removed problematic window gesture listener that was causing hydration errors -->

{#if enabled}
  <!-- Visual feedback for gestures (optional) -->
  <div class="fixed bottom-24 right-6 z-40 pointer-events-none">
    <div class="bg-base-100/80 backdrop-blur-sm rounded-lg p-2 text-xs text-base-content/60">
      Gestures: Tap • Swipe • Shake
    </div>
  </div>
{/if}