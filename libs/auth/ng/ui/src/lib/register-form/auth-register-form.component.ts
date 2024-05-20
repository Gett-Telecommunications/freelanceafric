import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup, user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-auth-register-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.scss',
})
export class AuthRegisterFormComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  private toastr: ToastrService = inject(ToastrService);

  async signInWithGoogle() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
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
      default:
        this.toastr.error('Error logging in. Please try again');
        break;
    }
  }
}
