import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { SellerCardComponent } from '../seller-card/seller-card.component';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-seller-list',
  standalone: true,
  imports: [CommonModule, SellerCardComponent, MatInputModule, FormsModule],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss',
})
export class SellerListComponent {
  showHeader = input<boolean>(true);

  sellerService = inject(SellerProfileService);

  allSellers = signal<I_SellerProfile[]>([]);

  filterCategory = signal<string>('');
  filterSortBy = signal<T_SellerListSortBy>('name');
  filterSortOrder = signal<T_SellerListSortOrder>('asc');
  filterText = signal<string>('');

  sellersToShow = computed(() => {
    let showing = this.allSellers();
    const filterCategory = this.filterCategory();
    const filterSortBy = this.filterSortBy();
    const filterSortOrder = this.filterSortOrder();
    const filterText = this.filterText();

    if (filterCategory) {
      showing = showing.filter((seller) => seller.categoryIds?.includes(filterCategory));
    }
    if (filterText) {
      showing = showing.filter((seller) => seller.displayName.includes(filterText));
    }
    if (filterSortBy) {
      showing = showing.sort((a, b) => {
        switch (filterSortBy) {
          case 'name':
            return a.displayName.localeCompare(b.displayName);
          case 'dateCreated':
            return a.createdAt.localeCompare(b.createdAt);
        }
      });
    }
    if (filterSortOrder === 'desc') {
      showing = showing.reverse();
    }

    return showing;
  });

  textFilterForm = new FormGroup({
    filter: new FormControl(''),
  });
  categoryAndSortForm = new FormGroup({
    categories: new FormControl<string[]>([]),
    sortBy: new FormControl<T_SellerListSortBy>('name'),
    sortOrder: new FormControl<T_SellerListSortOrder>('asc'),
  });

  constructor() {
    this.sellerService.getAllSellerProfiles().then((sellers) => {
      this.allSellers.set(sellers);
    });
  }
}

export type T_SellerListSortBy = 'name' | 'dateCreated';

export type T_SellerListSortOrder = 'asc' | 'desc';
