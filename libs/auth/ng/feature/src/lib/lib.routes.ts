import { Route } from '@angular/router';
import { AuthLoginPageComponent } from './pages/login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from './pages/register-page/auth-register-page.component';

export const authNgFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: AuthLoginPageComponent, title: 'Login | Freelance Afric' },
  { path: 'register', component: AuthRegisterPageComponent, title: 'Register | Freelance Afric' },
  { path: '**', redirectTo: 'login' },
];
