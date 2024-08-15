import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '@freelanceafric/orders-data-access';
import { I_Order } from '@freelanceafric/orders-shared';
import { OrderListItemComponent } from '../order-list-item/order-list-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-order-list',
  standalone: true,
  imports: [CommonModule, OrderListItemComponent, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  role = input.required<'buyer' | 'seller'>();
  userUID = input.required<string>();

  orderService = inject(OrderService);

  orders: WritableSignal<I_Order[]> = signal([]);

  ngOnInit(): void {
    this.orderService.getOrdersByUserUID(this.userUID(), this.role()).then((orders) => {
      if (orders) {
        this.orders.set(orders);
      }
    });
  }
}
