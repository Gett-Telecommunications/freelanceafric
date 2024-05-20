import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardShellComponent } from '@freelanceafric/dashboard-ng-ui';

@Component({
  selector: 'lib-dashboard-seller-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardShellComponent],
  templateUrl: './dashboard-seller-page.component.html',
  styleUrl: './dashboard-seller-page.component.scss',
})
export class DashboardSellerPageComponent {}
