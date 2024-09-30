import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersDashboardPageComponent } from './users-dashboard-page.component';

describe('UsersDashboardPageComponent', () => {
  let component: UsersDashboardPageComponent;
  let fixture: ComponentFixture<UsersDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDashboardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
