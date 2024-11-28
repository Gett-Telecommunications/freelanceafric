import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigExtrasFormComponent } from './gig-extras-form.component';

describe('GigExtrasFormComponent', () => {
  let component: GigExtrasFormComponent;
  let fixture: ComponentFixture<GigExtrasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigExtrasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigExtrasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
