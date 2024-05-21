import { Component, OnDestroy, computed, effect, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Category } from '@freelanceafric/categories-shared';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from '@freelanceafric/shared-ng-ui';
import { E_FileRoutes, I_File } from '@freelanceafric/shared-shared';
import { Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';

@Component({
  selector: 'lib-new-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent, MatInputModule, MatButtonModule],
  templateUrl: './new-category-form.component.html',
  styleUrl: './new-category-form.component.scss',
})
export class NewCategoryFormComponent implements OnDestroy {
  editedCategory = output<I_Category>();

  categoryService = inject(CategoriesService);

  backgroundImage = signal<Partial<I_File[]>>([]);
  categoryImage = signal<Partial<I_File[]>>([]);
  formValue = signal<{
    icon?: string | null | undefined;
    slug?: string | null | undefined;
    name?: string | null | undefined;
    cardIntro?: string | null | undefined;
    description?: string | null | undefined;
    backgroundStyle?: string | null | undefined;
    actionLabel?: string | null | undefined;
    actionLink?: string | null | undefined;
  }>({
    icon: '',
    slug: '',
    name: '',
    cardIntro: '',
    description: '',
    backgroundStyle: '',
    actionLabel: '',
    actionLink: '',
  });

  formattedCategory = computed(() => {
    const formVal = this.formValue();
    const categoryImageId = this.categoryImage().length > 0 ? this.categoryImage()[0]?.id : '';
    const backgroundImageId = this.backgroundImage().length > 0 ? this.backgroundImage()[0]?.id : '';
    const category: I_Category = {
      id: 'string',
      icon: formVal.icon || '',
      slug: formVal.slug || '',
      name: formVal.name || '',
      cardIntro: formVal.cardIntro || '',
      description: formVal.description || '',
      imageId: categoryImageId || '',
      background: {
        style: formVal.backgroundStyle || '',
        imageId: backgroundImageId || '',
      },
      action: {
        link: formVal.actionLink || '',
        label: formVal.actionLabel || '',
      },
    };
    return category;
  });

  fileRoutes = E_FileRoutes;

  newCategoryForm = new FormGroup({
    icon: new FormControl(null, Validators.required),
    slug: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    cardIntro: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    backgroundStyle: new FormControl(null, Validators.required),
    actionLabel: new FormControl(null, Validators.required),
    actionLink: new FormControl(null, Validators.required),
  });

  formValueSubscription: Subscription;

  constructor() {
    this.formValueSubscription = this.newCategoryForm.valueChanges.subscribe((value) => {
      this.formValue.set(value);
    });

    effect(() => {
      this.editedCategory.emit(this.formattedCategory());
    });
  }

  async onSubmit() {
    try {
      const savedCategory = await this.categoryService.createCategory(this.formattedCategory());
      this.newCategoryForm.markAsPristine();
      this.newCategoryForm.markAsUntouched();
      console.log({ savedCategory });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this.formValueSubscription.unsubscribe();
  }
}
