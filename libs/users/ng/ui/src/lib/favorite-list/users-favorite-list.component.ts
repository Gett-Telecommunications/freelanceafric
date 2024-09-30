import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile, T_FavoriteTypes } from '@freelanceafric/users-shared';
import { FavoritesService, SellerProfileService } from '@freelanceafric/user-ng-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { GigListComponent } from '@freelanceafric/gigs-ui';
import { SellerListComponent } from '../seller-list/seller-list.component';

@Component({
  selector: 'lib-users-favorite-list',
  standalone: true,
  imports: [CommonModule, GigListComponent, SellerListComponent],
  templateUrl: './users-favorite-list.component.html',
  styleUrl: './users-favorite-list.component.scss',
})
export class UsersFavoriteListComponent {
  type = input.required<T_FavoriteTypes>();

  favoritesService = inject(FavoritesService);
  gigService = inject(GigsService);
  sellerService = inject(SellerProfileService);

  favoriteGigIDs = computed(() => {
    return this.favoritesService.gigFavorites().map((gig) => gig.itemId);
  });
  favoriteSellerIDs = computed(() => {
    return this.favoritesService.sellerFavorites().map((seller) => seller.itemId);
  });

  gigs = signal<I_Gig[]>([]);
  sellers = signal<I_SellerProfile[]>([]);

  constructor() {
    effect(() => {
      this.gigService.getGigsByIDs(this.favoriteGigIDs()).then((gigs) => {
        this.gigs.set(gigs);
      });
    });

    effect(() => {
      this.sellerService.getProfileByIDs(this.favoriteSellerIDs()).then((sellers) => {
        this.sellers.set(sellers);
      });
    });
  }
}
