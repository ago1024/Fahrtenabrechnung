import { TestBed, inject } from '@angular/core/testing';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { StorageService } from '@app/services/storage.service';

import { WaypointService } from './waypoint.service';

describe('WaypointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WaypointService,
        LocationService,
        IdHelperService,
        StorageService,
      ]
    });
  });

  it('should be created', inject([WaypointService], (service: WaypointService) => {
    expect(service).toBeTruthy();
  }));
});
