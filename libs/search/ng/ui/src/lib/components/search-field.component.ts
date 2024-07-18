import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  showFilters = input<boolean>(false);
  mode = input.required<'full' | 'compact'>();
  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });
  filtersForm = new FormGroup({
    typeFilter: new FormControl('all'),
  });
}
