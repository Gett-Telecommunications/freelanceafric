import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardShellComponent } from '@freelanceafric/dashboard-ng-ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-dashboard-buyer-page',
  standalone: true,
  imports: [CommonModule, DashboardShellComponent, RouterModule],
  templateUrl: './dashboard-buyer-page.component.html',
  styleUrl: './dashboard-buyer-page.component.scss',
})
export class DashboardBuyerPageComponent {}
