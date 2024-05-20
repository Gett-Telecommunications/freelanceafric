import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardShellComponent } from '@freelanceafric/dashboard-ng-ui';

@Component({
  selector: 'lib-dashboard-admin-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardShellComponent],
  templateUrl: './dashboard-admin-page.component.html',
  styleUrl: './dashboard-admin-page.component.scss',
})
export class DashboardAdminPageComponent {}
