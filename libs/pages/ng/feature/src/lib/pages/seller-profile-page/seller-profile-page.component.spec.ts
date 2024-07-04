import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerProfilePageComponent } from './seller-profile-page.component';

describe('SellerProfilePageComponent', () => {
  let component: SellerProfilePageComponent;
  let fixture: ComponentFixture<SellerProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProfilePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
