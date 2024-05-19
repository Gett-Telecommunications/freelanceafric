import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthAlreadyLoggedInComponent } from './auth-already-logged-in.component';

describe('AuthAlreadyLoggedInComponent', () => {
  let component: AuthAlreadyLoggedInComponent;
  let fixture: ComponentFixture<AuthAlreadyLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAlreadyLoggedInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthAlreadyLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
