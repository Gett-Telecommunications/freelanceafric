import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNgUiComponent } from './admin-ng-ui.component';

describe('AdminNgUiComponent', () => {
  let component: AdminNgUiComponent;
  let fixture: ComponentFixture<AdminNgUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNgUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNgUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
