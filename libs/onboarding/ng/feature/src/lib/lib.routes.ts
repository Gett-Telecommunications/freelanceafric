import { Route } from '@angular/router';
import { OnboardingDashboardPageComponent } from './pages/dashboard-page/onboarding-dashboard-page.component';
import { OnboardingSellersPageComponent } from './pages/sellers-page/onboarding-sellers-page.component';

export const onboardingNgFeatureRoutes: Route[] = [
  { path: '', component: OnboardingDashboardPageComponent },
  { path: 'seller', component: OnboardingSellersPageComponent },
];
