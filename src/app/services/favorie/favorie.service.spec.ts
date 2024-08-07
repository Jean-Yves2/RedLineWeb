import { TestBed } from '@angular/core/testing';

import { FavorieService } from './favorie.service';

describe('FavorieService', () => {
  let service: FavorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
