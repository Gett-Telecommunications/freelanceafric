import { AfterViewInit, Component, OnDestroy, ViewChild, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { I_SellerCareer, I_SellerProfile } from '@freelanceafric/users-shared';
import { SellerCareerService, SellerProfileService } from '@freelanceafric/user-ng-data-access';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, takeWhile } from 'rxjs';
import { UsersSellerCareerComponent, UsersSellerProfileComponent } from '@freelanceafric/users-ng-ui';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@freelanceafric/auth-data-access';

@Component({
  selector: 'lib-admin-dashboard-users-sellers-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatPaginatorModule,
    UsersSellerProfileComponent,
    UsersSellerCareerComponent,
    MatIconModule,
  ],
  templateUrl: './admin-dashboard-users-sellers-page.component.html',
  styleUrl: './admin-dashboard-users-sellers-page.component.scss',
})
export class AdminDashboardUsersSellersPageComponent implements AfterViewInit, OnDestroy {
  private sellerProfileService = inject(SellerProfileService);
  private sellerCareerService = inject(SellerCareerService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  allProfiles = signal<I_SellerProfile[]>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  displayedColumns: string[] = ['state', 'displayName', 'actions'];
  dataSource: MatTableDataSource<I_SellerProfile> = new MatTableDataSource(this.allProfiles());

  selectedSellerUID = signal<string | null>(null);
  selectedSellerProfile = signal<I_SellerProfile | null>(null);
  selectedSellerCareer = signal<I_SellerCareer | null>(null);
  showReviewData: WritableSignal<boolean> = signal<boolean>(false);

  paramsSub?: Subscription;
  queryParamsSub?: Subscription;

  constructor() {
    effect(() => {
      this.dataSource = new MatTableDataSource(this.allProfiles());
      if (this.paginator) {
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.sort.active = 'displayName';
        this.dataSource.sort = this.sort;
      }
    });
    this.paramsSub = this.activatedRoute.params.pipe(takeWhile(() => !this.selectedSellerUID())).subscribe((params) => {
      this.selectedSellerUID.set(params['r_seller_uid']);
    });
    this.queryParamsSub = this.activatedRoute.queryParams.subscribe(async (params) => {
      const r_review = params['r_review'];
      if (r_review === 'true') this.showReviewData.set(true);
      else this.showReviewData.set(false);
      await this.fetchData();
    });
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  async fetchData() {
    this.sellerProfileService.getAllSellerProfiles(true).then((sellerProfiles) => {
      this.allProfiles.set(sellerProfiles);
    });
    const selectedSellerUID = this.selectedSellerUID();
    const showReviewData = this.showReviewData();

    if (selectedSellerUID) {
      if (showReviewData) {
        const sellerProfile = await this.sellerProfileService.getSellerReviewProfileByID(selectedSellerUID);
        if (sellerProfile) {
          this.selectedSellerProfile.set(sellerProfile);
        }
        const sellerCareer = await this.sellerCareerService.getSellerReviewCareerByID(selectedSellerUID);
        if (sellerCareer) {
          this.selectedSellerCareer.set(sellerCareer);
        }
      } else {
        const sellerProfile = await this.sellerProfileService.getProfileByID(selectedSellerUID);
        if (sellerProfile) {
          this.selectedSellerProfile.set(sellerProfile);
        }
        const sellerCareer = await this.sellerCareerService.getSellerCareerById(selectedSellerUID);
        if (sellerCareer) {
          this.selectedSellerCareer.set(sellerCareer);
        }
      }
    }
  }

  applyFilter(event: Event) {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private async approveCareer(uid: string): Promise<boolean> {
    const approved = await this.sellerCareerService.approveSellerCareer(uid, 'approved');
    if (approved) {
      return true;
    }
    return false;
  }

  private async rejectCareer(uid: string) {
    const message = prompt('Please enter a message for the reason to reject the seller career');
    if (!message) throw new Error('No message provided');
    const rejected = await this.sellerCareerService.approveSellerCareer(uid, 'rejected', message);
    if (rejected) {
      return true;
    }
    return false;
  }

  private async approveProfile(uid: string): Promise<boolean> {
    const approved = await this.sellerProfileService.approveSellerProfile(uid, 'approved');
    if (approved) {
      return true;
    }
    return false;
  }

  private async rejectProfile(uid: string): Promise<boolean> {
    const message = prompt('Please enter a message for the reason to reject the seller profile');
    if (!message) throw new Error('No message provided');
    const rejected = await this.sellerProfileService.approveSellerProfile(uid, 'rejected', message);
    if (rejected) {
      return true;
    }
    return false;
  }

  async approveAllFor(uid: string) {
    // approve both the profile and career
    const approvedProfile = await this.approveProfile(uid);
    const approvedCareer = await this.approveCareer(uid);

    const updatedPermissions = await this.authService.updateUserPermission(uid, { isSeller: true });

    if (approvedProfile && approvedCareer && updatedPermissions) {
      this.fetchData();
    }
  }

  async revokeAllFor(uid: string) {
    // reject both the profile and career
    const rejectedProfile = await this.rejectProfile(uid);
    const rejectedCareer = await this.rejectCareer(uid);

    const updatedPermissions = await this.authService.updateUserPermission(uid, { isSeller: false });

    if (rejectedProfile && rejectedCareer && updatedPermissions) {
      this.fetchData();
    }
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }
}
