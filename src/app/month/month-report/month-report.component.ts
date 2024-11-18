import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, NgIf, MatHeaderRow, MatRowDef, MatRow, DatePipe]
})
export class MonthReportComponent {
  readonly waypointService = inject(WaypointService);
  readonly locationService = inject(LocationService);
  readonly reportService = inject(ReportService);

  readonly year = input.required<number>();
  readonly month = input.required<number>();

  readonly displayedColumns = ['date', 'steps', 'distance'];

  readonly days$ = combineLatest([
    toObservable(this.year),
    toObservable(this.month),
    this.locationService.locationsChanged.pipe(startWith(null)),
    this.waypointService.changed.pipe(startWith(null)),
  ]).pipe(
    map(([year, month]) => this.reportService.update(year, month)),
    map(report => report.days),
  );
}
