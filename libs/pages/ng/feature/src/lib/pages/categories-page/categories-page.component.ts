import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '@freelanceafric/categories-ng-ui';

@Component({
  selector: 'lib-categories-page',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
})
export class CategoriesPageComponent {}
