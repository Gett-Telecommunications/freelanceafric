import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGigComponent } from './edit-gig.component';

describe('EditGigComponent', () => {
  let component: EditGigComponent;
  let fixture: ComponentFixture<EditGigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
