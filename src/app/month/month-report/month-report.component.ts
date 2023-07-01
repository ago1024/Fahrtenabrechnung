import {LocationService, Location} from '../../services/location.service';
import { ReportService, Day } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

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

  constructor(public waypointService: WaypointService, public locationService: LocationService, public reportService: ReportService) {
    locationService.locationsChanged.subscribe(event => this.update());
    waypointService.changed.subscribe(event => this.update());
  }

  ngOnInit() {
  }

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.days = new MatTableDataSource<Day>(report.days);
    this.locations = new MatTableDataSource<Location>(report.locations);
  }

  ngOnChanges(): void {
    this.update();
  }
}
