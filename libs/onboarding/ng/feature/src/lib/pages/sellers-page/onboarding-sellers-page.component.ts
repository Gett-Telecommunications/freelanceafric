import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-onboarding-sellers-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './onboarding-sellers-page.component.html',
  styleUrl: './onboarding-sellers-page.component.scss',
})
export class OnboardingSellersPageComponent {
  personalInfoFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    otherName: [''],
    displayName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    intro: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
  });

  careerFormGroup = this._formBuilder.group({
    occupation: ['', Validators.required],
    overview: ['', Validators.required],
    experience: ['', Validators.required],
    skills: ['', Validators.required],
    education: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}
}
