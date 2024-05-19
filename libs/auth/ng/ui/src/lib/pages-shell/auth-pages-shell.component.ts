import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAlreadyLoggedInComponent } from '../already-logged-in/auth-already-logged-in.component';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-auth-pages-shell',
  standalone: true,
  imports: [CommonModule, AuthAlreadyLoggedInComponent],
  templateUrl: './auth-pages-shell.component.html',
  styleUrl: './auth-pages-shell.component.scss',
})
export class AuthPagesShellComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
}
