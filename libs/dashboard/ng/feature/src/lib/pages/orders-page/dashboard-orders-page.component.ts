import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '@freelanceafric/orders-ui';
import { Auth, user } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-dashboard-orders-page',
  standalone: true,
  imports: [CommonModule, OrderListComponent],
  templateUrl: './dashboard-orders-page.component.html',
  styleUrl: './dashboard-orders-page.component.scss',
})
export class DashboardOrdersPageComponent implements OnDestroy {
  auth = inject(Auth);
  user$ = user(this.auth);

  private route = inject(ActivatedRoute);

  role: WritableSignal<'buyer' | 'seller' | null> = signal(null);

  routerSub = this.route.data.subscribe((data) => {
    if (data['userRole']) {
      this.role.set(data['userRole']);
    }
  });

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
