import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesNgDataAccessComponent } from './categories-ng-data-access.component';

describe('CategoriesNgDataAccessComponent', () => {
  let component: CategoriesNgDataAccessComponent;
  let fixture: ComponentFixture<CategoriesNgDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesNgDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesNgDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
