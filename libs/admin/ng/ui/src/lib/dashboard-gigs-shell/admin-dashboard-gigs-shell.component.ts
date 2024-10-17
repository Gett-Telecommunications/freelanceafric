import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-admin-dashboard-gigs-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard-gigs-shell.component.html',
  styleUrl: './admin-dashboard-gigs-shell.component.scss',
})
export class AdminDashboardGigsShellComponent {}
