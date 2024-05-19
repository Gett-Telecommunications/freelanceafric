import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPagesShellComponent, AuthRegisterFormComponent } from '@freelanceafric/auth-ng-ui';

@Component({
  selector: 'lib-auth-register-page',
  standalone: true,
  imports: [CommonModule, AuthPagesShellComponent, AuthRegisterFormComponent],
  templateUrl: './auth-register-page.component.html',
  styleUrl: './auth-register-page.component.scss',
})
export class AuthRegisterPageComponent {}
