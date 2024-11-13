import {LocationService, Location} from '../../services/location.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {MapsService} from '../../services/maps.service';
import {MonthEditComponent} from '../../month/month-edit/month-edit.component';
import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy, inject } from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions } from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { NgFor, NgIf } from '@angular/common';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  templateUrl: 'distance-edit.component.html',
  styleUrls: ['distance-edit.component.css'],
  standalone: true,
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, FormsModule, MatInput, MatSuffix, MatButton, MatDialogClose, MatDialogActions]
})
export class DistanceEditComponent implements OnInit {
  dialogRef = inject<MatDialogRef<DistanceEditComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);


  url: SafeResourceUrl;

  constructor() {
    const data = this.data;
    const sanitizer = inject(DomSanitizer);

    this.url = sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges): void {
    this.update(this.id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
