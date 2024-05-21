import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent, MainNavigationComponent } from '@freelanceafric/shared-ng-ui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-pages-shell',
  standalone: true,
  imports: [CommonModule, MainNavigationComponent, MainFooterComponent, RouterModule],
  templateUrl: './pages-shell.component.html',
  styleUrl: './pages-shell.component.scss',
})
export class PagesShellComponent {}
