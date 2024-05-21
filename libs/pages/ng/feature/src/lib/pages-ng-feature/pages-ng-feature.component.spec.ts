import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesNgFeatureComponent } from './pages-ng-feature.component';

describe('PagesNgFeatureComponent', () => {
  let component: PagesNgFeatureComponent;
  let fixture: ComponentFixture<PagesNgFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesNgFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesNgFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
