import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardAdminPageComponent } from './pages/admin-page/dashboard-admin-page.component';
import { DashboardSellerPageComponent } from './pages/seller-page/dashboard-seller-page.component';
import { DashboardBuyerPageComponent } from './pages/buyer-page/dashboard-buyer-page.component';
import { SellerProfilePageComponent } from '@freelanceafric/pages-ng-feature';
import { SellerGigsPageComponent } from './users/seller/seller-gigs-page/seller-gigs-page.component';
import { SellerNewGigPageComponent } from './users/seller/seller-new-gig-page/seller-new-gig-page.component';
import { SellerGigPreviewPageComponent } from './users/seller/seller-gig-preview-page/seller-gig-preview-page.component';
import { DashboardOrdersPageComponent } from './pages/orders-page/dashboard-orders-page.component';
import { OrderDetailsPageComponent } from '@freelanceafric/orders-feature';

export const dashboardNgFeatureRoutes: Route[] = [
  {
    path: '',
    component: DashboardPageComponent,
    title: 'Dashboard | Freelance Afric',
    children: [
      {
        path: '',
        title: 'Welcome Dashboard | Freelance Afric',
        loadChildren: () => import('@freelanceafric/users-ng-feature').then((m) => m.usersAdminFeatureRoutes),
      },
      {
        path: 'profile',
        title: 'My Profile| Freelance Afric',
        loadChildren: () => import('@freelanceafric/users-ng-feature').then((m) => m.usersFeatureRoutes),
      },
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
          {
            path: 'gigs',
            component: SellerGigsPageComponent,
            title: 'My Gigs | Freelance Afric',
            children: [
              {
                path: 'new',
                component: SellerNewGigPageComponent,
                title: 'Create new Gig | Freelance Afric',
              },
              {
                path: 'preview/:r_gigId',
                component: SellerGigPreviewPageComponent,
                title: 'Preview Gig | Freelance Afric',
              },
            ],
          },
          {
            path: 'orders',
            component: DashboardOrdersPageComponent,
            title: 'My Orders | Freelance Afric',
            data: {
              userRole: 'seller',
            },
            children: [
              {
                path: ':r_orderId',
                component: OrderDetailsPageComponent,
                title: 'Order Details | Freelance Afric',
              },
            ],
          },
        ],
      },
      {
        path: 'buy',
        component: DashboardBuyerPageComponent,
        title: 'Buy | Freelance Afric',
        children: [
          {
            path: 'orders',
            component: DashboardOrdersPageComponent,
            title: 'My Orders | Freelance Afric',
            data: {
              userRole: 'buyer',
            },
            children: [
              {
                path: ':r_orderId',
                component: OrderDetailsPageComponent,
                title: 'Order Details | Freelance Afric',
              },
            ],
          },
        ],
      },
    ],
  },
];
