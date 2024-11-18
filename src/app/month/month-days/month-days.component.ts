import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { LocationService } from '@app/services/location.service';
import { Day, ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';

@Component({
  selector: 'app-month-days',
  templateUrl: './month-days.component.html',
  styleUrls: ['./month-days.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, NgIf, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class MonthDaysComponent implements OnChanges {
  waypointService = inject(WaypointService);
  locationService = inject(LocationService);
  reportService = inject(ReportService);


  @Input({ required: true })
  year!: number;

  @Input({ required: true })
  month!: number;

  displayedColumns = ['date', 'steps', 'distance'];
  days!: MatTableDataSource<Day>;

  constructor() {
    const waypointService = this.waypointService;
    const locationService = this.locationService;

    locationService.locationsChanged.subscribe(() => this.update());
    waypointService.changed.subscribe(() => this.update());
  }

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.days = new MatTableDataSource<Day>(report.days);
  }

  ngOnChanges(): void {
    this.update();
  }

}
