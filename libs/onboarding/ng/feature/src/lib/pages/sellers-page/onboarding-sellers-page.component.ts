import { AfterViewInit, Component, WritableSignal, computed, effect, inject, signal } from '@angular/core';
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
  ],
  templateUrl: './onboarding-sellers-page.component.html',
  styleUrl: './onboarding-sellers-page.component.scss',
})
export class OnboardingSellersPageComponent implements AfterViewInit {
  sellerProfileService = inject(SellerProfileService);
  filesService = inject(FileManagementService);
  sellerCareerService = inject(SellerCareerService);

  myExistingProfile = signal<I_SellerProfile | null>(null);
  myExistingCareer = signal<I_SellerCareer | null>(null);

  personalInfoFormGroup = this._formBuilder.group({
    displayName: ['', Validators.required],
    intro: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
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
  profilePicURL = signal('');

  fileRoutes = E_FileRoutes;

  constructor(private _formBuilder: FormBuilder) {
    effect(() => {
      // Decide which profile to use
      const profileFromDB = this.myExistingProfile();
      if (!profileFromDB) return;
      let profileToUse = profileFromDB;
      if (profileFromDB.draft) {
        profileToUse = profileFromDB.draft;
      }
      // patch the form values
      this.personalInfoFormGroup.patchValue({
        displayName: profileToUse.displayName,
        intro: profileToUse.intro,
        country: profileToUse.country,
        city: profileToUse.city,
      });
      // get the file
      this.filesService.getFileDataByIdFromDB(profileToUse.profileImageID).then((file) => {
        if (file) this.uploadedFiles.set([file]);
      });
    });
    effect(() => {
      const uploadedImage = this.profileImageID();
      if (!uploadedImage) return;
      this.filesService.getFileDownloadURLById(uploadedImage).then((file) => {
        if (file) {
          this.profilePicURL.set(file);
        }
      });
    });
    effect(() => {
      const myCareer = this.myExistingCareer();
      if (!myCareer) return;
      let careerToUse = myCareer;
      if (myCareer.draft) {
        careerToUse = myCareer.draft;
      }
      this.careerFormGroup.patchValue({
        occupation: careerToUse.occupation,
        overview: careerToUse.overview,
        experience: careerToUse.experience,
        skills: careerToUse.skills,
        education: careerToUse.education,
      });
    });
  }

  ngAfterViewInit() {
    this.fetchMyData();
  }

  formatProfile(): I_SellerProfile {
    return {
      uid: '',
      displayName: this.personalInfoFormGroup.value.displayName || '',
      intro: this.personalInfoFormGroup.value.intro || '',
      country: this.personalInfoFormGroup.value.country || '',
      city: this.personalInfoFormGroup.value.city || '',
      status: 'pending',
      profileImageID: this.profileImageID() || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  formatCareer(): I_SellerCareer {
    return {
      uid: '',
      occupation: this.careerFormGroup.value.occupation || '',
      overview: this.careerFormGroup.value.overview || '',
      experience: this.careerFormGroup.value.experience || '',
      skills: this.careerFormGroup.value.skills || '',
      education: this.careerFormGroup.value.education || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  fetchMyData() {
    this.sellerProfileService.getMyProfile().then((profile) => {
      if (!profile) return;
      this.myExistingProfile.set(profile);
    });
    this.sellerCareerService.getMySellerCareer().then((career) => {
      if (!career) return;
      this.myExistingCareer.set(career);
    });
  }

  async submitProfileForm() {
    if (!this.personalInfoFormGroup.valid) return;
    if (!this.profileImageID()) {
      alert('Please upload a profile image');
      return;
    }
    try {
      if (this.myExistingProfile()) {
        const saved = await this.sellerProfileService.updateMySellerProfile(this.formatProfile());
        if (saved) {
          this.myExistingProfile.set(saved);
        }
      } else {
        const saved = await this.sellerProfileService.createSellerProfile(this.formatProfile());
        if (saved) {
          this.myExistingProfile.set(saved);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async submitCareerForm() {
    if (!this.careerFormGroup.valid) return;
    try {
      const myCareer = this.myExistingCareer();
      if (myCareer) {
        const saved = await this.sellerCareerService.updateMySellerCareer(this.formatCareer());
        if (saved) {
          this.myExistingCareer.set({ ...myCareer, draft: saved });
        }
      } else {
        const saved = await this.sellerCareerService.createSellerCareer(this.formatCareer());
        if (saved) {
          this.myExistingCareer.set(saved);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
