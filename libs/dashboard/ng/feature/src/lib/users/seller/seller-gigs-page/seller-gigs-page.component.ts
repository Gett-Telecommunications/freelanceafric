import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'lib-seller-gigs-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './seller-gigs-page.component.html',
  styleUrl: './seller-gigs-page.component.scss',
})
export class SellerGigsPageComponent implements OnDestroy {
  gigsService = inject(GigsService);
  auth = inject(Auth);
  user$ = user(this.auth);

  allMyGigs = signal<I_Gig[]>([]);

  userSub = this.user$.subscribe((user) => {
    if (!user) return;
    this.gigsService.getGigsForSeller(user.uid).then((gigs) => {
      this.allMyGigs.set(gigs);
    });
  });

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
