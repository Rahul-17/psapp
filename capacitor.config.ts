import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.publicspeaking',
  appName: 'publicspeaking',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
