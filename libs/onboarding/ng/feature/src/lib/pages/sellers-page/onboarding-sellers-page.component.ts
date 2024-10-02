import { AfterViewInit, Component, OnDestroy, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { I_SellerCareer, I_SellerProfile } from '@freelanceafric/users-shared';
import { FileUploadComponent } from '@freelanceafric/shared-ng-ui';
import { E_FileRoutes, I_File } from '@freelanceafric/shared-shared';
import { SellerProfileService, SellerCareerService } from '@freelanceafric/user-ng-data-access';
import { FileManagementService } from '@freelanceafric/shared-ng-data-access';
import { Router, RouterModule } from '@angular/router';
import { UsersSellerCareerComponent, UsersSellerProfileComponent } from '@freelanceafric/users-ng-ui';
import { debounceTime, firstValueFrom, Subscription } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'lib-onboarding-sellers-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadComponent,
    UsersSellerProfileComponent,
    UsersSellerCareerComponent,
    RouterModule,
  ],
  templateUrl: './onboarding-sellers-page.component.html',
  styleUrl: './onboarding-sellers-page.component.scss',
})
export class OnboardingSellersPageComponent implements AfterViewInit, OnDestroy {
  sellerProfileService = inject(SellerProfileService);
  filesService = inject(FileManagementService);
  sellerCareerService = inject(SellerCareerService);
  router = inject(Router);
  auth = inject(Auth);

  user$ = user(this.auth);

  //updated from DB changes
  myExistingProfile = signal<I_SellerProfile | null>(null);
  myExistingCareer = signal<I_SellerCareer | null>(null);
  // Updated from form changes
  updatedProfile = signal<I_SellerProfile | null>(null);
  updatedCareer = signal<I_SellerCareer | null>(null);

  personalInfoFormGroup = this._formBuilder.group({
    displayName: ['', Validators.required],
    intro: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    linkedin: [''],
    instagram: [''],
    twitter: [''],
    facebook: [''],
    website: [''],
  });

  careerFormGroup = this._formBuilder.group({
    occupation: ['', Validators.required],
    overview: ['', Validators.required],
    experience: ['', Validators.required],
    skills: ['', Validators.required],
    education: ['', Validators.required],
  });

  uploadedFiles: WritableSignal<I_File[]> = signal([]);
  profileImageID = computed(() => {
    const uploadedFiles = this.uploadedFiles();
    if (uploadedFiles.length > 0) {
      return uploadedFiles[0].id;
    }
    return '';
  });
  profilePicURL = computed(() => {
    const uploadedFiles = this.uploadedFiles();
    if (uploadedFiles.length > 0) {
      return uploadedFiles[0].downloadUrl;
    }
    return '';
  });

  fileRoutes = E_FileRoutes;

  careerFormSub: Subscription;
  profileFormSub: Subscription;

  constructor(private _formBuilder: FormBuilder) {
    effect(() => {
      // Decide which profile to use
      const profileToUse = this.myExistingProfile();
      if (!profileToUse) return;
      // patch the form values
      this.personalInfoFormGroup.patchValue({
        displayName: profileToUse.displayName,
        intro: profileToUse.intro,
        country: profileToUse.country,
        city: profileToUse.city,
        linkedin: profileToUse.linkedin,
        instagram: profileToUse.instagram,
        twitter: profileToUse.twitter,
        facebook: profileToUse.facebook,
        website: profileToUse.website,
      });
      // get the file
      this.filesService.getFileDataByIdFromDB(profileToUse.profileImageID).then((file) => {
        if (file) this.uploadedFiles.set([file]);
      });
    });
    effect(async () => {
      const careerToUse = this.myExistingCareer();
      if (!careerToUse) return;
      this.careerFormGroup.patchValue({
        occupation: careerToUse.occupation,
        overview: careerToUse.overview,
        experience: careerToUse.experience,
        skills: careerToUse.skills,
        education: careerToUse.education,
      });
    });

    this.careerFormSub = this.careerFormGroup.valueChanges.pipe(debounceTime(5050)).subscribe(async () => {
      this.updatedCareer.set(await this.formatCareer());
    });
    this.profileFormSub = this.personalInfoFormGroup.valueChanges.pipe(debounceTime(5050)).subscribe(async () => {
      this.updatedProfile.set(await this.formatProfile());
    });
  }

