import {LocationService, Location} from '../../services/location.service';
import { ReportService, Day } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-month-days',
  templateUrl: './month-days.component.html',
  styleUrls: ['./month-days.component.css']
})
export class MonthDaysComponent implements OnInit, OnChanges {

  @Input()
  year: number;

  @Input()
  month: number;

  displayedColumns = ['date', 'steps', 'distance'];
  days: MatTableDataSource<Day>;

  constructor(public waypointService: WaypointService, public locationService: LocationService, public reportService: ReportService) {
    locationService.locationsChanged.subscribe(event => this.update());
    waypointService.changed.subscribe(event => this.update());
  }

  ngOnInit() {
  }

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.days = new MatTableDataSource<Day>(report.days);
  }

  ngOnChanges(): void {
    this.update();
  }

}
