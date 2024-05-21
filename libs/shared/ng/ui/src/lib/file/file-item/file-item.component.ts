import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  TemplateRef,
  computed,
  effect,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { I_FileUploadProgress } from '@freelanceafric/shared-ng-data-access';

@Component({
  selector: 'lib-file-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
})
export class FileItemComponent implements OnChanges {
  @Input() file?: File;
  @Input() fileActions: TemplateRef<any> | null = null;

  uploadProgress = input<I_FileUploadProgress>();

  protected downloadUrl = computed(() => this.uploadProgress()?.downloadUrl);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.cd.detectChanges();
  }

  // Method that converts bytes to human readable format
  convertBytesToHumanReadable(bytes: number): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }
}
