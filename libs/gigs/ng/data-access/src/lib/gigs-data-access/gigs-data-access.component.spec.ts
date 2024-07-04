import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GigsDataAccessComponent } from './gigs-data-access.component';

describe('GigsDataAccessComponent', () => {
  let component: GigsDataAccessComponent;
  let fixture: ComponentFixture<GigsDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigsDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GigsDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
