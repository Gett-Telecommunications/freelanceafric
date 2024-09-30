import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '@freelanceafric/user-ng-data-access';
import { UsersFavoriteListComponent } from '@freelanceafric/users-ng-ui';
import { T_FavoriteTypes } from '@freelanceafric/users-shared';

@Component({
  selector: 'lib-users-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, UsersFavoriteListComponent],
  templateUrl: './users-dashboard-page.component.html',
  styleUrl: './users-dashboard-page.component.scss',
})
export class UsersDashboardPageComponent {
  auth = inject(Auth);
  user$ = user(this.auth);

  userService = inject(UserService);

  favoriteTypes: T_FavoriteTypes[] = ['gig', 'seller'];
}
