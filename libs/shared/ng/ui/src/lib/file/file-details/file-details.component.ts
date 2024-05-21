import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { I_File } from '@freelanceafric/shared-shared';

@Component({
  selector: 'lib-file-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss',
})
export class FileDetailsComponent {
  fileManagementService: FileManagementService = inject(FileManagementService);

  fileEditForm: FormGroup = new FormGroup({
    displayName: new FormControl(''),
    notes: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<FileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public file: I_File,
  ) {
    this.fileEditForm.patchValue(file);
  }

  async onSubmit(): Promise<void> {
    const updatedInfo = {
      ...this.file,
      ...this.fileEditForm.value,
    };
    try {
      await this.fileManagementService.updateFile(updatedInfo);
    } catch (error) {
      console.error(error);
    } finally {
      this.dialogRef.close();
    }
  }
}
