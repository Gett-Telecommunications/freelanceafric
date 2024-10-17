import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';

@Component({
  selector: 'lib-admin-dashboard-gigs-approve-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatButtonModule],
  templateUrl: './admin-dashboard-gigs-approve-page.component.html',
  styleUrl: './admin-dashboard-gigs-approve-page.component.scss',
})
export class AdminDashboardGigsApprovePageComponent {
  private gigService = inject(GigsService);

  gigs = signal<I_Gig[]>([]);

  constructor() {
    this.gigService.getAllGigs({ hideActive: true, showReview: true }).then((gigs) => {
      this.gigs.set(gigs);
    });
  }
}
