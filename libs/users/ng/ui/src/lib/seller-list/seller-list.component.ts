import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { SellerCardComponent } from '../seller-card/seller-card.component';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';

@Component({
  selector: 'lib-seller-list',
  standalone: true,
  imports: [CommonModule, SellerCardComponent],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss',
})
export class SellerListComponent {
  sellerService = inject(SellerProfileService);

  allSellers = signal<I_SellerProfile[]>([]);

  constructor() {
    this.sellerService.getAllSellerProfiles().then((sellers) => {
      this.allSellers.set(sellers);
    });
  }
}
