import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-auth-register-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, RouterModule, MatInputModule],
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.scss',
})
export class AuthRegisterFormComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  toastr = inject(ToastrService);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async onRegisterSubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    if (!email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }
}
