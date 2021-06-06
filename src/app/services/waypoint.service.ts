import {LocationService, Location, DistanceChange} from './location.service';
import {StorageService} from './storage.service';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export class Step {
  from: Location;
  to: Location;
  distance: number;
}

@Injectable()
export class WaypointService {

  public changed: Observable<string>;
  private emitter: Subject<string>;

  private _waypoints: Map<string, string[]> = new Map();

  constructor(private locationService: LocationService, private storage: StorageService) {
    this.emitter = this.changed = new Subject();

    this.locationService.locationsChanged.subscribe(e => this.save());
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
    if (change.location) {
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
    const steps = [];
    let last: Location;
    for (const waypoint of waypoints) {
      if (last !== undefined) {
        const step = new Step();
        step.from = last;
        step.to = waypoint;
        step.distance = this.locationService.getDistance(step.from, step.to);
        steps.push(step);
      }
      last = waypoint;
    }
    return steps;
  }

  getTotalDistance(steps: Step[]): number {
    let totalDistance = 0;
    for (const step of steps) {
      if (totalDistance === undefined || step.distance === undefined) {
        totalDistance = undefined;
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

    return this._waypoints.get(date).map(id => this.locationService.getLocation(id));
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

  toJSON(): any {
    const data = this.locationService.toJSON();
    data.waypoints = Array.from(this._waypoints);
    return data;
  }

  fromJSON(data: any) {
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
