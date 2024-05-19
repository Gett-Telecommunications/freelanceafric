import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@freelanceafric/auth-ng-feature').then((m) => m.authNgFeatureRoutes),
  },
];
