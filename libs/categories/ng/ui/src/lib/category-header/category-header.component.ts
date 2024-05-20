import { Component, InputSignal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-category-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.scss',
})
export class CategoryHeaderComponent {
  category: InputSignal<I_Category> = input.required<I_Category>();
}
