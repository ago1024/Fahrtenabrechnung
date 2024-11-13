import {IdHelperService} from './id-helper.service';
import { Injectable, inject } from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * Location interface
 */
export interface Location {
  /**
   * unique id
   */
  id: string;
  /**
   * displayed name
   */
  name: string;
  /**
   * full address
   */
  address: string;
}

interface DistanceReset {
  resetDistances(location: Location);
}

class LocationImpl implements Location {
  private _id: string;
  private _name: string;
  private _address: string;
  private _service: DistanceReset;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  constructor(service: DistanceReset, id: string, name: string, address: string) {
    this._service = service;
    this._id = id;
    this._name = name;
    this._address = address;
  }

}

export class DistanceChange {
  location: Location;
  from: Location;
  to: Location;
  distance: number;
}

export type LocationEntries = { locations: Location[], distances: [string, number][] };

/**
 * Service to track locations and distances between locations
 */
@Injectable()
export class LocationService implements DistanceReset {
  idhelper = inject(IdHelperService);

  /**
   * locations
   */
  private _locations: Map<string, Location> = new Map();

  private _distances: Map<string, number> = new Map();

  public locationChanged: Observable<Location>;
  private locationChangedEmitter: Subject<Location>;

  public locationsChanged: Observable<any>;
  private locationsChangedEmitter: Subject<any>;

  public distanceChanged: Observable<DistanceChange>;
  private distanceChangedEmitter: Subject<DistanceChange>;

  private static key(from: Location, to: Location): string {
    return from.id + ':' + to.id;
  }

  constructor() {
    this.locationChanged = this.locationChangedEmitter = new Subject();
    this.locationsChanged = this.locationsChangedEmitter = new Subject();
    this.distanceChanged = this.distanceChangedEmitter = new Subject();
  }

  get locations(): IterableIterator<Location> {
    return this._locations.values();
  }

  getLocation(id: string): Location {
    return this._locations.get(id);
  }

  createLocation(name: string, address: string): Location {
    const id = this.idhelper.nextId(this._locations.keys(), true);
    const location = new LocationImpl(this, id, name, address);
    this._locations.set(id, location);

    this.locationChangedEmitter.next(location);
    this.locationsChangedEmitter.next(undefined);

    return location;
  }

  editLocation(id: string, name: string, address: string): Location {
    const location = this._locations.get(id);
    if (!location) {
      return;
    }

    location.name = name;
    location.address = address;

    this.locationChangedEmitter.next(location);
    this.locationsChangedEmitter.next(undefined);

    return location;
  }

  deleteLocation(location: Location) {
    this.resetDistances(location);
    this._locations.delete(location.id);

    this.locationsChangedEmitter.next(undefined);
  }

  /**
   * reset distances to or from this location
   */
  resetDistances(location: Location) {
    this._distances.forEach((value, key) => {
      const ids: string[] = key.split(':');
      if (ids[0] === location.id || ids[1] === location.id) {
        this._distances.delete(key);
      }
    });

    const distanceChange = new DistanceChange();
    distanceChange.location = location;
    this.distanceChangedEmitter.next(distanceChange);
  }

  hasDistance(from: Location, to: Location): boolean {
    return this._distances.has(LocationService.key(from, to));
  }

  getDistance(from: Location, to: Location): number {
    return this._distances.get(LocationService.key(from, to));
  }

  setDistance(from: Location, to: Location, distance: number) {
    this._distances.set(LocationService.key(from, to), distance);

    const distanceChange = new DistanceChange();
    distanceChange.from = from;
    distanceChange.to = to;
    distanceChange.distance = distance;
    this.distanceChangedEmitter.next(distanceChange);
  }

  toJSON(): LocationEntries {
    return {
      locations: Array.from(this.locations).map(({ id, name, address}) => ({id, name, address})),
      distances: Array.from(this._distances)
    };
  }

  fromJSON(data: LocationEntries) {
    this._locations.clear();
    this._distances.clear();
    if (data) {
      data.locations.forEach(location => this._locations.set(location.id,
        new LocationImpl(this, location.id, location.name, location.address)));
      if (data.distances.forEach) {
        data.distances.forEach(entry => this._distances.set(entry[0], entry[1]));
      }
    }
  }
}
