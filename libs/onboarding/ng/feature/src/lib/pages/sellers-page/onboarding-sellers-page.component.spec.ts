import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingSellersPageComponent } from './onboarding-sellers-page.component';

describe('OnboardingSellersPageComponent', () => {
  let component: OnboardingSellersPageComponent;
  let fixture: ComponentFixture<OnboardingSellersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSellersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingSellersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
