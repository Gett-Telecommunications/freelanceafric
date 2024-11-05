import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getFileTypesForRoute, I_File } from '@freelanceafric/shared-shared';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { MatButtonModule } from '@angular/material/button';
import { FullMetadata } from 'firebase/storage';

@Component({
  selector: 'lib-file-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss',
})
export class FilePreviewComponent {
  fileId = input.required<string>();
  file = input<I_File>();

  fileManagementService = inject(FileManagementService);

  private _file = signal<I_File | null>(null);
  private _fileMetadata = signal<FullMetadata | null>(null);

  fileURL = computed(() => {
    return this._file()?.downloadUrl || '';
  });
  fileType = computed(() => {
    return this._fileMetadata()?.contentType || '';
  });
  fileName = computed(() => {
    return this._file()?.originalName || 'Error getting file name';
  });

  constructor() {
    effect(
      async () => {
        const fileId = this.fileId();
        const file = this.file();

        if (!file) {
          // Get the file from the DB
          const fileFromDB = await this.fileManagementService.getFileDataByIdFromDB(fileId);
          if (fileFromDB) {
            this._file.set(fileFromDB);
            const fileMetadata = await this.fileManagementService.getFileMetadataFromStorageById(fileFromDB);
            if (fileMetadata) {
              this._fileMetadata.set(fileMetadata);
            }
          }
        } else {
          if (fileId === file?.id) return;
        }
      },
      { allowSignalWrites: true },
    );
  }
}
