import {Location} from './location.service';
import {Injectable} from '@angular/core';

@Injectable()
export class MapsService {

  constructor() {}

  getUrl(from: Location, to: Location): string {
    const url = new URL('https://www.google.com/maps/embed/v1/directions');
    url.searchParams.append('key', 'AIzaSyDWcY1BoJZ8zKDdZPoN7g33b93BIHETQIQ');
    url.searchParams.append('origin', from.address);
    url.searchParams.append('destination', to.address);
    url.searchParams.append('mode', 'driving');
    return url.toString();
  }

  openMaps(from: Location, to: Location) {
    const url = this.getUrl(from, to);
    console.log(url);
    window.open(url);
  }
}
