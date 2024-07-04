import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-checkout-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnDestroy, OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  gigService: GigsService = inject(GigsService);

  gigId = signal<string>('');
  selectedGig = signal<I_Gig | null>(null);

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

  ngOnDestroy(): void {
    this.roueSub?.unsubscribe();
  }
}
