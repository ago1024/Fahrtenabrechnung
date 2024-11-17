import { TestBed } from '@angular/core/testing';
import { IdHelperService } from '@app/services/id-helper.service';
import { Location, LocationService } from '@app/services/location.service';
import { provideTestStorageService } from '@app/services/storage.service.spec';

import { WaypointService } from './waypoint.service';

describe('WaypointService', () => {

  let service: WaypointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WaypointService,
        LocationService,
        IdHelperService,
        provideTestStorageService(),
      ]
    });

    service = TestBed.inject(WaypointService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should import', () => {
    service.fromJSON({
      distances: [['1:2', 100], ['2:1', 111]],
      locations: [{ id: '1', name: 'Waypoint 1', address: 'Address 1'}, { id: '2', name: 'Waypoint 2', address: 'Address 2'}],
      waypoints: [['2020-01-01', ['1', '2']]],
    });
    expect(service.getWaypoints('2020-01-01')).toEqual([
      jasmine.objectContaining({ id: '1', name: 'Waypoint 1', address: 'Address 1'}),
      jasmine.objectContaining({ id: '2', name: 'Waypoint 2', address: 'Address 2'}),
    ]);
    console.log(service.getSteps('2020-01-01'));
    expect(service.getSteps('2020-01-01')).toEqual([{
      from: jasmine.objectContaining({ id: '1', name: 'Waypoint 1', address: 'Address 1'}),
      to: jasmine.objectContaining({ id: '2', name: 'Waypoint 2', address: 'Address 2'}),
      distance: 100,
    }]);
  });

  describe('with data', () => {

    let location1: Location;
    let location2: Location;

    beforeEach(() => {
      const locationService = TestBed.inject(LocationService);
      location1 = locationService.createLocation('Name 1', 'Address 1');
      location2 = locationService.createLocation('Name 2', 'Address 2');
      locationService.setDistance(location1, location2, 100);

      service.addWaypoint('2020-01-01', location1);
      service.addWaypoint('2020-01-02', location1);
      service.addWaypoint('2020-01-02', location2);
    });

    it('should emit locationChange', () => {
      const changed: string[] = [];
      service.changed.subscribe(date => changed.push(date));
      service.onLocationChange(location1)

      expect(changed).toEqual(['2020-01-01', '2020-01-02']);
    });

    it('should emit changes for changed distances', () => {
      const changed: string[] = [];
      service.changed.subscribe(date => changed.push(date));

      const locationService = TestBed.inject(LocationService);
      locationService.setDistance(location1, location2, 111);

      expect(changed).toEqual(['2020-01-02']);
    });

    it('should emit changes for reset distances', () => {
      const changed: string[] = [];
      service.changed.subscribe(date => changed.push(date));

      const locationService = TestBed.inject(LocationService);
      locationService.resetDistances(location1);

      expect(changed).toEqual(['2020-01-01', '2020-01-02']);
    });

    it('shoud get the total distance for empty steps', () => {
      const distance = service.getTotalDistance([]);
      expect(distance).toEqual(0);
    });

    it('shoud get the total distance for one step', () => {
      const distance = service.getTotalDistance([{ from: location1, to: location2, distance: 100 }]);
      expect(distance).toEqual(100);
    });

    it('shoud get the total distance for two steps', () => {
      const distance = service.getTotalDistance([{ from: location1, to: location2, distance: 100 }, { from: location2, to: location1, distance: 100 }]);
      expect(distance).toEqual(200);
    });

    it('shoud get the undefined total distance for undefined distances', () => {
      const distance = service.getTotalDistance([{ from: location1, to: location2, distance: 100 }, { from: location2, to: location1, distance: undefined }]);
      expect(distance).toBeUndefined();
    });

    it('should delete a waypoint', () => {
      service.deleteWaypoint('2020-01-02', 0);
      expect(service.getWaypoints('2020-01-02')).toEqual([jasmine.objectContaining(location2)]);
    });

    it('should delete a single waypoint', () => {
      service.deleteWaypoint('2020-01-01', 0);
      expect(service.getWaypoints('2020-01-01')).toEqual([]);
    });


  });



});
