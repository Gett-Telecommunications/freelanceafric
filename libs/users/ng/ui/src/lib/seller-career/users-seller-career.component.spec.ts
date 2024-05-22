import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersSellerCareerComponent } from './users-seller-career.component';

describe('UsersSellerCareerComponent', () => {
  let component: UsersSellerCareerComponent;
  let fixture: ComponentFixture<UsersSellerCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSellerCareerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersSellerCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
