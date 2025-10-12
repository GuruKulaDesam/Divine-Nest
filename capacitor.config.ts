import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gurukuladesam.homemanagementsuite',
  appName: 'Home Management Suite',
  webDir: 'dist',
  plugins: {
    SQLite: {
      iosDatabaseLocation: 'Library/Caches/HomeManagementSuite',
      iosIsEncryption: false,
      iosKeychainPrefix: 'divine_nest',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite'
      },
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
        biometricSubTitle: 'Log in using your biometric'
      },
      electronWindowsLocation: 'C:\\ProgramData\\DivineNest',
      electronMacLocation: '/Library/Application Support/DivineNest',
      electronLinuxLocation: '~/.config/DivineNest'
    },
    FirebaseCrashlytics: {
      enabled: true,
    },
    Geolocation: {},
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#8b5cf6',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    },
    path: 'android',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
