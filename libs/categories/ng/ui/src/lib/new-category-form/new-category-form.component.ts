import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';

@Component({
  selector: 'lib-new-category-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-category-form.component.html',
  styleUrl: './new-category-form.component.scss',
})
export class NewCategoryFormComponent {
  editedCategory = output<I_Category>();
}
