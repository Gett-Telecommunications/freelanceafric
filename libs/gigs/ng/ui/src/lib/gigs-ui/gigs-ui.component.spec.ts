import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigsUiComponent } from './gigs-ui.component';

describe('GigsUiComponent', () => {
  let component: GigsUiComponent;
  let fixture: ComponentFixture<GigsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
