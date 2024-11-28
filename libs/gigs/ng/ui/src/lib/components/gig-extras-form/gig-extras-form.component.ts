import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-gig-extras-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './gig-extras-form.component.html',
  styleUrl: './gig-extras-form.component.scss',
})
export class GigExtrasFormComponent {
  gigId = input.required<string>();

  gigExtrasForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    extraDurationValue: new FormControl<number>(1, Validators.required),
    extraDurationUnit: new FormControl<string>('days', Validators.required),
    extraPriceAmount: new FormControl<number>(1, Validators.required),
    extraPriceCurrency: new FormControl<string>('', Validators.required),
  });

  async onSubmitExtras() {
    console.log('Submitted');
  }
}
