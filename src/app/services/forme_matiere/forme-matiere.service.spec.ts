import { TestBed } from '@angular/core/testing';

import { FormeMatiereService } from './forme-matiere.service';

describe('FormeMatiereService', () => {
  let service: FormeMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormeMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
