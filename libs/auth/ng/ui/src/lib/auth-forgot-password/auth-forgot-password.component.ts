import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail, user } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-auth-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './auth-forgot-password.component.html',
  styleUrl: './auth-forgot-password.component.scss',
})
export class AuthForgotPasswordComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  toastr = inject(ToastrService);

  forgotPasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  async onForgotPasswordSubmit() {
    const email = this.forgotPasswordForm.value.email;
    if (!email) return;
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
