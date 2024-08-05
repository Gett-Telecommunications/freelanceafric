import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BecomeSellerPageComponent } from './pages/become-seller-page/become-seller-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page.component';
import { GigPageComponent } from './pages/gig-page/gig-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { SellerProfilePageComponent } from './pages/seller-profile-page/seller-profile-page.component';
import { SupportPageComponent } from './pages/support-page/support-page.component';

export const pagesNgFeatureRoutes: Route[] = [
  {
    path: 'search',
    loadChildren: () => import('@freelanceafric/search-feature').then((m) => m.searchFeatureRoutes),
  },
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent, title: 'Home | Freelance Afric' },
  { path: 'become_a_seller', component: BecomeSellerPageComponent, title: 'Become a Seller | Freelance Afric' },
  { path: 'explore', component: ExplorePageComponent, title: 'Explore | Freelance Afric' },
  { path: 'categories', component: CategoriesPageComponent, title: 'Categories | Freelance Afric' },
  { path: 'category/:r_category_slug', component: CategoryPageComponent, title: 'Category | Freelance Afric' },
  { path: 'search', component: SearchResultsPageComponent, title: 'Search | Freelance Afric' },
  { path: 'gig/:r_gigId', component: GigPageComponent, title: 'Gig | Freelance Afric' },
  { path: 'checkout/:r_gigId', component: CheckoutPageComponent, title: 'Checkout | Freelance Afric' },
  {
    path: 'seller/:r_seller_uid',
    component: SellerProfilePageComponent,
    title: 'Seller Profile | Freelance Afric',
    data: { self: false, adminMode: false },
  },
  { path: 'support', component: SupportPageComponent, title: 'Customer Support | Freelance Afric' },
  { path: '**', component: NotFoundPageComponent, title: 'Page not Found | Freelance Afric' },
];
