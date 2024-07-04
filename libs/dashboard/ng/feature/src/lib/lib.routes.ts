import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardAdminPageComponent } from './pages/admin-page/dashboard-admin-page.component';
import { DashboardSellerPageComponent } from './pages/seller-page/dashboard-seller-page.component';
import { DashboardBuyerPageComponent } from './pages/buyer-page/dashboard-buyer-page.component';
import { SellerProfilePageComponent } from '@freelanceafric/pages-ng-feature';

export const dashboardNgFeatureRoutes: Route[] = [
  {
    path: '',
    component: DashboardPageComponent,
    title: 'Dashboard | Freelance Afric',
    children: [
      {
        path: 'admin',
        component: DashboardAdminPageComponent,
        title: 'Admin | Freelance Afric',
        loadChildren: () => import('@freelanceafric/admin-ng-feature').then((m) => m.adminDashboardNgFeatureRoutes),
      },
      {
        path: 'sell',
        component: DashboardSellerPageComponent,
        title: 'Sell | Freelance Afric',
        children: [
          {
            path: 'my-profile',
            component: SellerProfilePageComponent,
            title: 'My Seller Profile | Freelance Afric',
            data: {
              self: true,
              adminMode: true,
            },
          },
        ],
      },
      { path: 'buy', component: DashboardBuyerPageComponent, title: 'Buy | Freelance Afric' },
    ],
  },
];
