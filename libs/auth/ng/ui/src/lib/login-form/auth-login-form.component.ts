import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-auth-login-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss',
})
export class AuthLoginFormComponent {
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
    }
  }
}
