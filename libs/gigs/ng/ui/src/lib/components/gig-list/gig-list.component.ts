import { AfterViewInit, Component, computed, inject, input, signal } from '@angular/core';
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
  filterBySellerUid = input<string>();
  gigs = input<I_Gig[]>([]);

  gigService = inject(GigsService);

  allGigs = signal<I_Gig[]>([]);

  gigsToShow = computed(() => {
    const filterByCategory = this.filterByCategoryId();
    const filterBySeller = this.filterBySellerUid();
    if (!filterByCategory && !filterBySeller) return this.allGigs();
    let filteredGigs = this.allGigs();
    if (filterByCategory) {
      filteredGigs = filteredGigs.filter((gig) => gig.categories.includes(filterByCategory));
    }
    if (filterBySeller) {
      filteredGigs = filteredGigs.filter((gig) => gig.sellerUID === filterBySeller);
    }
    return filteredGigs;
  });

  ngAfterViewInit(): void {
    if (this.gigs().length > 0) {
      this.allGigs.set(this.gigs());
    } else {
      this.gigService.getAllGigs().then((gigs) => {
        this.allGigs.set(gigs);
      });
    }
  }
}
