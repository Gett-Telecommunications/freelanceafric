import { Component, InputSignal, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-category-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  domSanitizer = inject(DomSanitizer);
  category: InputSignal<I_Category> = input.required<I_Category>();

  sanitizedSVG = computed(() => {
    return this.domSanitizer.bypassSecurityTrustHtml(this.category().icon);
  });
}
