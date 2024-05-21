import { Component, InputSignal, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { RouterModule } from '@angular/router';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';

@Component({
  selector: 'lib-category-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.scss',
})
export class CategoryHeaderComponent {
  fileService = inject(FileManagementService);

  backgroundImageURL = signal<string | null>(null);
  coverImageURL = signal<string | null>(null);

  category: InputSignal<I_Category> = input.required<I_Category>();

  constructor() {
    effect(() => {
      const _backgroundImageId = this.category().background.imageId;
      if (_backgroundImageId) {
        this.fileService.getFileDownloadURLById(_backgroundImageId).then((file) => {
          if (file) {
            this.backgroundImageURL.set(file);
          }
        });
      }
      const _coverImageId = this.category().imageId;
      if (_coverImageId) {
        this.fileService.getFileDownloadURLById(_coverImageId).then((file) => {
          if (file) {
            this.coverImageURL.set(file);
          }
        });
      }
    });
  }
}
