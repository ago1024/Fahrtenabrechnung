import { TestBed, inject } from '@angular/core/testing';
import { IdHelperService } from '@app/services/id-helper.service';

import { LocationService } from './location.service';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        IdHelperService,
      ]
    });
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
