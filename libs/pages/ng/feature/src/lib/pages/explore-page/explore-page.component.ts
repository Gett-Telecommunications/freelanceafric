import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoverHeaderComponent } from '@freelanceafric/shared-ng-ui';
import { RouterModule } from '@angular/router';
import { GigListComponent } from '@freelanceafric/gigs-ui';
import { SellerListComponent } from '@freelanceafric/users-ng-ui';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'lib-explore-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CoverHeaderComponent,
    RouterModule,
    GigListComponent,
    SellerListComponent,
    MatTabsModule,
  ],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss',
})
export class ExplorePageComponent {}
