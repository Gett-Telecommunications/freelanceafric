import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigListComponent } from './gig-list.component';

describe('GigListComponent', () => {
  let component: GigListComponent;
  let fixture: ComponentFixture<GigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
