import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingShellComponent } from './onboarding-shell.component';

describe('OnboardingShellComponent', () => {
  let component: OnboardingShellComponent;
  let fixture: ComponentFixture<OnboardingShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
