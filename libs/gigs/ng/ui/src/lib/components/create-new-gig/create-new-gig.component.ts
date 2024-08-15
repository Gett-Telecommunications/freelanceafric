import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { I_Category } from '@freelanceafric/categories-shared';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';

@Component({
  selector: 'lib-create-new-gig',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './create-new-gig.component.html',
  styleUrl: './create-new-gig.component.scss',
})
export class CreateNewGigComponent implements OnInit {
  categoryService = inject(CategoriesService);
  gigsService = inject(GigsService);

  gigIntroFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    categories: [[], Validators.required],
    description: ['', Validators.required],
  });
  pricingFormGroup = this._formBuilder.group({
    price: [500, Validators.required],
    duration: ['', Validators.required],
  });
  isLinear = true;

  allCategories = signal<I_Category[]>([]);

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().then((categories) => {
      this.allCategories.set(categories);
    });
  }

  async onSubmit() {
    if (!this.gigIntroFormGroup.valid) throw new Error('Form invalid');
    if (!this.pricingFormGroup.valid) throw new Error('Form invalid');
    try {
      const gig: I_Gig = {
        id: '',
        title: this.gigIntroFormGroup.value.title || '',
        categories: this.gigIntroFormGroup.value.categories || [],
        description: this.gigIntroFormGroup.value.description || '',
        price: this.pricingFormGroup.value.price || 0,
        duration: this.pricingFormGroup.value.duration || '',
        status: 'pending',
        sellerUID: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.gigsService.createGig(gig);
    } catch (error) {
      console.log(error);
    }
  }
}
