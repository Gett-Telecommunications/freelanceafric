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
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { GigListComponent } from '@freelanceafric/gigs-ui';

@Component({
  selector: 'lib-seller-profile-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, GigListComponent],
  templateUrl: './seller-profile-page.component.html',
  styleUrl: './seller-profile-page.component.scss',
})
export class SellerProfilePageComponent implements AfterViewInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private auth: Auth = inject(Auth);
  private sellerProfileService = inject(SellerProfileService);
  private fileManagementService = inject(FileManagementService);

  private user$ = user(this.auth);
  private user = signal<User | null>(null);

  routeData = signal<I_RouteData>({ self: false, adminMode: false });
  sellerProfile = signal<I_SellerProfile | null>(null);
  profilePicURL = signal('');

  async ngAfterViewInit(): Promise<void> {
    const routeData = (await firstValueFrom(this.route.data)) as I_RouteData;
    this.routeData.set(routeData);
  }

  userSub = this.user$.subscribe((user) => {
    this.user.set(user);
  });

  routeSub?: Subscription;
  constructor() {
    effect(async () => {
      const routeData = this.routeData();
      const user = this.user();

      // if the profile is supposed to fetch self then it should get the profile of the user that is logged in
      if (routeData.self) {
        const profile = await this.sellerProfileService.getMyProfile();
        if (profile) {
          this.sellerProfile.set(profile);
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
    effect(() => {
      const profile = this.sellerProfile();
      if (!profile) return;
      const uploadedImage = profile.profileImageID;
      if (!uploadedImage) return;
      this.fileManagementService.getFileDownloadURLById(uploadedImage).then((file) => {
        if (file) {
          this.profilePicURL.set(file);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

interface I_RouteData {
  self: boolean;
  adminMode: boolean;
}
