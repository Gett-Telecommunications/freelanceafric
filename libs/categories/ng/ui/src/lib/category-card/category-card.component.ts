import { Component, InputSignal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-category-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  category: InputSignal<I_Category> = input.required<I_Category>();
}
