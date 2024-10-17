import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GigItemComponent, ViewGigComponent } from '@freelanceafric/gigs-ui';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';

@Component({
  selector: 'lib-seller-gig-preview-page',
  standalone: true,
  imports: [CommonModule, ViewGigComponent, GigItemComponent],
  templateUrl: './seller-gig-preview-page.component.html',
  styleUrl: './seller-gig-preview-page.component.scss',
})
export class SellerGigPreviewPageComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  gigService: GigsService = inject(GigsService);

  gigId = signal<string>('');
  selectedGig = signal<I_Gig | null>(null);

  roueSub?: Subscription;

  ngOnInit(): void {
    this.roueSub = this.route.paramMap.subscribe((params) => {
      this.gigId.set(params.get('r_gigId') || '');
      this.gigService.getGigById(this.gigId(), true).then((gig) => {
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
