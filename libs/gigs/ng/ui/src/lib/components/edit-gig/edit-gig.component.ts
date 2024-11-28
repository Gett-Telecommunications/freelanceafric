import { Component, effect, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadComponent } from '@freelanceafric/shared-ng-ui';
import { Auth, user } from '@angular/fire/auth';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';
import { I_Category } from '@freelanceafric/categories-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { E_FileRoutes, I_File } from '@freelanceafric/shared-shared';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GigPackageFormComponent } from '../gig-package-form/gig-package-form.component';
import { GigExtrasFormComponent } from '../gig-extras-form/gig-extras-form.component';

@Component({
  selector: 'lib-edit-gig',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FileUploadComponent,
    MatTabsModule,
    GigPackageFormComponent,
    GigExtrasFormComponent,
  ],
  templateUrl: './edit-gig.component.html',
  styleUrl: './edit-gig.component.scss',
})
export class EditGigComponent implements OnInit {
  gigId = input.required<string>();
  categoryService = inject(CategoriesService);
  gigsService = inject(GigsService);
  fileManagerService = inject(FileManagementService);
  auth = inject(Auth);
  user$ = user(this.auth);

  uploadedImages: WritableSignal<I_File[]> = signal([]);
  savedImageId = signal<string>('');

  allCategories = signal<I_Category[]>([]);
  currentGig = signal<I_Gig | null>(null);

  fileRoutes = E_FileRoutes;

  gigIntroFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    categories: new FormControl<string[]>([], Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor() {
    effect(
      () => {
        const _gigId = this.gigId();
        this.uploadedImages.set([]);
        this.currentGig.set(null);
        this.savedImageId.set('');
        if (_gigId) {
          this.loadGig(_gigId);
        }
      },
      { allowSignalWrites: true },
    );

    // Save the imageId when the upload completes
    effect(async () => {
      const [uploadedImage] = this.uploadedImages();
      if (!uploadedImage) return;
      const imageId = uploadedImage.id;
      if (imageId) {
        await this.gigsService.updateGigIntro(this.gigId(), { imageId: imageId });
      }
    });
  }

  ngOnInit() {
    this.categoryService.getAllCategories().then((categories) => {
      this.allCategories.set(categories);
    });
  }

  async loadGig(gigId: string) {
    const gig = await this.gigsService.getGigById(gigId, true);
    if (gig) {
      this.currentGig.set(gig);
      this.gigIntroFormGroup.patchValue({
        title: gig.title,
        description: gig.description,
        categories: gig.categories,
      });
      // get the uploaded images
      const uploadedImages = await this.fileManagerService.getFileDataByIdFromDB(gig.imageId);
      if (uploadedImages) {
        this.uploadedImages.set([uploadedImages]);
        this.savedImageId.set(uploadedImages.id || '');
      }
    }
  }

  async onSubmitIntroForm() {
    if (this.gigIntroFormGroup.invalid) throw new Error('Form invalid');
    const title = this.gigIntroFormGroup.value.title;
    const description = this.gigIntroFormGroup.value.description;
    const categories = this.gigIntroFormGroup.value.categories;
    if (!title || !description || !categories?.length) throw new Error('Form invalid');
    if (!this.gigId()) throw new Error('Gig not found');
    try {
      await this.gigsService.updateGigIntro(this.gigId(), {
        title,
        description,
        categories,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async requestReview() {
    if (!this.gigId()) throw new Error('Gig not found');
    try {
      await this.onSubmitIntroForm();
      await this.gigsService.requestReview(this.gigId());
    } catch (error) {
      console.log(error);
    }
  }

  async changePicture() {
    if (!this.gigId()) throw new Error('Gig not found');
    try {
      await this.gigsService.updateGigIntro(this.gigId(), { imageId: '' });
      this.uploadedImages.set([]);
      this.savedImageId.set('');
    } catch (error) {
      console.log(error);
    }
  }
}
