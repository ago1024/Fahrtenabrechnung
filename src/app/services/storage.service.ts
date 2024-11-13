import {Injectable} from '@angular/core';
import { WaypointEntries } from './waypoint.service';

@Injectable()
export class StorageService {

  private key = 'app.Fahrtenabrechnung';

  get data(): WaypointEntries {
    return JSON.parse(localStorage.getItem(this.key)) ?? { 'locations': [], 'distances': [], 'waypoints': [] };
  }

  set data(data: WaypointEntries) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  constructor() {}
}
