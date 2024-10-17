import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E_FileRoutes } from '@freelanceafric/shared-shared';
import { ActivatedRoute } from '@angular/router';
import { EditGigComponent } from '@freelanceafric/gigs-ui';

@Component({
  selector: 'lib-seller-gig-edit-page',
  standalone: true,
  imports: [CommonModule, EditGigComponent],
  templateUrl: './seller-gig-edit-page.component.html',
  styleUrl: './seller-gig-edit-page.component.scss',
})
export class SellerGigEditPageComponent implements OnDestroy {
  activatedRoute = inject(ActivatedRoute);

  currentGigId = signal<string>('');

  fileRoutes = E_FileRoutes;

  routeSub = this.activatedRoute.paramMap.subscribe((params) => {
    const gigId = params.get('r_gigId');
    if (gigId) {
      this.currentGigId.set(gigId);
    }
  });

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
