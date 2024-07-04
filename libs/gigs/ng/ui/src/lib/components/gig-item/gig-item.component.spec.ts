import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigItemComponent } from './gig-item.component';

describe('GigItemComponent', () => {
  let component: GigItemComponent;
  let fixture: ComponentFixture<GigItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
