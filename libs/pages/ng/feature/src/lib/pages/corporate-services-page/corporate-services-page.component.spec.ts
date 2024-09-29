import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorporateServicesPageComponent } from './corporate-services-page.component';

describe('CorporateServicesPageComponent', () => {
  let component: CorporateServicesPageComponent;
  let fixture: ComponentFixture<CorporateServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateServicesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
