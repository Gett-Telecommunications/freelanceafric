import { Route } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLAuth = () => redirectUnauthorizedTo(['auth']);

export const appRoutes: Route[] = [
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
];
