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

export const pagesNgFeatureRoutes: Route[] = [
  {
    path: 'search',
    loadChildren: () => import('@freelanceafric/search-feature').then((m) => m.searchFeatureRoutes),
  },
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'become_a_seller', component: BecomeSellerPageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'category/:r_category_slug', component: CategoryPageComponent },
  { path: 'search', component: SearchResultsPageComponent },
  { path: 'gig/:r_gigId', component: GigPageComponent },
  { path: 'checkout/:r_gigId', component: CheckoutPageComponent },
  {
    path: 'seller/:r_seller_uid',
    component: SellerProfilePageComponent,
    title: 'Seller Profile | Freelance Afric',
    data: { self: false, adminMode: false },
  },
  { path: '**', component: NotFoundPageComponent },
];
