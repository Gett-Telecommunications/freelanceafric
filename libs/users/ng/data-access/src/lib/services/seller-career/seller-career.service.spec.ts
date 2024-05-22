import { TestBed } from '@angular/core/testing';

import { SellerCareerService } from './seller-career.service';

describe('SellerCareerService', () => {
  let service: SellerCareerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerCareerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
