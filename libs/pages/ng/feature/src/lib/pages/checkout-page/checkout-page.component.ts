import { AfterViewInit, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth, user, User } from '@angular/fire/auth';

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

  user$: Observable<User | null> = user(this.auth);

  gigId = signal<string>('');
  selectedGig = signal<I_Gig | null>(null);
  extrasPrice = signal<number>(0);
  processingFee = signal<number>(20);
  totalPrice = computed(() => {
    const selectedGig = this.selectedGig();
    if (!selectedGig) return 0;
    return selectedGig.price + this.processingFee();
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

  onLoadPaymentData(event: any) {
    console.log('load payment data', event.detail);
  }

  ngOnDestroy(): void {
    this.roueSub?.unsubscribe();
  }
}
