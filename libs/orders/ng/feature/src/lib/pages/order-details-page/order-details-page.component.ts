import { Component, computed, effect, inject, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { ActivatedRoute } from '@angular/router';
import { SellerProfileService } from '@freelanceafric/user-ng-data-access';
import { OrderService } from '@freelanceafric/orders-data-access';
import { I_Order } from '@freelanceafric/orders-shared';
import { SellerCardComponent } from '@freelanceafric/users-ng-ui';
import { OrderChatComponent } from '@freelanceafric/orders-ui';
import { Auth, User, user } from '@angular/fire/auth';
import { I_ChatMessage } from '@freelanceafric/shared-shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-order-details-page',
  standalone: true,
  imports: [CommonModule, SellerCardComponent, OrderChatComponent, MatButtonModule],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss',
})
export class OrderDetailsPageComponent implements OnDestroy {
  route = inject(ActivatedRoute);
  sellerService = inject(SellerProfileService);
  orderService = inject(OrderService);
  auth = inject(Auth);
  user$ = user(this.auth);

  user = signal<User | null>(null);
  message = signal<I_ChatMessage | undefined>(undefined);
  orderId = signal<string>('');
  order: WritableSignal<I_Order | null> = signal(null);
  seller: WritableSignal<I_SellerProfile | null> = signal(null);
  iAmThe: Signal<'buyer' | 'seller' | null> = computed(() => {
    const order = this.order();
    const user = this.user();
    if (!order || !user) {
      return null;
    }
    if (order.sellerUID === user.uid) {
      return 'seller';
    }
    if (order.buyerUID === user.uid) {
      return 'buyer';
    }
    return null;
  });

  routeSub = this.route.paramMap.subscribe((params) => {
    this.orderId.set(params.get('r_orderId') || '');
  });
  userSub = this.user$.subscribe((user) => {
    this.user.set(user);
  });

  constructor() {
    // fetch the order when the orderId is available
    effect(() => {
      const orderId = this.orderId();
      if (orderId) {
        this.orderService.getOrderById(orderId).then((order) => {
          if (order) {
            this.order.set(order);
          }
        });
      }
    });

    // fetch the seller's info when the order is available
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

  async sellerAcceptOrRejectGig(state: 'accept' | 'reject'): Promise<void> {
    this.message.set({
      id: '',
      senderUID: this.user()?.uid || '',
      type: 'notification',
      message: `Seller accepted the gig`,
      createdAt: new Date().toISOString(),
    });
    try {
      const iAmThe = this.iAmThe();
      if (!iAmThe) throw new Error('Not the right user');
      if (iAmThe !== 'seller') throw new Error('Not the right user');
      if (state === 'accept') {
        await this.orderService.sellerMarkAs(this.orderId(), 'accepted');
        return;
      } else if (state === 'reject') {
        const rejectReason = prompt('Enter reject reason');
        if (!rejectReason) throw new Error('Reject reason is required');
        await this.orderService.sellerMarkAs(this.orderId(), 'rejected', rejectReason);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async markAsCompleted(): Promise<void> {
    this.message.set({
      id: '',
      senderUID: this.user()?.uid || '',
      type: 'notification',
      message: `Order marked as completed by ${this.iAmThe()}`,
      createdAt: new Date().toISOString(),
    });
    try {
      const iAmThe = this.iAmThe();
      if (!iAmThe) throw new Error('Not the right user');
      await this.orderService.markAsCompleted(this.orderId(), iAmThe);
      return;
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
