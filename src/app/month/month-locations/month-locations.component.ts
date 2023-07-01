import {LocationService, Location} from '../../services/location.service';
import { ReportService } from '../../services/report.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {DatePipe} from '@angular/common';
import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-month-locations',
  templateUrl: './month-locations.component.html',
  styleUrls: ['./month-locations.component.css']
})
export class MonthLocationsComponent implements OnInit, OnChanges {

  @Input()
  year: number;

  @Input()
  month: number;

  locationColumns = ['id', 'name', 'address'];
  locations: MatTableDataSource<Location>;

  constructor(public waypointService: WaypointService, public locationService: LocationService, public reportService: ReportService) {
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
