import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-month-locations',
  templateUrl: './month-locations.component.html',
  styleUrls: ['./month-locations.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow]
})
export class MonthLocationsComponent {
  readonly waypointService = inject(WaypointService);
  readonly locationService = inject(LocationService);
  readonly reportService = inject(ReportService);

  readonly year = input.required<number>();

  readonly month = input.required<number>();

  readonly locationColumns = ['id', 'name', 'address'];

  readonly locations$ = combineLatest([
    toObservable(this.year),
    toObservable(this.month),
    this.waypointService.changed.pipe(startWith(null)),
    this.locationService.locationsChanged.pipe(startWith(null)),
  ]).pipe(
    map(([year, month]) => this.reportService.update(year, month)),
    map(report => report.locations),
  );

}
