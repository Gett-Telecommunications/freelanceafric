import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerNewGigPageComponent } from './seller-new-gig-page.component';

describe('SellerNewGigPageComponent', () => {
  let component: SellerNewGigPageComponent;
  let fixture: ComponentFixture<SellerNewGigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerNewGigPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerNewGigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
