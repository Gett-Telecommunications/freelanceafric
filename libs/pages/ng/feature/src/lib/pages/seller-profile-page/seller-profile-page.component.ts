import { AfterViewInit, Component, OnDestroy, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Auth, User } from '@angular/fire/auth';
import { user } from '@angular/fire/auth';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { GigListComponent } from '@freelanceafric/gigs-ui';
import { UsersSellerProfileComponent } from '@freelanceafric/users-ng-ui';

@Component({
  selector: 'lib-seller-profile-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, GigListComponent, UsersSellerProfileComponent],
  templateUrl: './seller-profile-page.component.html',
  styleUrl: './seller-profile-page.component.scss',
})
export class SellerProfilePageComponent implements AfterViewInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private auth: Auth = inject(Auth);
  private sellerProfileService = inject(SellerProfileService);

  routeData = signal<I_RouteData>({ self: false, adminMode: false });
  sellerProfile = signal<I_SellerProfile | null>(null);

  routeSub?: Subscription;
  constructor() {
    effect(async () => {
      const routeData = this.routeData();

      // if the profile is supposed to fetch self then it should get the profile of the user that is logged in
      if (routeData.self) {
        const profile = await this.sellerProfileService.getMyProfile();
        if (profile && profile.published) {
          this.sellerProfile.set(profile.published);
        }
      } else {
        // get the users profile uid from the route
        this.routeSub = this.route.paramMap.subscribe((params) => {
          const uid = params.get('r_seller_uid');
          if (!uid) return;
          this.sellerProfileService.getProfileByID(uid).then((profile) => {
            if (profile) {
              this.sellerProfile.set(profile);
            }
          });
        });
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const routeData = (await firstValueFrom(this.route.data)) as I_RouteData;
    this.routeData.set(routeData);
  }
}

interface I_RouteData {
  self: boolean;
  adminMode: boolean;
}
