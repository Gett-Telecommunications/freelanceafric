import { TestBed } from '@angular/core/testing';

import { GigPackagesService } from './gig-packages.service';

describe('GigPackagesService', () => {
  let service: GigPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
