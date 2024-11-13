import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
import { Location, LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { Step, WaypointService } from '@app/services/waypoint.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: 'distance-edit.component.html',
  styleUrls: ['distance-edit.component.css'],
  standalone: true,
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, FormsModule, MatInput, MatSuffix, MatButton, MatDialogClose, MatDialogActions]
})
export class DistanceEditComponent {
  dialogRef = inject<MatDialogRef<DistanceEditComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);


  url: SafeResourceUrl;

  constructor() {
    const data = this.data;
    const sanitizer = inject(DomSanitizer);

    this.url = sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  get isValid() {
    return this.data.distance || this.data.distance === 0;
  }
}

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatMiniFabButton,
  ],
})
export class DayViewComponent implements OnChanges, OnDestroy {
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

  get id(): string {
    return this.parent.makeId(this.day);
  }

  waypoints: Location[];
  steps: Step[];
  totalDistance: number;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor() {

    this.waypointService.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(date => this.onWaypointsChanged(date));
  }

  private onWaypointsChanged(date: string) {
    if (date === this.id) {
      this.update(this.id);
    }
  }

  update(id: string) {
    this.waypoints = this.waypointService.getWaypoints(id);
    this.steps = this.waypointService.getSteps(id);
    this.totalDistance = this.waypointService.getTotalDistance(this.steps);
  }

  openMaps(step: Step) {
    const dialogRef = this.dialog.open(DistanceEditComponent, {
      width: '1024px',
      data: {
        from: step.from,
        to: step.to,
        distance: step.distance,
        url: this.mapsService.getUrl(step.from, step.to)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.locationService.setDistance(step.from, step.to, result);
    });
  }

  ngOnChanges(): void {
    this.update(this.id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
