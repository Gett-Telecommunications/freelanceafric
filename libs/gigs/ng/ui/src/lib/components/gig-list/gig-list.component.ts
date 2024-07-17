import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigItemComponent } from '../gig-item/gig-item.component';

@Component({
  selector: 'lib-gig-list',
  standalone: true,
  imports: [CommonModule, GigItemComponent],
  templateUrl: './gig-list.component.html',
  styleUrl: './gig-list.component.scss',
})
export class GigListComponent {
  gigService = inject(GigsService);

  allGigs = signal<I_Gig[]>([]);

  constructor() {
    this.gigService.getAllGigs().then((gigs) => {
      this.allGigs.set(gigs);
    });
  }
}
