import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BecomeSellerPageComponent } from './pages/become-seller-page/become-seller-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page.component';

export const pagesNgFeatureRoutes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'become_a_seller', component: BecomeSellerPageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'category/:r_categoryId', component: CategoryPageComponent },
  { path: 'search', component: SearchResultsPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
