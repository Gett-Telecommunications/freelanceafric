import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-admin-dashboard-categories-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard-categories-page.component.html',
  styleUrl: './admin-dashboard-categories-page.component.scss',
})
export class AdminDashboardCategoriesPageComponent {}
