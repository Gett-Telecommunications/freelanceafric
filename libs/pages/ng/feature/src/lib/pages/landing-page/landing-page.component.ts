import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverHeaderComponent } from '@freelanceafric/shared-ng-ui';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-landing-page',
  standalone: true,
  imports: [CommonModule, CoverHeaderComponent, RouterModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent { }
