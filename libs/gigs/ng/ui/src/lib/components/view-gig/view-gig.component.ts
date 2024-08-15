import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SellerCardComponent } from '@freelanceafric/users-ng-ui';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';

@Component({
  selector: 'lib-view-gig',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, SellerCardComponent],
  templateUrl: './view-gig.component.html',
  styleUrl: './view-gig.component.scss',
})
export class ViewGigComponent {
  gigId = input.required<string>();

  gigService = inject(GigsService);
  sellerProfileService = inject(SellerProfileService);

  selectedGig = signal<I_Gig | null>(null);
  sellerProfile = signal<I_SellerProfile | null>(null);

  constructor() {
    effect(async () => {
      const gigId = this.gigId();
      const gig = await this.gigService.getGigById(gigId);
      if (gig) {
        this.selectedGig.set(gig);
      }
    });

    effect(async () => {
      // get the seller profile
      const selectedGig = this.selectedGig();
      if (!selectedGig) return;
      const sellerProfile = await this.sellerProfileService.getProfileByID(selectedGig.sellerUID);
      if (sellerProfile) {
        this.sellerProfile.set(sellerProfile);
      }
    });
  }
}
