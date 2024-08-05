import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsDataAccessComponent } from './payments-data-access.component';

describe('PaymentsDataAccessComponent', () => {
  let component: PaymentsDataAccessComponent;
  let fixture: ComponentFixture<PaymentsDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