  ngAfterViewInit() {
    this.fetchMyData();
  }

  private async formatProfile(): Promise<I_SellerProfile> {
    const user = await firstValueFrom(this.user$);
    if (!user) throw new Error('User not found when formatting profile data');
    return {
      uid: user.uid,
      displayName: this.personalInfoFormGroup.value.displayName || '',
      intro: this.personalInfoFormGroup.value.intro || '',
      country: this.personalInfoFormGroup.value.country || '',
      city: this.personalInfoFormGroup.value.city || '',
      linkedin: this.personalInfoFormGroup.value.linkedin || '',
      instagram: this.personalInfoFormGroup.value.instagram || '',
      twitter: this.personalInfoFormGroup.value.twitter || '',
      facebook: this.personalInfoFormGroup.value.facebook || '',
      website: this.personalInfoFormGroup.value.website || '',
      status: 'pending',
      profileImageID: this.profileImageID() || '',
      createdAt: this.myExistingProfile()?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private async formatCareer(): Promise<I_SellerCareer> {
    const user = await firstValueFrom(this.user$);
    if (!user) throw new Error('User not found when formatting career data');
    return {
      uid: user.uid,
      occupation: this.careerFormGroup.value.occupation || '',
      overview: this.careerFormGroup.value.overview || '',
      experience: this.careerFormGroup.value.experience || '',
      skills: this.careerFormGroup.value.skills || '',
      education: this.careerFormGroup.value.education || '',
      createdAt: this.myExistingCareer()?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
    };
  }

  fetchMyData() {
    this.sellerProfileService.getMyProfile().then((profile) => {
      if (!profile) return;
      if (profile.published) this.myExistingProfile.set(profile.published);
      if (profile.review) this.myExistingProfile.set(profile.review);
      if (profile.draft) this.myExistingProfile.set(profile.draft);
    });
    this.sellerCareerService.getMySellerCareer().then((career) => {
      if (career.published) this.myExistingCareer.set(career.published);
      if (career.review) this.myExistingCareer.set(career.review);
      if (career.draft) this.myExistingCareer.set(career.draft);
    });
  }

  async submitProfileForm() {
    if (!this.personalInfoFormGroup.valid) return;
    if (!this.profileImageID()) {
      alert('Please upload a profile image');
      return;
    }
    const profile = await this.formatProfile();
    try {
      if (this.myExistingProfile()) {
        const saved = await this.sellerProfileService.updateMySellerProfile(profile);
        if (saved) {
          this.myExistingProfile.set(saved);
        }
      } else {
        const saved = await this.sellerProfileService.createSellerProfile(profile);
        if (saved) {
          this.myExistingProfile.set(saved);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async submitCareerForm() {
    if (!this.careerFormGroup.valid) throw new Error('Career Form invalid');
    const updatedCareer = await this.formatCareer();
    try {
      const myCareer = this.myExistingCareer();
      console.log({ updatedCareer, myCareer });
      if (myCareer) {
        const saved = await this.sellerCareerService.updateMySellerCareer(updatedCareer);
        if (saved) {
          this.myExistingCareer.set(updatedCareer);
        }
      } else {
        const saved = await this.sellerCareerService.createSellerCareer(updatedCareer);
        if (saved) {
          this.myExistingCareer.set(saved);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async submitForReview() {
    try {
      await this.sellerCareerService.submitForReview();
      await this.sellerProfileService.submitForReview();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async reUploadProfileImage() {
    const uploadedFile = this.uploadedFiles()[0];
    if (!uploadedFile) throw new Error('No file to upload');
    try {
      await this.filesService.deleteFile(uploadedFile);
      this.uploadedFiles.set([]);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.careerFormSub.unsubscribe();
    this.profileFormSub.unsubscribe();
  }
}
