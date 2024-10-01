import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-users-seller-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './users-seller-profile.component.html',
  styleUrl: './users-seller-profile.component.scss',
})
export class UsersSellerProfileComponent {
  sellerProfile = input.required<I_SellerProfile | null>();
  profilePicURL = signal('');

  private fileManagementService = inject(FileManagementService);

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
