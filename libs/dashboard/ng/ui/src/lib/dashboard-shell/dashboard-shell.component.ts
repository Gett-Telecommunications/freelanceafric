import { Component, InputSignal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { I_DashboardMenu } from '@freelanceafric/dashboard-shared';

@Component({
  selector: 'lib-dashboard-shell',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, DashboardMenuComponent],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.scss',
})
export class DashboardShellComponent {
  menu: InputSignal<I_DashboardMenu[]> = input.required<I_DashboardMenu[]>();
}
