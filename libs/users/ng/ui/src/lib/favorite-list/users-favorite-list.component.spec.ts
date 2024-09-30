import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFavoriteListComponent } from './users-favorite-list.component';

describe('UsersFavoriteListComponent', () => {
  let component: UsersFavoriteListComponent;
  let fixture: ComponentFixture<UsersFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFavoriteListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
