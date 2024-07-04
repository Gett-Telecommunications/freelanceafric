import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-view-gig',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './view-gig.component.html',
  styleUrl: './view-gig.component.scss',
})
export class ViewGigComponent {
  gigService = inject(GigsService);

  gigId = input.required<string>();

  selectedGig = signal<I_Gig | null>(null);

  constructor() {
    effect(async () => {
      const gigId = this.gigId();
      const gig = await this.gigService.getGigById(gigId);
      if (gig) {
        this.selectedGig.set(gig);
      }
    });
  }
}
