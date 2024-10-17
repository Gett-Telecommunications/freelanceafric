import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { Auth, user } from '@angular/fire/auth';
import { of, switchMap } from 'rxjs';
import { Unsubscribe } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-seller-gigs-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './seller-gigs-page.component.html',
  styleUrl: './seller-gigs-page.component.scss',
})
export class SellerGigsPageComponent implements OnDestroy {
  gigsService = inject(GigsService);
  auth = inject(Auth);
  user$ = user(this.auth);

  allMyGigs = signal<I_Gig[]>([]);

  unsub?: Unsubscribe;
  sub = this.user$
    .pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.gigsService.getGigsForSeller$(user.uid, {
          showDraft: true,
          orderDirection: 'asc',
        });
      }),
    )
    .subscribe((gigData) => {
      if (!gigData) return;
      const { gigs, unsub } = gigData;
      if (unsub) this.unsub = unsub;
      this.allMyGigs.set(gigs);
    });

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
