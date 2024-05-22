import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-onboarding-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './onboarding-dashboard-page.component.html',
  styleUrl: './onboarding-dashboard-page.component.scss',
})
export class OnboardingDashboardPageComponent {}
