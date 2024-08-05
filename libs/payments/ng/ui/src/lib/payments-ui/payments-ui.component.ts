import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-payments-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-ui.component.html',
  styleUrl: './payments-ui.component.scss',
})
export class PaymentsUiComponent {}
