import {Location} from './location.service';
import {Injectable} from '@angular/core';

@Injectable()
export class MapsService {

  getUrl(from: Location, to: Location): string {
    const url = new URL('https://www.google.com/maps/embed/v1/directions');
    url.searchParams.append('key', import.meta.env.NG_APP_MAPS_APIKEY || 'MAPS_APIKEY_DUMMY');
    url.searchParams.append('origin', from.address);
    url.searchParams.append('destination', to.address);
    url.searchParams.append('mode', 'driving');
    return url.toString();
  }

}
