import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerGigsPageComponent } from './seller-gigs-page.component';

describe('SellerGigsPageComponent', () => {
  let component: SellerGigsPageComponent;
  let fixture: ComponentFixture<SellerGigsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerGigsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerGigsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
