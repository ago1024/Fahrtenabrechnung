import {LocationService, Location} from '../../services/location.service';
import {WaypointService, Step} from '../../services/waypoint.service';
import {MapsService} from '../../services/maps.service';
import {MonthEditComponent} from '../../month/month-edit/month-edit.component';
import {Component, Input, Host, OnInit, OnChanges, SimpleChanges, OnDestroy, Inject} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  templateUrl: 'distance-edit.component.html',
  styleUrls: ['distance-edit.component.css']
})
export class DistanceEditComponent implements OnInit {

  url: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<DistanceEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    sanitizer: DomSanitizer) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent implements OnChanges, OnDestroy {
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

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor( @Host() private parent: MonthEditComponent, public locationService: LocationService, public waypointService: WaypointService,
    public mapsService: MapsService, public dialog: MatDialog) {

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
