import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardAdminPageComponent } from './pages/admin-page/dashboard-admin-page.component';
import { DashboardSellerPageComponent } from './pages/seller-page/dashboard-seller-page.component';
import { DashboardBuyerPageComponent } from './pages/buyer-page/dashboard-buyer-page.component';

export const dashboardNgFeatureRoutes: Route[] = [
  {
    path: '',
    component: DashboardPageComponent,
    title: 'Dashboard | Freelance Afric',
    children: [
      { path: 'admin', component: DashboardAdminPageComponent, title: 'Admin | Freelance Afric' },
      { path: 'sell', component: DashboardSellerPageComponent, title: 'Sell | Freelance Afric' },
      { path: 'buy', component: DashboardBuyerPageComponent, title: 'Buy | Freelance Afric' },
    ],
  },
];
