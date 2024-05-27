import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingHeaderComponent } from '@freelanceafric/shared-ng-ui';

@Component({
  selector: 'lib-become-seller-page',
  standalone: true,
  imports: [CommonModule, FloatingHeaderComponent],
  templateUrl: './become-seller-page.component.html',
  styleUrl: './become-seller-page.component.scss',
})
export class BecomeSellerPageComponent {}
