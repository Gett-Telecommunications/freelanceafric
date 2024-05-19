import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPagesShellComponent, AuthLoginFormComponent } from '@freelanceafric/auth-ng-ui';

@Component({
  selector: 'lib-auth-login-page',
  standalone: true,
  imports: [CommonModule, AuthPagesShellComponent, AuthLoginFormComponent],
  templateUrl: './auth-login-page.component.html',
  styleUrl: './auth-login-page.component.scss',
})
export class AuthLoginPageComponent {}
