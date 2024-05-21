import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryCardComponent,
  CategoryHeaderComponent,
  NewCategoryFormComponent,
} from '@freelanceafric/categories-ng-ui';
import { I_Category } from '@freelanceafric/categories-shared';

@Component({
  selector: 'lib-admin-dashboard-new-category-page',
  standalone: true,
  imports: [CommonModule, NewCategoryFormComponent, CategoryCardComponent, CategoryHeaderComponent],
  templateUrl: './admin-dashboard-new-category-page.component.html',
  styleUrl: './admin-dashboard-new-category-page.component.scss',
})
export class AdminDashboardNewCategoryPageComponent {
  blankCategory: I_Category = {
    id: 'string',
    icon: 'string',
    slug: 'string',
    name: 'string',
    cardIntro: 'string',
    description: 'string',
    imageId: 'string',
    background: {
      style: 'string',
      imageId: 'string',
    },
    action: {
      link: 'string',
      label: 'string',
    },
  };
  editing = signal<I_Category>(this.blankCategory);
}
