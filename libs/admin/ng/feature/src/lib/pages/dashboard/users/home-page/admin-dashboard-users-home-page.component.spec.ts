import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardUsersHomePageComponent } from './admin-dashboard-users-home-page.component';

describe('AdminDashboardUsersHomePageComponent', () => {
  let component: AdminDashboardUsersHomePageComponent;
  let fixture: ComponentFixture<AdminDashboardUsersHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUsersHomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardUsersHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
