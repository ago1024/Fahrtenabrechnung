import {LocationService, Location} from './location.service';
import {WaypointService, Step} from './waypoint.service';
import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

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

  constructor(public waypointService: WaypointService, public locationService: LocationService, public datePipe: DatePipe) {
  }

  update(year: number, month: number): Report {
    const locations = new Map<string, Location>();

    const days = new Array<Day>();
    if (year && month >= 0) {
      const first = new Date(year, month, 1);
      const stop = new Date(year, month + 1, 1);
      for (let i = 1; i <= 31; i++) {
        const current = new Date(year, month, i);
        if (current.getTime() >= stop.getTime()) {
          break;
        }
        const id = this.datePipe.transform(current, 'yyyy-MM-dd');
        const waypoints = this.waypointService.getWaypoints(id);
        const steps = this.waypointService.getSteps(id);
        const distance = this.waypointService.getTotalDistance(steps);

        waypoints.forEach(location => locations.set(location.id, location));

        days.push({
          day: id,
          date: current,
          waypoints: waypoints,
          steps: steps,
          distance: distance,
        });
      }
    }

    const loc = Array.from(locations.values()).sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id));

    return {
      days: days,
      locations: loc
    };
  }

}
