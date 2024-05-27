import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersNgFeatureComponent } from './users-ng-feature.component';

describe('UsersNgFeatureComponent', () => {
  let component: UsersNgFeatureComponent;
  let fixture: ComponentFixture<UsersNgFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersNgFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersNgFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
