import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigPackageFormComponent } from './gig-package-form.component';

describe('GigPackageFormComponent', () => {
  let component: GigPackageFormComponent;
  let fixture: ComponentFixture<GigPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigPackageFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
