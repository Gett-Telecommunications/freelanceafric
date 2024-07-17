import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverHeaderComponent } from '@freelanceafric/shared-ng-ui';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryListComponent } from '@freelanceafric/categories-ng-ui';
import { SellerListComponent } from '@freelanceafric/users-ng-ui';

@Component({
  selector: 'lib-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    CoverHeaderComponent,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CategoryListComponent,
    SellerListComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  steps: { icon: string; heading: string; description: string }[] = [
    {
      icon: '/assets/images/landing-page/steps/one.png',
      heading: 'Find the right freelancer',
      description: 'We have the right people to help you do exactly what your business needs. ',
    },
    {
      icon: '/assets/images/landing-page/steps/two.png',
      heading: 'Get the right price',
      description: 'Read the reviews and look at the freelancer’s sample work to evaluate if they are right for you ',
    },
    {
      icon: '/assets/images/landing-page/steps/three.png',
      heading: 'Get the right price',
      description: 'Contact your chosen freelancer and share your requirements ',
    },
    {
      icon: '/assets/images/landing-page/steps/four.png',
      heading: 'Get the right price',
      description:
        'Complete your payment and sit back as the work gets delivered to youComplete your payment and sit back as the work gets delivered to you',
    },
    {
      icon: '/assets/images/landing-page/steps/five.png',
      heading: 'Get the right price',
      description: 'You can always reach out to us and our team to help with any issues regarding a Gig.',
    },
  ];
}
