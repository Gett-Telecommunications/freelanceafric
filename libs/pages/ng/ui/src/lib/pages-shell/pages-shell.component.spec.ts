import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesShellComponent } from './pages-shell.component';

describe('PagesShellComponent', () => {
  let component: PagesShellComponent;
  let fixture: ComponentFixture<PagesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
