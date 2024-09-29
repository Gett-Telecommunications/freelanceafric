import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthForgotPasswordComponent, AuthPagesShellComponent } from '@freelanceafric/auth-ng-ui';

@Component({
  selector: 'lib-forgot-password-page',
  standalone: true,
  imports: [CommonModule, AuthPagesShellComponent, AuthForgotPasswordComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {}
