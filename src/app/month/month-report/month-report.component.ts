import {LocationService, Location} from '../../services/location.service';
import { ReportService, Day } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, OnChanges, inject } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, NgIf, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class MonthReportComponent implements OnInit, OnChanges {
  waypointService = inject(WaypointService);
  locationService = inject(LocationService);
  reportService = inject(ReportService);


  @Input()
  year: number;

  @Input()
  month: number;

  displayedColumns = ['date', 'steps', 'distance'];
  locationColumns = ['id', 'name', 'address'];
  locations: MatTableDataSource<Location>;
  days: MatTableDataSource<Day>;

  constructor() {
    const waypointService = this.waypointService;
    const locationService = this.locationService;

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
