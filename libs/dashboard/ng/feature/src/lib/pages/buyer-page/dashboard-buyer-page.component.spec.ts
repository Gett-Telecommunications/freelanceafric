import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBuyerPageComponent } from './dashboard-buyer-page.component';

describe('DashboardBuyerPageComponent', () => {
  let component: DashboardBuyerPageComponent;
  let fixture: ComponentFixture<DashboardBuyerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBuyerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBuyerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
