import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gurukuladesam.divinenest',
  appName: 'Divine Nest',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {},
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
