import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardGigsApprovePageComponent } from './admin-dashboard-gigs-approve-page.component';

describe('AdminDashboardGigsApprovePageComponent', () => {
  let component: AdminDashboardGigsApprovePageComponent;
  let fixture: ComponentFixture<AdminDashboardGigsApprovePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardGigsApprovePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardGigsApprovePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
