import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverHeaderComponent } from './cover-header.component';

describe('CoverHeaderComponent', () => {
  let component: CoverHeaderComponent;
  let fixture: ComponentFixture<CoverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
