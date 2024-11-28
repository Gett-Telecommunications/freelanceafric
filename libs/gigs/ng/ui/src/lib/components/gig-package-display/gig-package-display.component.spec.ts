import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigPackageDisplayComponent } from './gig-package-display.component';

describe('GigPackageDisplayComponent', () => {
  let component: GigPackageDisplayComponent;
  let fixture: ComponentFixture<GigPackageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigPackageDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigPackageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
