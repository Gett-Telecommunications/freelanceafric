import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardUsersShellComponent } from './admin-dashboard-users-shell.component';

describe('AdminDashboardUsersShellComponent', () => {
  let component: AdminDashboardUsersShellComponent;
  let fixture: ComponentFixture<AdminDashboardUsersShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUsersShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardUsersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
