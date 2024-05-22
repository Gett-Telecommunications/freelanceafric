import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';

@Component({
  selector: 'lib-users-seller-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-seller-profile.component.html',
  styleUrl: './users-seller-profile.component.scss',
})
export class UsersSellerProfileComponent {
  profile = input.required<I_SellerProfile>();
}
