import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSellerPageComponent } from './dashboard-seller-page.component';

describe('DashboardSellerPageComponent', () => {
  let component: DashboardSellerPageComponent;
  let fixture: ComponentFixture<DashboardSellerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSellerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSellerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
