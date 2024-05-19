import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-loading.component.html',
  styleUrl: './shared-loading.component.scss',
})
export class SharedLoadingComponent {}
