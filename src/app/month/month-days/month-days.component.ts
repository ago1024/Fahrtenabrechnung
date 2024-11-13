import {LocationService, Location} from '../../services/location.service';
import { ReportService, Day } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, OnChanges, inject } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
  selector: 'app-month-days',
  templateUrl: './month-days.component.html',
  styleUrls: ['./month-days.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, NgIf, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class MonthDaysComponent implements OnInit, OnChanges {
  waypointService = inject(WaypointService);
  locationService = inject(LocationService);
  reportService = inject(ReportService);


  @Input()
  year: number;

  @Input()
  month: number;

  displayedColumns = ['date', 'steps', 'distance'];
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
  }

  ngOnChanges(): void {
    this.update();
  }

}
