import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewGigComponent } from '@freelanceafric/gigs-ui';

@Component({
  selector: 'lib-seller-new-gig-page',
  standalone: true,
  imports: [CommonModule, CreateNewGigComponent],
  templateUrl: './seller-new-gig-page.component.html',
  styleUrl: './seller-new-gig-page.component.scss',
})
export class SellerNewGigPageComponent {}
