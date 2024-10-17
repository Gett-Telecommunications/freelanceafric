import { Route } from '@angular/router';
import { AdminDashboardHomePageComponent } from './pages/dashboard/dashboard-home-page/admin-dashboard-home-page.component';
import { AdminDashboardNewCategoryPageComponent } from './pages/dashboard/categories/new/admin-dashboard-new-category-page.component';
import {
  AdminDashboardCategoriesShellComponent,
  AdminDashboardGigsShellComponent,
  AdminDashboardUsersShellComponent,
} from '@freelanceafric/admin-ng-ui';
import { AdminDashboardUsersSellersPageComponent } from './pages/dashboard/users/sellers-page/admin-dashboard-users-sellers-page.component';
import { AdminDashboardUsersHomePageComponent } from './pages/dashboard/users/home-page/admin-dashboard-users-home-page.component';
import { AdminDashboardGigsApprovePageComponent } from './pages/dashboard/gigs/approve-page/admin-dashboard-gigs-approve-page.component';
import { AdminDashboardGigsApproveActionsPageComponent } from './pages/dashboard/gigs/approve-actions-page/admin-dashboard-gigs-approve-actions-page.component';

// ROUTE: /dashboard/admin
export const adminDashboardNgFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: AdminDashboardHomePageComponent, title: 'Home | Admin Dashboard | Freelance Afric' },
  {
    path: 'users',
    component: AdminDashboardUsersShellComponent,
    children: [
      { path: '', component: AdminDashboardUsersHomePageComponent },
      { path: 'home', component: AdminDashboardUsersHomePageComponent },
      { path: 'sellers', component: AdminDashboardUsersSellersPageComponent },
      { path: 'sellers/:r_seller_uid', component: AdminDashboardUsersSellersPageComponent },
    ],
  },
  {
    path: 'categories',
    component: AdminDashboardCategoriesShellComponent,
    children: [{ path: 'new', component: AdminDashboardNewCategoryPageComponent }],
    title: 'Categories | Admin Dashboard | Freelance Afric',
  },
  {
    path: 'gigs',
    component: AdminDashboardGigsShellComponent,
    children: [
      {
        path: 'approve',
        component: AdminDashboardGigsApprovePageComponent,
        children: [{ path: ':r_gigId', component: AdminDashboardGigsApproveActionsPageComponent }],
      },
    ],
    title: 'Gigs | Admin Dashboard | Freelance Afric',
  },
  { path: '**', redirectTo: 'home' },
];
