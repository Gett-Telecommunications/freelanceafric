import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardNewCategoryPageComponent } from './admin-dashboard-new-category-page.component';

describe('AdminDashboardNewCategoryPageComponent', () => {
  let component: AdminDashboardNewCategoryPageComponent;
  let fixture: ComponentFixture<AdminDashboardNewCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardNewCategoryPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardNewCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
