import { Component, effect, inject, input, output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { I_GigPackage, I_GigTiming } from '@freelanceafric/gigs-shared';
import { GigPackagesService } from '@freelanceafric/gigs-data-access';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-gig-package-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './gig-package-form.component.html',
  styleUrl: './gig-package-form.component.scss',
})
export class GigPackageFormComponent {
  gigId = input.required<string>();
  gigPackage = input<I_GigPackage>();

  onPackageSaved = output<I_GigPackage>();

  gigPackageService = inject(GigPackagesService);

  private formattedPackage: WritableSignal<I_GigPackage | null> = signal<I_GigPackage | null>(null);

  gigPackageForm = new FormGroup({
    label: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priceAmount: new FormControl<number>(1, Validators.required),
    priceCurrency: new FormControl('', Validators.required),
    deliveryTimeValue: new FormControl<number>(1, Validators.required),
    deliveryTimeUnit: new FormControl<I_GigTiming['unit']>('days', Validators.required),
    allowedRevisions: new FormControl<number>(1, Validators.required),
  });

  constructor() {
    effect(() => {
      const savedPackage = this.gigPackage();
      if (savedPackage) {
        this.gigPackageForm.patchValue({
          label: savedPackage.label,
          description: savedPackage.description,
          priceAmount: savedPackage.price.value,
          priceCurrency: savedPackage.price.currency,
          deliveryTimeValue: savedPackage.deliveryTime.value,
          deliveryTimeUnit: savedPackage.deliveryTime.unit,
          allowedRevisions: savedPackage.allowedRevisions,
        });
      }
    });
    this.gigPackageForm.valueChanges.subscribe((value) => {
      this.formattedPackage.set({
        id: this.gigPackage()?.id || '',
        gigId: this.gigId(),
        label: value.label || '',
        description: value.description || '',
        price: {
          value: value.priceAmount || 1,
          currency: value.priceCurrency || '',
        },
        deliveryTime: {
          value: value.deliveryTimeValue || 1,
          unit: value.deliveryTimeUnit || 'days',
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        allowedRevisions: value.allowedRevisions || 1,
      });
    });
  }

  async onSubmit() {
    if (!this.gigPackageForm.valid) throw new Error('Form invalid');
    const formattedPackage = this.formattedPackage();
    if (!formattedPackage) throw new Error('Formatted package not found');
    await this.gigPackageService.create(formattedPackage);
    console.log({ formattedPackage });
    this.onPackageSaved.emit(formattedPackage);
  }
}
