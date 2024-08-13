import { TestBed } from '@angular/core/testing';

import { MatiereDataService } from './matiere-data.service';

describe('MatiereDataService', () => {
  let service: MatiereDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
