import { Route } from '@angular/router';
import { AdminDashboardHomePageComponent } from './pages/dashboard/dashboard-home-page/admin-dashboard-home-page.component';
import { AdminDashboardCategoriesPageComponent } from './pages/dashboard/categories/home-page/admin-dashboard-categories-page.component';
import { AdminDashboardNewCategoryPageComponent } from './pages/dashboard/categories/new/admin-dashboard-new-category-page.component';

export const adminDashboardNgFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: AdminDashboardHomePageComponent, title: 'Home | Admin Dashboard | Freelance Afric' },
  {
    path: 'categories',
    component: AdminDashboardCategoriesPageComponent,
    title: 'Categories | Admin Dashboard | Freelance Afric',
    children: [{ path: 'new', component: AdminDashboardNewCategoryPageComponent }],
  },
  { path: '**', redirectTo: 'home' },
];
