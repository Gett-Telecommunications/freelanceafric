import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewGigComponent } from './view-gig.component';

describe('ViewGigComponent', () => {
  let component: ViewGigComponent;
  let fixture: ComponentFixture<ViewGigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
