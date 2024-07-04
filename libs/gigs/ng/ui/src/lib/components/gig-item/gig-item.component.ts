import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-gig-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './gig-item.component.html',
  styleUrl: './gig-item.component.scss',
})
export class GigItemComponent {
  gig = input.required<I_Gig>();
}
