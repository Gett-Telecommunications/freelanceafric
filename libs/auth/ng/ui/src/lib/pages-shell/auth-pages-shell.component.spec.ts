import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPagesShellComponent } from './auth-pages-shell.component';

describe('AuthPagesShellComponent', () => {
  let component: AuthPagesShellComponent;
  let fixture: ComponentFixture<AuthPagesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPagesShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPagesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
