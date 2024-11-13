import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Location, LocationService } from '@app/services/location.service';
import { Day, ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, NgIf, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class MonthReportComponent implements OnChanges {
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

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.days = new MatTableDataSource<Day>(report.days);
    this.locations = new MatTableDataSource<Location>(report.locations);
  }

  ngOnChanges(): void {
    this.update();
  }
}
