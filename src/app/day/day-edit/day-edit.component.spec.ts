import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { WaypointService } from '@app/services/waypoint.service';
import { DayEditComponent } from './day-edit.component';


describe('DayEditComponent', () => {
  let component: DayEditComponent;
  let fixture: ComponentFixture<DayEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatListModule,
        MatFormFieldModule,
        MatSelectModule,
        DayEditComponent,
      ],
      providers: [
        LocationService,
        IdHelperService,
        WaypointService,
        provideTestStorageService(),
        MapsService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const locationService = TestBed.inject(LocationService);
    const location1 = locationService.createLocation('Waypoint 1', 'Address 1');
    const location2 = locationService.createLocation('Waypoint 2', 'Address 2');
    locationService.setDistance(location1, location2, 123);

    const waypointService = TestBed.inject(WaypointService);
    waypointService.addWaypoint('2020-01-01', location1);
    waypointService.addWaypoint('2020-01-01', location2);
    waypointService.addWaypoint('2020-01-02', location2);
    waypointService.addWaypoint('2020-01-02', location1);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEditComponent);
    fixture.componentRef.setInput('year', 2020);
    fixture.componentRef.setInput('month', 0);
    fixture.componentRef.setInput('day', 1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
