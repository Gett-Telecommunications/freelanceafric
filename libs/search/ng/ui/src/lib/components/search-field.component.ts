import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, mergeMap, of, Subscription, switchMap } from 'rxjs';
import { SearchResultsComponent } from './search-results/search-results.component';
import { T_SearchFilterOptions } from '@freelanceafric/search-shared';

@Component({
  selector: 'lib-search-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule,
    SearchResultsComponent,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnDestroy {
  showFilters = input<boolean>(false);
  mode = input.required<'full' | 'compact'>();

  router = inject(Router);

  searchTerm = signal<string>('');
  searchFilter = signal<T_SearchFilterOptions>('all');

  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });
  filtersForm = new FormGroup({
    typeFilter: new FormControl<T_SearchFilterOptions>('all'),
  });

  searchFormsSub: Subscription = combineLatest([this.searchForm.valueChanges, this.filtersForm.valueChanges])
    .pipe(
      map(([searchFormValue, filtersFormValue]) => ({
        searchTerm: searchFormValue.searchTerm || '',
        typeFilter: filtersFormValue.typeFilter || 'all',
      })),
      distinctUntilChanged((prev, curr) => prev.searchTerm === curr.searchTerm && prev.typeFilter === curr.typeFilter),
    )
    .subscribe((value) => {
      this.searchTerm.set(value.searchTerm);
      this.searchFilter.set(value.typeFilter);
    });

  redirectSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        r_search_term: this.searchForm.value.searchTerm,
        r_search_filter: this.filtersForm.value.typeFilter,
      },
    });
  }

  ngOnDestroy(): void {
    this.searchFormsSub.unsubscribe();
  }
}
