import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOrdersPageComponent } from './dashboard-orders-page.component';

describe('DashboardOrdersPageComponent', () => {
  let component: DashboardOrdersPageComponent;
  let fixture: ComponentFixture<DashboardOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOrdersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
