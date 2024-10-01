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
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { I_FileUploadProgress } from '@freelanceafric/shared-ng-data-access';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-file-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
})
export class FileItemComponent implements OnChanges, AfterViewInit {
  file = input.required<File>();
  fileActions = input.required<TemplateRef<any> | null>();
  uploadProgress = input<I_FileUploadProgress>();
  fileSizeLimit_kb = input.required<number>();

  problems = output<string[]>();

  internalProblems = signal<string[]>([]);

  protected downloadUrl = computed(() => this.uploadProgress()?.downloadUrl);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.file().size > this.fileSizeLimit_kb() * 1024) {
      this.problems.emit([`File size is too large for ${this.file().name}`]);
      this.internalProblems.set(['File size is too large']);
    }
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
