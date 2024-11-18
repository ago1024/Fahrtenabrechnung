import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { makeId } from '@app/day/day-date/day-date.component';
import { DistanceEditComponent, DistanceEditData, DistanceEditResult } from '@app/day/day-view/distance-edit.component';
import { LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { Step, WaypointService } from '@app/services/waypoint.service';
import { combineLatest, firstValueFrom } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    MatMiniFabButton,
  ],
})
export class DayViewComponent {
  readonly locationService = inject(LocationService);
  readonly waypointService = inject(WaypointService);
  readonly mapsService = inject(MapsService);
  readonly dialog = inject(MatDialog);

  readonly year = input.required<number>();

  readonly month = input.required<number>();

  readonly day = input.required<number>();

  readonly makeId = computed(() => makeId(this.year(), this.month(), this.day()));

  get id(): string {
    return this.makeId();
  }

  waypoints$ = combineLatest([
    toObservable(this.makeId),
    this.waypointService.changed.pipe(startWith(null))
  ]).pipe(
    filter(([id, date]) => date === null || date === id),
    map(([id]) => this.waypointService.getWaypoints(id)),
  );

  steps$ = combineLatest([
    toObservable(this.makeId),
    this.waypointService.changed.pipe(startWith(null))
  ]).pipe(
    filter(([id, date]) => date == null || date === id),
    map(([id]) => this.waypointService.getSteps(id)),
  );

  totalDistance$ = this.steps$.pipe(
    map(steps => this.waypointService.getTotalDistance(steps)),
  );

  async openMaps(step: Step) {
    const dialogRef = this.dialog.open<DistanceEditComponent, DistanceEditData, DistanceEditResult>(DistanceEditComponent, {
      width: '1024px',
      data: {
        from: step.from,
        to: step.to,
        distance: step.distance,
        url: this.mapsService.getUrl(step.from, step.to)
      }
    });
    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result !== undefined) {
      this.locationService.setDistance(step.from, step.to, result);
    }
  }

}
