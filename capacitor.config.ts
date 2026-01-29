import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tech.aisod.paied',
  appName: 'PAIED Program',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'https://aisodx.tech',
      'https://www.aisod.tech',
      'https://www.aisodinstitute.tech',
      'https://paied.aisodx.tech'
    ]
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined
    },
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#0ea5e9'
    }
  }
};

export default config;
