import {LocationService, Location, DistanceChange} from './location.service';
import {StorageService} from './storage.service';
import { Injectable, inject } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export type Step = {
  from: Location;
  to: Location;
  distance: number | undefined;
}

export type WaypointEntries = { locations: Location[], distances: [string, number][], waypoints: [string, string[]][] };

const MISSING_LOCATION = {
  id: '',
  name: 'FEHLEND',
  address: '',
}

@Injectable()
export class WaypointService {
  private locationService = inject(LocationService);
  private storage = inject(StorageService);


  public changed: Observable<string>;
  private emitter: Subject<string>;

  private _waypoints: Map<string, string[]> = new Map();

  constructor() {
    this.emitter = this.changed = new Subject();

    this.locationService.locationsChanged.subscribe(() => this.save());
    this.locationService.locationChanged.subscribe(location => this.onLocationChange(location));
    this.locationService.distanceChanged.subscribe(change => this.onDistanceChange(change));
  }

  onLocationChange(location: Location) {
    this._waypoints.forEach((waypoints, date) => {
      if (waypoints && waypoints.indexOf(location.id) !== -1) {
        this.emitter.next(date);
      }
    });
  }

  onDistanceChange(change: DistanceChange) {
    if ('location' in change) {
      this.onLocationChange(change.location);
    } else {
      this._waypoints.forEach((waypoints, date) => {
        for (let pos = 0; waypoints && pos < waypoints.length - 1; pos++) {
          if (waypoints[pos] === change.from.id && waypoints[pos + 1] === change.to.id) {
            this.emitter.next(date);
            return;
          }
        }
      });
    }
    this.save();
  }

  getSteps(date: string): Step[] {
    const waypoints = this.getWaypoints(date);
    const steps: Step[] = [];
    let last: Location | undefined = undefined;
    for (const {id, name, address} of waypoints) {
      const waypoint = { id, name, address };
      if (last !== undefined) {
        const from = last;
        const to = waypoint;
        steps.push({
          from,
          to,
          distance: this.locationService.getDistance(from, to),
        });
      }
      last = waypoint;
    }
    return steps;
  }

  getTotalDistance(steps: Step[]): number | undefined {
    let totalDistance: number = 0;
    for (const step of steps) {
      if (step.distance === undefined) {
        return;
      } else {
        totalDistance += step.distance;
      }
    }
    return totalDistance;
  }

  getWaypoints(date: string): Location[] {
    if (!this._waypoints.has(date)) {
      return [];
    }

    return this._waypoints.get(date)?.map(id => this.locationService.getLocation(id) ?? MISSING_LOCATION) ?? [];
  }

  addWaypoint(date: string, location: Location) {
    let waypoints = this._waypoints.get(date);
    if (!waypoints) {
      waypoints = [];
      this._waypoints.set(date, waypoints);
    }
    waypoints.push(location.id);
    this.save();
    this.emitter.next(date);
  }

  deleteWaypoint(date: string, index: number) {
    const waypoints = this._waypoints.get(date);
    if (waypoints) {
      waypoints.splice(index, 1);
      if (waypoints.length === 0) {
        this._waypoints.delete(date);
      }
      this.save();
      this.emitter.next(date);
    }
  }

  toJSON(): WaypointEntries {
    const data = {
      ...this.locationService.toJSON(),
      waypoints: Array.from(this._waypoints),
    };
    return data;
  }

  fromJSON(data: WaypointEntries) {
    this._waypoints.clear();
    this.locationService.fromJSON(data);
    if (data && data.waypoints.forEach) {
      data.waypoints.forEach(entry => this._waypoints.set(entry[0], entry[1]));
    }
  }

  save() {
    this.storage.data = this.toJSON();
  }

  load() {
    this.fromJSON(this.storage.data);
  }
}
