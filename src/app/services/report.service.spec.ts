import { TestBed } from '@angular/core/testing';
import { IdHelperService } from '@app/services/id-helper.service';
import { Location, LocationService } from '@app/services/location.service';
import { WaypointService } from '@app/services/waypoint.service';

import { provideTestStorageService } from '@app/services/storage.service.spec';
import { ReportService } from './report.service';

function* dateRange(startDate: string, endDate: string) {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  for (let i = start; i <= end; i += 24 * 60 * 60 * 1000) {
    yield new Date(i);
  }
}

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReportService,
        WaypointService,
        LocationService,
        IdHelperService,
        provideTestStorageService(),
      ],
    });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update', () => {
    const locations = TestBed.inject(LocationService);
    const waypoints = TestBed.inject(WaypointService);

    const location1 = locations.createLocation('Waypoint 1', 'Zwickauer Straße 16, Chemnitz');
    const location2 = locations.createLocation('Waypoint 2', 'Augustusburger Str. 265, Chemnitz');
    waypoints.addWaypoint('2020-01-01', location1);
    waypoints.addWaypoint('2020-01-01', location2);
    locations.setDistance(location1, location2, 5.8);

    const report = service.update(2020, 0);

    function day(date: string, waypoints: Location[]) {
      return jasmine.objectContaining({
        day: date,
        date: new Date(date),
        waypoints: waypoints.map(({ id, name, address }) => jasmine.objectContaining({ id, name, address })),
      });
    }

    expect(report).toEqual({
      days: [
        day('2020-01-01', [location1, location2 ]),
        ...Array.from(dateRange('2020-01-02', '2020-01-31')).map(() => jasmine.objectContaining({ steps: [] })),
      ],
      locations: [ location1, location2 ],
    });

  });

  it('should handle empty months', () => {
    const report = service.update(2020, 1);
    expect(report).toEqual({
      days: [
        ...Array.from(dateRange('2020-02-01', '2020-02-29')).map(() => jasmine.objectContaining({ steps: [] })),
      ],
      locations: [],
    });
  });

});
