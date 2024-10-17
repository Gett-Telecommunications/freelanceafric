import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { I_Category } from '@freelanceafric/categories-shared';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '@freelanceafric/categories-ng-data-access';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { GigsService } from '@freelanceafric/gigs-data-access';
import { E_FileRoutes, I_File } from '@freelanceafric/shared-shared';
import { FileUploadComponent } from '@freelanceafric/shared-ng-ui';
import { firstValueFrom, Subscription, tap } from 'rxjs';
import { Unsubscribe } from '@angular/fire/firestore';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { Auth, user } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-create-new-gig',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FileUploadComponent,
    MatIconModule,
  ],
  templateUrl: './create-new-gig.component.html',
  styleUrl: './create-new-gig.component.scss',
})
export class CreateNewGigComponent implements OnInit, AfterViewInit, OnDestroy {
  categoryService = inject(CategoriesService);
  gigsService = inject(GigsService);
  fileManagerService = inject(FileManagementService);
  auth = inject(Auth);
  user$ = user(this.auth);

  uploadedImages: WritableSignal<I_File[]> = signal([]);
  savedImageId = signal<string>('');

  allCategories = signal<I_Category[]>([]);
  currentGig = signal<I_Gig | null>(null);
  currentGigId = signal<string>('');

  unsub?: Unsubscribe;
  gigSub?: Subscription;
  fileRoutes = E_FileRoutes;

  gigIntroFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    categories: [[], Validators.required],
    description: ['', Validators.required],
  });
  pricingFormGroup = this._formBuilder.group({
    price: [500, Validators.required],
    duration: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {
    effect(() => {
      const id = this.currentGigId();
      if (!id) return;
      if (this.gigSub) this.gigSub.unsubscribe();
      this.gigSub = this.gigsService
        .getGigById$(id)
        .pipe(
          tap((res) => {
            if (!res) return;
            const { unsub } = res;
            if (unsub) this.unsub = unsub;
          }),
        )
        .subscribe({
          next: (res) => {
            if (!res) return;
            const { gig } = res;
            if (gig) {
              this.currentGig.set(gig);
              console.log('gig', gig, {
                currentGig: this.currentGig(),
                currentGigId: this.currentGigId(),
                savedImageId: this.savedImageId(),
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.unsub?.();
          },
        });
    });

    // When a new image is uploaded set the imageId of the current gig to the uploaded image
    effect(
      async () => {
        const uploadedImages = this.uploadedImages();
        const currentGig = this.currentGig();
        if (!currentGig) throw new Error('Current gig not found');
        if (!uploadedImages.length) return;
        const newCurrentGig = { ...currentGig, imageId: uploadedImages[0].id || '' };
        await this.gigsService.updateGigIntro(currentGig.id, newCurrentGig);
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    this.categoryService.getAllCategories().then((categories) => {
      this.allCategories.set(categories);
    });
  }

  ngAfterViewInit() {
    this.createGig();
  }

  async createGig() {
    const user = await firstValueFrom(this.user$);
    if (!user) throw new Error('User not found');
    const gig = await this.gigsService.createGig({
      id: '',
      imageId: '',
      title: '',
      categories: [],
      description: '',
      status: 'pending',
      sellerUID: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDraft: true,
      isReview: false,
    });
    if (gig) {
      if (gig) {
        this.currentGigId.set(gig.id);
      }
    }
  }

  async saveStep1() {
    const partialGig: Partial<I_Gig> = {
      title: this.gigIntroFormGroup.value.title || '',
      categories: this.gigIntroFormGroup.value.categories || [],
      description: this.gigIntroFormGroup.value.description || '',
    };
    const currentGig = this.currentGig();
    if (!currentGig) throw new Error('Current gig not found');
    partialGig.id = currentGig.id;
    try {
      await this.gigsService.updateGigIntro(currentGig.id, partialGig);
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmit() {
    if (!this.gigIntroFormGroup.valid) throw new Error('Form invalid');
    if (!this.pricingFormGroup.valid) throw new Error('Form invalid');
    if (!this.uploadedImages().length) throw new Error('No image uploaded');
    try {
      const gig: I_Gig = {
        id: '',
        imageId: this.uploadedImages()[0].id || '',
        title: this.gigIntroFormGroup.value.title || '',
        categories: this.gigIntroFormGroup.value.categories || [],
        description: this.gigIntroFormGroup.value.description || '',
        status: 'pending',
        sellerUID: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.gigsService.createGig(gig);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.unsub?.();
    this.gigSub?.unsubscribe();
  }
}
