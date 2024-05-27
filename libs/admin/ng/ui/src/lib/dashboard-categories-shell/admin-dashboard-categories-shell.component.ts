import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-admin-dashboard-categories-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard-categories-shell.component.html',
  styleUrl: './admin-dashboard-categories-shell.component.scss',
})
export class AdminDashboardCategoriesShellComponent {}
