# Wake-on-Tap Feature Implementation

## Overview

The Divine Nest app now supports **wake-on-tap** functionality that activates voice recognition when the user taps near the front camera (proximity sensor area), even when the device is locked or the app is in the background.

## How It Works

### 1. Proximity Sensor Detection
- Uses device proximity sensor to detect when something is near the front of the device
- Implements consecutive reading validation to prevent false activations
- Supports both native Android proximity sensor and fallback simulation

### 2. Background Service
- Runs proximity monitoring in the background
- Triggers wake events when proximity threshold is met
- Automatically activates voice assistant upon detection

### 3. Voice Activation
- Immediately starts voice recognition when wake is detected
- Bypasses lock screen for emergency voice commands
- Integrates with existing Shivo Voice Assistant

## Technical Implementation

### Core Components

#### ProximitySensorService (`src/lib/services/proximitySensor.ts`)
```typescript
// Main proximity sensor monitoring service
const proximitySensor = new ProximitySensorService({
  threshold: 5,      // 5cm detection threshold
  interval: 100,     // Check every 100ms
  enableBackground: true
});

// Start monitoring
await proximitySensor.startMonitoring();

// Listen for proximity events
proximitySensor.addListener((event) => {
  if (event.isNear) {
    // Trigger wake event
  }
});
```

#### WakeOnTapService (`src/lib/services/wakeOnTapService.ts`)
```typescript
// Background wake service
const wakeOnTapService = new WakeOnTapService();

// Start monitoring
await wakeOnTapService.startMonitoring();

// Listen for wake events
wakeOnTapService.addWakeListener((event) => {
  if (event.triggeredBy === 'proximity') {
    // Activate voice assistant
  }
});
```

#### WakeOnTapHandler Component (`src/lib/components/WakeOnTapHandler.svelte`)
```svelte
<!-- Integrates wake functionality into the app -->
<WakeOnTapHandler bind:isVisible={voiceVisible} />
```

### Android Permissions

Added to `android/app/src/main/AndroidManifest.xml`:
```xml
<!-- Wake lock for background execution -->
<uses-permission android:name="android.permission.WAKE_LOCK" />

<!-- Foreground service permission -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

<!-- Location permissions -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Body sensors for proximity (API 20-22) -->
<uses-permission android:name="android.permission.BODY_SENSORS" android:maxSdkVersion="22" />

<!-- Fingerprint permission for some devices -->
<uses-permission android:name="android.permission.USE_FINGERPRINT" />

<!-- Proximity sensor feature -->
<uses-feature android:name="android.hardware.sensor.proximity" android:required="false" />
```

### Capacitor Plugin

Custom plugin interface for native proximity sensor access:
```typescript
// src/lib/plugins/ProximitySensor.ts
export interface ProximitySensorPlugin {
  startMonitoring(options?: { threshold?: number }): Promise<{ success: boolean }>;
  stopMonitoring(): Promise<{ success: boolean }>;
  getProximityState(): Promise<{ isNear: boolean; distance?: number }>;
  addListener(eventName: 'proximityChange', listenerFunc: (event) => void): Promise<PluginListenerHandle>;
}
```

## Usage

### Testing the Feature

1. **Open the mobile app**: Navigate to `/mobile` route
2. **Test button**: In development mode, a red test button appears in bottom-right corner
3. **Simulated wake**: Click the test button to simulate proximity detection
4. **Voice activation**: Voice assistant should appear immediately

### Production Usage

1. **Physical activation**: Tap near the front camera area when device is locked
2. **Background monitoring**: App monitors proximity even when in background
3. **Voice commands**: Start speaking immediately after wake detection

## Limitations & Considerations

### Platform Limitations

- **Lock screen bypass**: True "even when locked" functionality requires special OEM permissions or device admin access, which is restricted for standard apps
- **Background execution**: Limited by Android's background execution restrictions
- **Proximity sensor**: Not all devices have reliable proximity sensors

### Current Implementation

- **Fallback simulation**: Uses device orientation simulation when native sensor unavailable
- **Consecutive validation**: Requires 3 consecutive "near" readings to prevent false activation
- **Cooldown period**: 3-second cooldown between wake events to prevent spam

### Future Enhancements

1. **Native Android Plugin**: Full native implementation with wake locks
2. **iOS Support**: Add iOS proximity sensor support
3. **Advanced Permissions**: Request device admin permissions for full lock-screen bypass
4. **Gesture Recognition**: Detect specific tap patterns on camera area

## Emergency Features

The wake-on-tap feature is designed for emergency situations:

- **Immediate activation**: No need to unlock device first
- **Voice-first interface**: Hands-free operation
- **Role-aware commands**: Context-aware voice commands based on user role
- **Location tracking**: Includes location data in wake events for emergency response

## Testing

### Development Testing

```bash
# Start development server
npm run dev

# Open mobile route
# http://localhost:5173/mobile

# Use test button (red button in bottom-right) to simulate wake events
```

### Device Testing

```bash
# Build for Android
npm run android:build

# Run on device
npm run android:run
```

## Troubleshooting

### Common Issues

1. **Proximity not detected**: Check device has proximity sensor
2. **Permissions denied**: Ensure app has required permissions
3. **Background not working**: Android background restrictions may apply
4. **Voice not activating**: Check microphone permissions

### Debug Information

Enable debug logging:
```javascript
// In browser console
localStorage.setItem('debug', 'wake-on-tap:*');
```

Check proximity sensor status:
```javascript
// In browser console
proximitySensor.isMonitoringActive(); // Should return true
wakeOnTapService.isMonitoringActive(); // Should return true
```