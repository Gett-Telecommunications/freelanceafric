import { Route } from '@angular/router';
import { OnboardingDashboardPageComponent } from './pages/dashboard-page/onboarding-dashboard-page.component';
import { OnboardingSellersPageComponent } from './pages/sellers-page/onboarding-sellers-page.component';

export const onboardingNgFeatureRoutes: Route[] = [
  { path: '', component: OnboardingDashboardPageComponent, title: 'Onboarding | Freelance Afric' },
  { path: 'welcome', component: OnboardingDashboardPageComponent, title: 'Onboarding | Freelance Afric' },
  { path: 'seller', component: OnboardingSellersPageComponent, title: 'Seller Onboarding | Freelance Afric' },
];
