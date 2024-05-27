import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { I_CustomClaims, defaultCustomClaims } from '@freelanceafric/shared-shared';

@Component({
  selector: 'lib-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  auth = inject(Auth);
  user$ = user(this.auth);

  claims: WritableSignal<I_CustomClaims> = signal(defaultCustomClaims);

  constructor(private router: Router) {
    this.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.claims.set(defaultCustomClaims);
        router.navigate(['/']);
      }
      const customClaims = (await user?.getIdTokenResult())?.claims;
      if (customClaims) {
        const _claims = { ...defaultCustomClaims, ...customClaims };
        this.claims.set(_claims);
      }
    });
  }

  logOut() {
    this.auth.signOut();
  }
}
