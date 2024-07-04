import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigPageComponent } from './gig-page.component';

describe('GigPageComponent', () => {
  let component: GigPageComponent;
  let fixture: ComponentFixture<GigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
