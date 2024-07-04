import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-seller-gigs-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './seller-gigs-page.component.html',
  styleUrl: './seller-gigs-page.component.scss',
})
export class SellerGigsPageComponent {}
