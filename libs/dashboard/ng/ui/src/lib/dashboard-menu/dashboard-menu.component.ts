import { Component, InputSignal, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { I_DashboardMenu } from '@freelanceafric/dashboard-shared';

@Component({
  selector: 'lib-dashboard-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.scss',
})
export class DashboardMenuComponent {
  menu: InputSignal<I_DashboardMenu[]> = input.required<I_DashboardMenu[]>();

  private auth = inject(Auth);
  user$ = user(this.auth);

  logout() {
    this.auth.signOut();
  }
}
