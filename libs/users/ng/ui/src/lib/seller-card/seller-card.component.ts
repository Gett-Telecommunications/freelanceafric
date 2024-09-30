import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Favorite, I_SellerProfile } from '@freelanceafric/users-shared';
import { RouterModule } from '@angular/router';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { FavoritesService } from '@freelanceafric/user-ng-data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-seller-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.scss',
})
export class SellerCardComponent {
  sellerProfile = input.required<I_SellerProfile>();

  fileManagementService = inject(FileManagementService);
  favoritesService = inject(FavoritesService);

  favorite = computed(() => {
    return this.favoritesService.sellerFavorites().find((favorite) => favorite.itemId === this.sellerProfile().uid);
  });

  profilePicURL = signal('');

  constructor() {
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

  async addToFavorites(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const type = 'seller';
    const uid = this.sellerProfile().uid;
    const favorite: I_Favorite = { type, itemId: uid, createdAt: new Date().toISOString(), id: '' };
    try {
      await this.favoritesService.addToFavorites(favorite);
    } catch (error) {
      console.error('Failed to create a favorite', error);
    }
  }

  async removeFromFavorites(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const favorite = this.favorite();
    if (!favorite) throw new Error('Favorite not found');
    try {
      this.favoritesService.deleteFavorite(favorite.id);
    } catch (error) {
      console.log('Failed to remove from favorites', error);
    }
  }
}
