import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardGigsShellComponent } from './admin-dashboard-gigs-shell.component';

describe('AdminDashboardGigsShellComponent', () => {
  let component: AdminDashboardGigsShellComponent;
  let fixture: ComponentFixture<AdminDashboardGigsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardGigsShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardGigsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
