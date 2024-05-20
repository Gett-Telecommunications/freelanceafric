import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardCategoriesPageComponent } from './admin-dashboard-categories-page.component';

describe('AdminDashboardCategoriesPageComponent', () => {
  let component: AdminDashboardCategoriesPageComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCategoriesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
