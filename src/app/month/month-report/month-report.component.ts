import {LocationService, Location} from '../../services/location.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface Day {
  day: string;
  date: Date;
  waypoints: Location[];
  steps: Step[];
  distance: number;
}

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css']
})
export class MonthReportComponent implements OnInit, OnChanges {

  @Input()
  year: number;

  @Input()
  month: number;

  displayedColumns = ['date', 'steps', 'distance'];
  locationColumns = ['id', 'name', 'address'];
  locations: MatTableDataSource<Location>;
  days: MatTableDataSource<Day>;

  constructor(public waypointService: WaypointService, public locationService: LocationService, public datePipe: DatePipe) {
    locationService.locationsChanged.subscribe(event => this.update());
    waypointService.changed.subscribe(event => this.update());
  }

  ngOnInit() {
  }

  update(): void {
    const locations = new Map<string, Location>();

    const days = [];
    if (this.year && this.month >= 0) {
      const first = new Date(this.year, this.month, 1);
      const stop = new Date(this.year, this.month + 1, 1);
      for (let i = 1; i <= 31; i++) {
        const current = new Date(this.year, this.month, i);
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

    this.days = new MatTableDataSource<Day>(days);
    this.locations = new MatTableDataSource<Location>(loc);
  }

  ngOnChanges(): void {
    this.update();
  }
}
