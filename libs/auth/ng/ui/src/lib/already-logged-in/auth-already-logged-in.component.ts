import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-auth-already-logged-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-already-logged-in.component.html',
  styleUrl: './auth-already-logged-in.component.scss',
})
export class AuthAlreadyLoggedInComponent {}
