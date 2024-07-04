import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerGigPreviewPageComponent } from './seller-gig-preview-page.component';

describe('SellerGigPreviewPageComponent', () => {
  let component: SellerGigPreviewPageComponent;
  let fixture: ComponentFixture<SellerGigPreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerGigPreviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerGigPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
