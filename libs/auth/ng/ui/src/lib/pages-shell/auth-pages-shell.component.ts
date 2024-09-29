import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAlreadyLoggedInComponent } from '../already-logged-in/auth-already-logged-in.component';
import { Auth, GoogleAuthProvider, signInWithPopup, user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'lib-auth-pages-shell',
  standalone: true,
  imports: [CommonModule, AuthAlreadyLoggedInComponent, RouterModule],
  templateUrl: './auth-pages-shell.component.html',
  styleUrl: './auth-pages-shell.component.scss',
})
export class AuthPagesShellComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  private toastr: ToastrService = inject(ToastrService);

  logOut() {
    this.auth.signOut();
  }

  async signInWithGoogle() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      this.handleError(error as FirebaseError);
    }
  }

  async handleError(error: FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.toastr.error('User not found');
        break;
      case 'auth/wrong-password':
        this.toastr.error('Wrong password');
        break;
      case 'auth/invalid-email':
        this.toastr.error('Invalid email');
        break;
      case 'appCheck/fetch-status-error':
        this.toastr.error('Error fetching app check status');
        break;
      default:
        this.toastr.error('Error logging in. Please try again');
        break;
    }
  }
}
