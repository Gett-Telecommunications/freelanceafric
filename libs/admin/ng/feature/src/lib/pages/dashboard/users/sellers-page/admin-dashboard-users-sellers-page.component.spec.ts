import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardUsersSellersPageComponent } from './admin-dashboard-users-sellers-page.component';

describe('AdminDashboardUsersSellersPageComponent', () => {
  let component: AdminDashboardUsersSellersPageComponent;
  let fixture: ComponentFixture<AdminDashboardUsersSellersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUsersSellersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardUsersSellersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
