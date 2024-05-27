import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-admin-dashboard-users-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard-users-shell.component.html',
  styleUrl: './admin-dashboard-users-shell.component.scss',
})
export class AdminDashboardUsersShellComponent {}
