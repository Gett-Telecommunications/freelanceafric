import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewGigComponent } from './create-new-gig.component';

describe('CreateNewGigComponent', () => {
  let component: CreateNewGigComponent;
  let fixture: ComponentFixture<CreateNewGigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewGigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
