import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsUiComponent } from './payments-ui.component';

describe('PaymentsUiComponent', () => {
  let component: PaymentsUiComponent;
  let fixture: ComponentFixture<PaymentsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
