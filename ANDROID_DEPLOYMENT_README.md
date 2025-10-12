# Divine Nest - Android App Deployment Guide

This guide explains how to build and deploy the Divine Nest family management app as a native Android application using Capacitor.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Android Studio** (latest version recommended)
3. **Java Development Kit (JDK)** (v11 or higher)
4. **Android SDK** with API level 22+ (Android 5.1+)

## Project Setup

The project has been configured with Capacitor for Android deployment:

- **App ID**: `com.gurukuladesam.divinenest`
- **App Name**: `Divine Nest`
- **Web Assets**: Built from `dist/` directory
- **PWA Features**: Service worker, offline support, push notifications

## Build Scripts

### Development Build
```bash
# Build web assets and sync to Android project
npm run android:build

# Open Android Studio
npm run android:open

# Run on connected device/emulator
npm run android:run
```

### Production Builds
```bash
# Build debug APK
npm run android:build-debug

# Build release APK (requires keystore setup)
npm run android:build-release
```

## Android App Configuration

### Icons and Splash Screens
- Icons are automatically generated in various sizes (72px to 512px)
- Splash screens are generated for different screen densities
- All assets are cached by the service worker for offline use

### Permissions
The app includes the following Android permissions:
- `INTERNET`: For API calls and web functionality
- File provider for sharing functionality

### Orientation
- Configured for portrait-primary orientation
- Responsive design adapts to different screen sizes

## Testing the Android App

### 1. Build the App
```bash
npm run android:build
```

### 2. Open in Android Studio
```bash
npm run android:open
```

### 3. Run on Device/Emulator
- Connect an Android device or start an emulator
- Click "Run" in Android Studio or use:
```bash
npm run android:run
```

### 4. Test Key Features
- [ ] App launches and shows splash screen
- [ ] Navigation between different sections works
- [ ] Offline functionality (service worker)
- [ ] PWA features (install prompt, offline cache)
- [ ] Responsive design on different screen sizes
- [ ] All family management features work

## Play Store Deployment

### 1. Generate Signed Release APK
```bash
# Create a keystore (first time only)
keytool -genkey -v -keystore divine-nest.keystore -alias divine-nest -keyalg RSA -keysize 2048 -validity 10000

# Build signed release APK
npm run android:build-release
```

### 2. Play Store Requirements
- **Minimum Android Version**: API 22 (Android 5.1)
- **Target Android Version**: Latest stable
- **App Bundle**: Use AAB format for Play Store
- **Privacy Policy**: Required for Play Store
- **Content Rating**: Family-friendly app

### 3. Play Store Listing
- **Title**: Divine Nest - Modern Family Dashboard
- **Short Description**: Comprehensive family management app for South Indian households
- **Full Description**: Include all features and benefits
- **Screenshots**: Capture from device (1080x1920 recommended)
- **Icon**: 512x512 PNG
- **Feature Graphic**: 1024x500 PNG

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Ensure Android SDK is properly installed
   - Check Java version: `java -version`
   - Update Capacitor: `npm install @capacitor/android@latest`

2. **App Won't Start**
   - Check device/emulator Android version (min API 22)
   - Verify web assets are built: `npm run build`
   - Check Android Studio logs for errors

3. **Icons Not Showing**
   - Run icon generation: `npm run generate-icons`
   - Sync Capacitor: `npx cap sync android`

4. **Network Issues**
   - Ensure INTERNET permission is granted
   - Check CORS settings for API calls

### Debug Mode
```bash
# Enable Chrome debugging
npm run android:run
# Open chrome://inspect in Chrome browser
```

## Performance Optimization

- **Bundle Size**: Web assets are minified and compressed
- **Caching**: Service worker caches static assets
- **Lazy Loading**: Components load on demand
- **Offline Support**: Critical features work offline

## Updates and Maintenance

- **Version Bumping**: Update version in `package.json` and `public/manifest.json`
- **Web Updates**: Rebuild and sync: `npm run android:build`
- **Native Updates**: Update Capacitor plugins as needed

## Support

For issues with Android deployment:
1. Check Capacitor documentation: https://capacitorjs.com/docs
2. Android Studio troubleshooting guides
3. Google Play Console developer support

---

**Ready for Play Store deployment!** 🚀