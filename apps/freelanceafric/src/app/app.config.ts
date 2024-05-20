import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { environment } from '../environments/environment';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.environment === 'development') {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        return firestore;
      }
      return firestore;
    }),
    provideStorage(() => {
      const fireStorage = getStorage();
      if (environment.environment === 'development') {
        connectStorageEmulator(fireStorage, 'localhost', 9199);
        return fireStorage;
      }
      return fireStorage;
    }),
    provideAuth(() => {
      const auth = getAuth();
      console.log('ENV:', environment.environment);
      if (environment.environment === 'development') {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        return auth;
      }
      return auth;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.environment === 'development') {
        connectFunctionsEmulator(functions, 'localhost', 5001);
        return functions;
      }
      return functions;
    }),
    ScreenTrackingService,
    UserTrackingService,
    provideAppCheck(() => {
      if (environment.environment === 'development') {
        const provider = new ReCaptchaEnterpriseProvider('something');
        self['FIREBASE_APPCHECK_DEBUG_TOKEN'] = true;
        return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
      }
      const provider = new ReCaptchaEnterpriseProvider('6LcahOEpAAAAALZDHDI3DNkgAG-r_EsHUO-v7_BU');
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI()),
    provideToastr(),
    provideAnimationsAsync(),
  ],
};
