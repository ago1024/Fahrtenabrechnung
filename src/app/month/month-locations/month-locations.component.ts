import {LocationService, Location} from '../../services/location.service';
import { ReportService } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {DatePipe} from '@angular/common';
import { Component, OnInit, OnChanges, Input, inject } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
  selector: 'app-month-locations',
  templateUrl: './month-locations.component.html',
  styleUrls: ['./month-locations.component.css'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRow, MatRowDef, MatRow]
})
export class MonthLocationsComponent implements OnInit, OnChanges {
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

  ngOnInit() {
  }

  update(): void {
    const report = this.reportService.update(this.year, this.month);
    this.locations = new MatTableDataSource<Location>(report.locations);
  }

  ngOnChanges(): void {
    this.update();
  }

}
