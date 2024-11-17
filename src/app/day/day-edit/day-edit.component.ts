import { NgFor } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
import { Location, LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { WaypointService } from '@app/services/waypoint.service';
import { CreateLocationDialogComponent, CreateLocationDialogResult } from './create-location.dialog';
import { EditLocationDialogComponent, EditLocationDialogData, EditLocationDialogResult } from './edit-location.dialog';

@Component({
  selector: 'app-day-edit',
  templateUrl: './day-edit.component.html',
  styleUrls: ['./day-edit.component.css'],
  providers: [],
  standalone: true,
  imports: [MatList, NgFor, MatListItem, MatMiniFabButton, MatIcon, MatIconButton, MatFormField, MatSelect, MatOption]
})
export class DayEditComponent implements OnInit {
  private parent = inject(MonthEditComponent, { host: true });
  locationService = inject(LocationService);
  waypointService = inject(WaypointService);
  mapsService = inject(MapsService);
  dialog = inject(MatDialog);


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

  constructor() {
    this.locationService.locationsChanged.subscribe(() => this.updateLocations());
  }

  updateLocations() {
    this.locations = Array.from(this.locationService.locations);
  }

  ngOnInit(): void {
    this.updateLocations();
  }

  createLocation() {
    const dialogRef = this.dialog.open<CreateLocationDialogComponent, never, CreateLocationDialogResult>(CreateLocationDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(data => {
      const location = this.locationService.createLocation(data.name, data.address);
      this.waypointService.addWaypoint(this.id, location);
    });
  }

  editLocation({id, name, address}: Location) {
    const dialogRef = this.dialog.open<EditLocationDialogComponent, Partial<EditLocationDialogData>, EditLocationDialogResult>(EditLocationDialogComponent, {
      width: '400px',
      data: { name, address },
    });
    dialogRef.afterClosed().subscribe(data => {
      const location = this.locationService.editLocation(id, data.name, data.address);
      if (data.resetDistances) {
        this.locationService.resetDistances(location);
      }
    });
  }

}
