import { AfterViewInit, Component, computed, effect, inject, input, signal } from '@angular/core';
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
export class GigListComponent implements AfterViewInit {
  filterByCategoryId = input<string>();
  filterBySellerUid = input.required<string | null>();
  gigs = input<I_Gig[] | null>(null);

  gigService = inject(GigsService);

  allGigs = signal<I_Gig[]>([]);

  gigsToShow = computed(() => {
    const filterByCategory = this.filterByCategoryId();
    if (!filterByCategory) return this.allGigs();
    let filteredGigs = this.allGigs();
    if (filterByCategory) {
      filteredGigs = filteredGigs.filter((gig) => gig.categories.includes(filterByCategory));
    }
    return filteredGigs;
  });

  constructor() {
    effect(
      async () => {
        if (this.filterBySellerUid()) {
          await this.loadData();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  async loadData() {
    console.log('gigsToShow', { uid: this.filterBySellerUid(), category: this.filterByCategoryId() });

    const sellerId = this.filterBySellerUid();
    if (this.gigs()) return;
    let gigsFromDB: I_Gig[] | null = null;
    if (sellerId) {
      gigsFromDB = await this.gigService.getGigsForSeller(sellerId);
    } else {
      gigsFromDB = await this.gigService.getAllGigs();
    }
    console.log('allGigs', { gigsFromDB });
    this.allGigs.set(gigsFromDB);
  }
}
