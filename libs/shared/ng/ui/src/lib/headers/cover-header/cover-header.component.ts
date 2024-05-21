import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-cover-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cover-header.component.html',
  styleUrl: './cover-header.component.scss',
})
export class CoverHeaderComponent {
  heading = input.required<string>();
  subHeading = input<string>('');
  imageURL = input.required<string>();
  infoCard = input<{ value: string, tagLine: string } | null>(null);
}
