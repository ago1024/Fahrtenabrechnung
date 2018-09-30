import {LocationService, Location} from '../../services/location.service';
import {MapsService} from '../../services/maps.service';
import {WaypointService} from '../../services/waypoint.service';
import {MonthEditComponent} from '../../month/month-edit/month-edit.component';
import {Component, Input, Host, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: 'create-location.dialog.html',
  styleUrls: ['create-location.dialog.css']
})
export class CreateLocationComponent implements OnInit {

  data: any = {};

  constructor(public dialogRef: MatDialogRef<CreateLocationComponent>) {
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-day-edit',
  templateUrl: './day-edit.component.html',
  styleUrls: ['./day-edit.component.css'],
  providers: []
})
export class DayEditComponent implements OnInit {

  @Input()
  year: number;

  @Input()
  month: number;

  @Input()
  day: number;

  locations: Location[];

  get id(): string {
    return this.parent.makeId(this.day);
  }

  constructor( @Host() private parent: MonthEditComponent, public locationService: LocationService, public waypointService: WaypointService,
    public mapsService: MapsService, public dialog: MatDialog) {
    this.locationService.locationsChanged.subscribe(v => this.updateLocations());
  }

  updateLocations() {
    this.locations = Array.from(this.locationService.locations);
  }

  ngOnInit(): void {
    this.updateLocations();
  }

  createLocation() {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(data => {
      const location = this.locationService.createLocation(data.name, data.address);
      this.waypointService.addWaypoint(this.id, location);
    });
  }

}
