import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGigComponent } from '@freelanceafric/gigs-ui';
import { ActivatedRoute } from '@angular/router';
import { GigsService } from '@freelanceafric/gigs-data-access';

@Component({
  selector: 'lib-admin-dashboard-gigs-approve-actions-page',
  standalone: true,
  imports: [CommonModule, ViewGigComponent],
  templateUrl: './admin-dashboard-gigs-approve-actions-page.component.html',
  styleUrl: './admin-dashboard-gigs-approve-actions-page.component.scss',
})
export class AdminDashboardGigsApproveActionsPageComponent implements OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  gigService = inject(GigsService);

  gigId = signal<string>('');

  routeSub = this.activatedRoute.paramMap.subscribe((params) => {
    this.gigId.set(params.get('r_gigId') || '');
  });

  async approveGigInfo(status: 'approved' | 'rejected') {
    if (!this.gigId()) throw new Error('Gig ID not found when trying to approve gig info');
    let message: string | null = null;
    if (status !== 'approved') {
      message = prompt('Please enter a message for the reason to reject the gig');
      if (!message) throw new Error('No message provided');
      return;
    }
    try {
      await this.gigService.approveGig(this.gigId(), status, message || '');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
