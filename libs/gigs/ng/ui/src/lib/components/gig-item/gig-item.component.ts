import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '@freelanceafric/user-ng-data-access';
import { I_Favorite, T_FavoriteTypes } from '@freelanceafric/users-shared';

@Component({
  selector: 'lib-gig-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './gig-item.component.html',
  styleUrl: './gig-item.component.scss',
})
export class GigItemComponent {
  gig = input.required<I_Gig>();
  favoritesService = inject(FavoritesService);

  favorite = computed(() => {
    return this.favoritesService.gigFavorites().find((favorite) => favorite.itemId === this.gig().id);
  });

  async addToFavorites(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const type: T_FavoriteTypes = 'gig';
    const id = this.gig().id;
    const favorite: I_Favorite = { type, itemId: id, createdAt: new Date().toISOString(), id: '' };
    try {
      await this.favoritesService.addToFavorites(favorite);
    } catch (error) {
      console.error('Failed to create a favorite for gig', error);
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
