import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingHeaderComponent } from './floating-header.component';

describe('FloatingHeaderComponent', () => {
  let component: FloatingHeaderComponent;
  let fixture: ComponentFixture<FloatingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
