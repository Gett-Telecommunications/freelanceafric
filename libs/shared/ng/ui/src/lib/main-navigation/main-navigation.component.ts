import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Auth, user } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { SearchFieldComponent } from '@freelanceafric/search-ui';

@Component({
  selector: 'lib-main-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, SearchFieldComponent],
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.scss',
})
export class MainNavigationComponent {
  auth = inject(Auth);
  user$ = user(this.auth);

  logOut() {
    this.auth.signOut();
  }
}
