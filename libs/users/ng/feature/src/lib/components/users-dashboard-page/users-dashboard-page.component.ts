import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SellerCareerService, SellerProfileService, UserService } from '@freelanceafric/user-ng-data-access';
import { UsersFavoriteListComponent } from '@freelanceafric/users-ng-ui';
import { I_SellerCareer, I_SellerProfile, T_FavoriteTypes } from '@freelanceafric/users-shared';

@Component({
  selector: 'lib-users-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, UsersFavoriteListComponent],
  templateUrl: './users-dashboard-page.component.html',
  styleUrl: './users-dashboard-page.component.scss',
})
export class UsersDashboardPageComponent {
  auth = inject(Auth);
  user$ = user(this.auth);

  userService = inject(UserService);
  sellerProfileService = inject(SellerProfileService);
  sellerCareerService = inject(SellerCareerService);

  mySellerProfiles = signal<{
    published: I_SellerProfile | null;
    draft: I_SellerProfile | null;
    review: I_SellerProfile | null;
  } | null>(null);
  mySellerCareers = signal<{
    published: I_SellerCareer | null;
    draft: I_SellerCareer | null;
    review: I_SellerCareer | null;
  } | null>(null);

  favoriteTypes: T_FavoriteTypes[] = ['gig', 'seller'];

  constructor() {
    this.sellerProfileService.getMyProfile().then((profiles) => {
      if (profiles) {
        this.mySellerProfiles.set(profiles);
      }
    });
    this.sellerCareerService.getMySellerCareer().then((careers) => {
      if (careers) {
        this.mySellerCareers.set(careers);
      }
    });
  }
}
