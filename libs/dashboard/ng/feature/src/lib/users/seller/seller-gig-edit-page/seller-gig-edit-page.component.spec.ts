import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerGigEditPageComponent } from './seller-gig-edit-page.component';

describe('SellerGigEditPageComponent', () => {
  let component: SellerGigEditPageComponent;
  let fixture: ComponentFixture<SellerGigEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerGigEditPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerGigEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
