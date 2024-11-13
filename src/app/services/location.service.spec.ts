import { TestBed } from '@angular/core/testing';
import { IdHelperService } from '@app/services/id-helper.service';

import { Location, LocationService } from './location.service';

describe('LocationService', () => {

  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        IdHelperService,
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(LocationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new location', () => {
    service.createLocation('Name', 'Address');
    expect(Array.from(service.locations)).toEqual([jasmine.objectContaining({ id: '1', name: 'Name', address: 'Address' })])
  });

  describe('with locations and distances', () => {

    let location1: Location;
    let location2: Location;

    beforeEach(() => {
      location1 = service.createLocation('Name 1', 'Address 1');
      location2 = service.createLocation('Name 2', 'Address 2');

      service.setDistance(location1, location2, 123);
      service.setDistance(location2, location1, 321);

      expect(Array.from(service.locations)).toEqual([
        jasmine.objectContaining({ id: '1', name: 'Name 1', address: 'Address 1' }),
        jasmine.objectContaining({ id: '2', name: 'Name 2', address: 'Address 2' }),
      ]);

      expect(service.hasDistance(location1, location2)).toBeTrue();
      expect(service.getDistance(location1, location2)).toEqual(123);
      expect(service.hasDistance(location2, location1)).toBeTrue();
      expect(service.getDistance(location2, location1)).toEqual(321);
    });

    it('should update a location', () => {
      service.editLocation('1', 'New name 1', 'New address 1');

      expect(Array.from(service.locations)).toEqual([
        jasmine.objectContaining({ id: '1', name: 'New name 1', address: 'New address 1' }),
        jasmine.objectContaining({ id: '2', name: 'Name 2', address: 'Address 2' }),
      ]);

      expect(service.hasDistance(location1, location2)).toBeTrue();
      expect(service.getDistance(location1, location2)).toEqual(123);
    });

    it('should reset distances', () => {
      service.resetDistances(location1);

      expect(service.hasDistance(location1, location2)).toBeFalse();
      expect(service.hasDistance(location2, location1)).toBeFalse();
    });

  });

});
