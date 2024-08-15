import { Component, computed, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Order } from '@freelanceafric/orders-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { RouterModule } from '@angular/router';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { SellerCardComponent, UsersSellerProfileComponent } from '@freelanceafric/users-ng-ui';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';

@Component({
  selector: 'lib-order-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.scss',
})
export class OrderListItemComponent {
  order = input.required<I_Order>();
  role = input.required<'buyer' | 'seller'>();

  gigService = inject(GigsService);
  sellerService = inject(SellerProfileService);

  gig: WritableSignal<I_Gig | null> = signal(null);
  seller: WritableSignal<I_SellerProfile | null> = signal(null);

  link = computed(() => {
    const order = this.order();
    if (!order) return '';
    switch (this.role()) {
      case 'buyer':
        return `/dashboard/buy/orders`;
      case 'seller':
        return `/dashboard/sell/orders`;
    }
  });

  constructor() {
    // Fetch the gig for the order when the order is available
    effect(() => {
      const order = this.order();
      if (order) {
        this.gigService.getGigById(order.gigId).then((gig) => {
          if (gig) {
            this.gig.set(gig);
          }
        });
      }
    });

    // Fetch the seller for the order when the order is available
    effect(() => {
      const order = this.order();
      if (order) {
        this.sellerService.getProfileByID(order.sellerUID).then((seller) => {
          if (seller) {
            this.seller.set(seller);
          }
        });
      }
    });
  }
}
