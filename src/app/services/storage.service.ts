import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { WaypointEntries } from './waypoint.service';

@Injectable()
export class StorageService {

  private readonly localStorageService = inject(LocalStorageService);

  get data(): WaypointEntries {
    const data = this.localStorageService.data;
    if (data) {
      return JSON.parse(data);
    }
    return { 'locations': [], 'distances': [], 'waypoints': [] };
  }

  set data(data: WaypointEntries) {
    this.localStorageService.data = JSON.stringify(data);
  }

  constructor() {}
}
