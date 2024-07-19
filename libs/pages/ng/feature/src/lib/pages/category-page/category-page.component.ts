import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryHeaderComponent } from '@freelanceafric/categories-ng-ui';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';
import { ActivatedRoute } from '@angular/router';
import { I_Category } from '@freelanceafric/categories-shared';
import { GigListComponent } from '@freelanceafric/gigs-ui';

@Component({
  selector: 'lib-category-page',
  standalone: true,
  imports: [CommonModule, CategoryHeaderComponent, GigListComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss',
})
export class CategoryPageComponent implements OnDestroy {
  categoryService = inject(CategoriesService);
  route = inject(ActivatedRoute);

  category = signal<I_Category | null>(null);
  selectedCategorySlug = signal<string | null>(null);

  routeSub = this.route.paramMap.subscribe((params) => {
    this.selectedCategorySlug.set(params.get('r_category_slug') || null);
  });

  constructor() {
    effect(async () => {
      const selectedCategorySlug = this.selectedCategorySlug();
      if (!selectedCategorySlug) return;
      const category = await this.categoryService.getCategoryBySlug(selectedCategorySlug);
      if (category) {
        this.category.set(category);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
