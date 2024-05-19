export interface I_Environment {
  environment: 'development' | 'production';
  firebaseConfig: {
    projectId: string;
    appId: string;
    storageBucket: string;
    locationId: 'us-east1';
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
}
