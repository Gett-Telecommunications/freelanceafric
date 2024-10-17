import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardGigsApproveActionsPageComponent } from './admin-dashboard-gigs-approve-actions-page.component';

describe('AdminDashboardGigsApproveActionsPageComponent', () => {
  let component: AdminDashboardGigsApproveActionsPageComponent;
  let fixture: ComponentFixture<AdminDashboardGigsApproveActionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardGigsApproveActionsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardGigsApproveActionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
