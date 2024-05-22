import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerCareer } from '@freelanceafric/users-shared';

@Component({
  selector: 'lib-users-seller-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-seller-career.component.html',
  styleUrl: './users-seller-career.component.scss',
})
export class UsersSellerCareerComponent {
  career = input.required<I_SellerCareer>();
}
