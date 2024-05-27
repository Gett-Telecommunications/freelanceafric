import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-floating-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './floating-header.component.html',
  styleUrl: './floating-header.component.scss',
})
export class FloatingHeaderComponent {
  title = input.required<string>();
  description = input.required<string>();
  actions = input.required<[string, string][]>();
}
