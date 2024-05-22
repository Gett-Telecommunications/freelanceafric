import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'lib-category-list',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoriesService);

  categories = signal<I_Category[]>([]);

  ngOnInit(): void {
    this.categoryService
      .getAllCategories()
      .then((categories) => {
        this.categories.set(categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
