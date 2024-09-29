import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { T_SearchFilterOptions } from '@freelanceafric/search-shared';
import { SearchService } from '@freelanceafric/search-data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  searchFilter = input.required<T_SearchFilterOptions>();
  searchTerm = input.required<string>();

  private searchService = inject(SearchService);

  searchResults = computed(async () => {
    const term = this.searchTerm();
    const filter = this.searchFilter();

    if (!term) return [];

    return await firstValueFrom(this.searchService.searchAll(term, filter));
  });
}
