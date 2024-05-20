import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { SharedLoadingComponent } from '@freelanceafric/shared-ng-ui';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-auth-already-logged-in',
  standalone: true,
  imports: [CommonModule, SharedLoadingComponent, MatButtonModule, RouterModule],
  templateUrl: './auth-already-logged-in.component.html',
  styleUrl: './auth-already-logged-in.component.scss',
})
export class AuthAlreadyLoggedInComponent {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  logout() {
    this.auth.signOut();
  }
}
