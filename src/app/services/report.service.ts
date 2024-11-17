import {LocationService, Location} from './location.service';
import {WaypointService, Step} from './waypoint.service';
import {formatDate} from '@angular/common';
import { Injectable, LOCALE_ID, inject } from '@angular/core';

export interface Day {
  day: string;
  date: Date;
  waypoints: Location[];
  steps: Step[];
  distance: number;
}

export interface Report {
  days: Array<Day>;
  locations: Array<Location>;
}

@Injectable()
export class ReportService {
  waypointService = inject(WaypointService);
  locationService = inject(LocationService);
  private localeId = inject(LOCALE_ID);


  update(year: number, month: number): Report {
    const locations = new Map<string, Location>();

    const days = new Array<Day>();
    if (year && month >= 0) {
      const stop = new Date(year, month + 1, 1);
      for (let i = 1; i <= 31; i++) {
        const current = new Date(Date.UTC(year, month, i));
        if (current.getTime() >= stop.getTime()) {
          break;
        }
        const date = formatDate(current, 'yyyy-MM-dd', this.localeId);
        const waypoints = this.waypointService.getWaypoints(date);
        const steps = this.waypointService.getSteps(date);
        const distance = this.waypointService.getTotalDistance(steps);

        waypoints.forEach(location => locations.set(location.id, location));

        days.push({
          day: date,
          date: current,
          waypoints: waypoints,
          steps: steps,
          distance: distance,
        });
      }
    }

    const loc = Array.from(locations.values()).sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id)).map(({id, name, address}) => ({id, name, address}));

    return {
      days: days,
      locations: loc
    };
  }

}
