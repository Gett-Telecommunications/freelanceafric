import {
  ChangeDetectorRef,
  Component,
  Input,
  InputSignal,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FileItemComponent } from '../file-item/file-item.component';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { FileManagementService, I_FileUploadProgress, _File_ } from '@freelanceafric/shared-ng-data-access';
import { E_FileRoutes, I_File, T_FileTypes, getFileTypesForRoute } from '@freelanceafric/shared-shared';

@Component({
  selector: 'lib-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FileItemComponent,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit, OnDestroy {
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() required = false;
  directSaveFunction = input<(file: I_File) => Promise<boolean>>();
  fileSizeLimit_kb = input<number>(1000000);

  fileRoute = input.required<E_FileRoutes>();

  uploadedFiles = output<I_File[]>();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  accepts: T_FileTypes[] = [];
  fileManagementService: FileManagementService = inject(FileManagementService);
  private fileUploadProgress$$: BehaviorSubject<I_FileUploadProgress[]> = new BehaviorSubject<I_FileUploadProgress[]>(
    [],
  );
  fileUploadProgress: I_FileUploadProgress[] = [];
  fileUploadForm = new FormGroup({
    file: new FormControl(null, Validators.required),
  });
  files?: File[];
  uploadSubscription?: Subscription;

  ngOnInit(): void {
    this.accepts = getFileTypesForRoute(this.fileRoute());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChange(event: any) {
    this.files = [...event.target.files];
  }

  async onSubmit() {
    try {
      if (!this.files) throw new Error('No files selected');
      let completedUploads: (_File_ | undefined)[] = [];
      this.uploadSubscription = this.fileManagementService.uploadFile(this.files, this.fileRoute()).subscribe({
        next: (data) => {
          this.fileUploadProgress$$.next(data);
          this.fileUploadProgress = data;
          completedUploads = data.map((value) => value.fileObj);
          this.cd.detectChanges();
        },
        complete: async () => {
          this.fileUploadForm.reset();
          this.uploadSubscription?.unsubscribe();
          const _completedUploads: I_File[] = [];
          completedUploads.forEach((value) => {
            if (value !== undefined) {
              _completedUploads.push(value.toJson);
            }
          });
          const directSaveFunction = this.directSaveFunction();
          if (directSaveFunction) {
            for (const file of _completedUploads) {
              await directSaveFunction(file);
            }
          }
          this.uploadedFiles.emit(_completedUploads);
        },
      });
      this.files = [];
      this.cd.detectChanges();
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    }
  }

  removeFile(name: string): void {
    if (!this.files) {
      return;
    }
    this.files = this.files.filter((file) => file.name !== name);
  }

  getMyProgress(file: File): Observable<I_FileUploadProgress | undefined> {
    return this.fileUploadProgress$$
      .asObservable()
      .pipe(map((value) => value.find((value) => value.file.name === file.name)));
  }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
  }
}
