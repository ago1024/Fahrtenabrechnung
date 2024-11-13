import { Component, Input, OnChanges, inject } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Location, LocationService } from '../../services/location.service';
import { ReportService } from '../../services/report.service';
import { WaypointService } from '../../services/waypoint.service';

@Component({
  selector: 'app-month-locations',
  templateUrl: './month-locations.component.html',
  styleUrls: ['./month-locations.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow]
})
export class MonthLocationsComponent implements OnChanges {
  waypointService = inject(WaypointService);
  locationService = inject(LocationService);
  reportService = inject(ReportService);


  @Input()
  year: number;

  @Input()
  month: number;

  locationColumns = ['id', 'name', 'address'];
  locations: MatTableDataSource<Location>;

  constructor() {
    const waypointService = this.waypointService;
    const locationService = this.locationService;

    locationService.locationsChanged.subscribe(event => this.update());
    waypointService.changed.subscribe(event => this.update());
  }

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.locations = new MatTableDataSource<Location>(report.locations);
  }

  ngOnChanges(): void {
    this.update();
  }

}
