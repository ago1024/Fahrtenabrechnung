import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';
import { Location } from '@app/services/location.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });

    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the maps url', () => {

    const [location1, location2] = [
      { 'id': '1', 'name': 'Waypoint 1', 'address': 'Zwickauer Straße 16, Chemnitz' },
      { 'id': '2', 'name': 'Waypoint 2', 'address': 'Augustusburger Str. 265, Chemnitz' }
    ] satisfies Location[];

    const url = service.getUrl(location1, location2);
    expect(url).toEqual('https://www.google.com/maps/embed/v1/directions?key=MAPS_APIKEY_DUMMY&origin=Zwickauer+Stra%C3%9Fe+16%2C+Chemnitz&destination=Augustusburger+Str.+265%2C+Chemnitz&mode=driving');
  });
});
