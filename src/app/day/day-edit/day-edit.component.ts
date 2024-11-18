import { AsyncPipe, NgFor } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { makeId } from '@app/day/day-date/day-date.component';
import { Location, LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { WaypointService } from '@app/services/waypoint.service';
import { combineLatest, firstValueFrom, map, startWith } from 'rxjs';
import { CreateLocationDialogComponent, CreateLocationDialogResult } from './create-location.dialog';
import { EditLocationDialogComponent, EditLocationDialogData, EditLocationDialogResult } from './edit-location.dialog';

@Component({
  selector: 'app-day-edit',
  templateUrl: './day-edit.component.html',
  styleUrls: ['./day-edit.component.css'],
  providers: [],
  standalone: true,
  imports: [AsyncPipe, MatList, NgFor, MatListItem, MatMiniFabButton, MatIcon, MatIconButton, MatFormField, MatSelect, MatOption]
})
export class DayEditComponent {
  readonly locationService = inject(LocationService);
  readonly waypointService = inject(WaypointService);
  readonly mapsService = inject(MapsService);
  readonly dialog = inject(MatDialog);


  readonly year = input.required<number>();
  readonly month = input.required<number>();
  readonly day = input.required<number>();
  readonly makeId = computed(() => makeId(this.year(), this.month(), this.day()));

  locations$ = this.locationService.locationsChanged.pipe(startWith(null)).pipe(
    map(() => Array.from(this.locationService.locations))
  );

  waypoints$ = combineLatest([
    toObservable(this.makeId),
    this.locationService.locationsChanged.pipe(startWith(null)),
    this.waypointService.changed.pipe(startWith(null)),
  ]).pipe(
    map(([id]) => this.waypointService.getWaypoints(id)),
  );

  async createLocation() {
    const dialogRef = this.dialog.open<CreateLocationDialogComponent, never, CreateLocationDialogResult>(CreateLocationDialogComponent, {
      width: '400px'
    });
    const data = await firstValueFrom(dialogRef.afterClosed());
    if (!data) {
      return;
    }
    const location = this.locationService.createLocation(data.name, data.address);
    this.waypointService.addWaypoint(this.makeId(), location);
  }

  async editLocation({id, name, address}: Location) {
    const dialogRef = this.dialog.open<EditLocationDialogComponent, Partial<EditLocationDialogData>, EditLocationDialogResult>(EditLocationDialogComponent, {
      width: '400px',
      data: { name, address },
    });
    const data = await firstValueFrom(dialogRef.afterClosed());
    if (!data) {
      return;
    }
    const location = this.locationService.editLocation(id, data.name, data.address);
    if (location && data.resetDistances) {
      this.locationService.resetDistances(location);
    }
  }

}
