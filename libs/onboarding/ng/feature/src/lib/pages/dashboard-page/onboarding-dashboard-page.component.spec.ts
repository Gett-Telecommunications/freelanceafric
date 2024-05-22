import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingDashboardPageComponent } from './onboarding-dashboard-page.component';

describe('OnboardingDashboardPageComponent', () => {
  let component: OnboardingDashboardPageComponent;
  let fixture: ComponentFixture<OnboardingDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingDashboardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
