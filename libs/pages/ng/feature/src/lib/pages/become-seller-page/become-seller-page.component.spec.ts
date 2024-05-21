import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BecomeSellerPageComponent } from './become-seller-page.component';

describe('BecomeSellerPageComponent', () => {
  let component: BecomeSellerPageComponent;
  let fixture: ComponentFixture<BecomeSellerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeSellerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BecomeSellerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
