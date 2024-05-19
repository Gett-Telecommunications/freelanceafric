import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthRegisterPageComponent } from './auth-register-page.component';

describe('AuthRegisterPageComponent', () => {
  let component: AuthRegisterPageComponent;
  let fixture: ComponentFixture<AuthRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegisterPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
