import { Route } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PagesShellComponent } from '@freelanceafric/pages-ng-ui';
import { OnboardingShellComponent } from '@freelanceafric/onboarding-ng-ui';

const redirectUnauthorizedToLAuth = () => redirectUnauthorizedTo(['auth']);

export const appRoutes: Route[] = [
  {
    path: 'onboarding',
    component: OnboardingShellComponent,
    loadChildren: () => import('@freelanceafric/onboarding-ng-feature').then((m) => m.onboardingNgFeatureRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@freelanceafric/dashboard-ng-feature').then((m) => m.dashboardNgFeatureRoutes),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLAuth },
  },
  {
    path: 'auth',
    loadChildren: () => import('@freelanceafric/auth-ng-feature').then((m) => m.authNgFeatureRoutes),
  },
  {
    path: '',
    component: PagesShellComponent,
    loadChildren: () => import('@freelanceafric/pages-ng-feature').then((m) => m.pagesNgFeatureRoutes),
  },
  {
    path: '**',
    loadChildren: () => import('@freelanceafric/pages-ng-feature').then((m) => m.pagesNgFeatureRoutes),
  },
];
