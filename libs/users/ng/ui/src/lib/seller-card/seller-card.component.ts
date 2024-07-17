import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { RouterModule } from '@angular/router';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';

@Component({
  selector: 'lib-seller-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.scss',
})
export class SellerCardComponent {
  sellerProfile = input.required<I_SellerProfile>();

  fileManagementService = inject(FileManagementService);

  profilePicURL = signal('');

  constructor() {
    effect(() => {
      const profile = this.sellerProfile();
      if (!profile) return;
      const uploadedImage = profile.profileImageID;
      if (!uploadedImage) return;
      this.fileManagementService.getFileDownloadURLById(uploadedImage).then((file) => {
        if (file) {
          this.profilePicURL.set(file);
        }
      });
    });
  }
}
