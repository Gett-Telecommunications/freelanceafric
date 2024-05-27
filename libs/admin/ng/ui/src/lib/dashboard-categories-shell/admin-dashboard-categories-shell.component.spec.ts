import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardCategoriesShellComponent } from './admin-dashboard-categories-shell.component';

describe('AdminDashboardCategoriesShellComponent', () => {
  let component: AdminDashboardCategoriesShellComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCategoriesShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
