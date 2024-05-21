import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CoverHeaderComponent } from '@freelanceafric/shared-ng-ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-explore-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, CoverHeaderComponent, RouterModule],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss',
})
export class ExplorePageComponent { }
