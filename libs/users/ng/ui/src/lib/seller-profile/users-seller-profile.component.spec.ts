import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersSellerProfileComponent } from './users-seller-profile.component';

describe('UsersSellerProfileComponent', () => {
  let component: UsersSellerProfileComponent;
  let fixture: ComponentFixture<UsersSellerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSellerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersSellerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
