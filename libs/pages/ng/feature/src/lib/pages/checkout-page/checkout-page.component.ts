import { AfterViewInit, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth, user, User } from '@angular/fire/auth';
import { I_Payment } from '@freelanceafric/payments-shared';
import { PaymentService } from '@freelanceafric/payments-data-access';
import { I_Order } from '@freelanceafric/orders-shared';
import { OrderService } from '@freelanceafric/orders-data-access';

@Component({
  selector: 'lib-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    GooglePayButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnDestroy, OnInit, AfterViewInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  gigService: GigsService = inject(GigsService);
  auth = inject(Auth);
  paymentService = inject(PaymentService);
  orderService = inject(OrderService);
  router = inject(Router);

  user$: Observable<User | null> = user(this.auth);

  gigId = signal<string>('');
  selectedGig = signal<I_Gig | null>(null);
  extrasPrice = signal<number>(0);
  processingFee = signal<number>(20);
  totalPrice = computed(() => {
    const selectedGig = this.selectedGig();
    if (!selectedGig) return 0;
    // return selectedGig.price + this.processingFee();
    return 0;
  });

  paymentDetailsForm = new FormGroup({
    additionalInstructions: new FormControl(''),
  });

  roueSub?: Subscription;

  ngOnInit(): void {
    this.roueSub = this.route.paramMap.subscribe((params) => {
      this.gigId.set(params.get('r_gigId') || '');
      this.gigService.getGigById(this.gigId()).then((gig) => {
        if (gig) {
          this.selectedGig.set(gig);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    interface WindowWithIntaSend extends Window {
      IntaSend: any;
    }
    const windowWithIntaSend = window as unknown as WindowWithIntaSend;
    windowWithIntaSend
      .IntaSend({
        // Replace with your Publishable Key
        publicAPIKey: 'ISPubKey_test_6a75ccea-e735-42c3-93d4-fe12c54bcbcc',
        live: false, //set to true when going live
      })
      .on('COMPLETE', (results: any) => {
        console.log('Do something on success', results);
      })
      .on('FAILED', (results: any) => {
        console.log('Do something on failure', results);
      })
      .on('IN-PROGRESS', (results: any) => {
        console.log('Payment in progress status', results);
      });
  }

  async makePayment() {
    const user = await firstValueFrom(this.user$);
    const selectedGig = this.selectedGig();
    if (!user) throw new Error('User not found when trying to make payment');
    if (!selectedGig) throw new Error('Gig not found when trying to make payment');
    const payment: I_Payment = {
      id: '',
      senderUID: user.uid,
      amount: this.totalPrice(),
      currency: 'KES',
      country: 'KE',
      status: 'INITIATED',
      type: 'ORDER',
      createdAt: new Date().toISOString(),
      reference: '',
    };
    const order: I_Order = {
      id: '',
      sellerUID: selectedGig.sellerUID,
      buyerUID: user.uid,
      gigId: selectedGig.id,
      extras: [],
      sellerStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      buyerStatus: 'PENDING_REVISION',
      buyerFurtherDetails: this.paymentDetailsForm.value.additionalInstructions || '',
    };
    try {
      const completedPayment = await this.paymentService.bypassPayment(payment);
      order.id = completedPayment.reference;
      await this.orderService.newOrder(order);
      this.router.navigate(['/dashboard', 'buy', 'orders', completedPayment.reference]);
    } catch (error) {
      console.error(error);
    }
  }

  onLoadPaymentData(event: any) {
    console.log('load payment data', event.detail);
  }

  ngOnDestroy(): void {
    this.roueSub?.unsubscribe();
  }
}
