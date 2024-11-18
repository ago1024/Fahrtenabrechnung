import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { IdHelperService } from '@app/services/id-helper.service';
import { Location, LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';

import { By } from '@angular/platform-browser';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { MonthReportComponent } from './month-report.component';

describe('MonthReportComponent', () => {
  let component: MonthReportComponent;
  let fixture: ComponentFixture<MonthReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MonthReportComponent,
      ],
      providers: [
        WaypointService,
        LocationService,
        IdHelperService,
        provideTestStorageService(),
        ReportService,
      ],
    })
      .compileComponents();
  }));

  let location1: Location;
  let location2: Location;

  beforeEach(() => {
    const locationService = TestBed.inject(LocationService);
    location1 = locationService.createLocation('Waypoint 1', 'Address 1');
    location2 = locationService.createLocation('Waypoint 2', 'Address 2');
    locationService.setDistance(location1, location2, 123);

    const waypointService = TestBed.inject(WaypointService);
    waypointService.addWaypoint('2020-01-01', location1);
    waypointService.addWaypoint('2020-01-01', location2);
    waypointService.addWaypoint('2020-01-02', location2);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthReportComponent);
    fixture.componentRef.setInput('year', 2020);
    fixture.componentRef.setInput('month', 0);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the locations', async () => {
    await fixture.whenRenderingDone();

    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-date'))).toHaveSize(31);
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-date')).nativeElement.textContent).toEqual('1. Januar 2020');
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-steps')).nativeElement.textContent).toEqual('1 - 2');
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-distance')).nativeElement.textContent).toEqual('123 km');
  });

  it('should handle undefined distances', async () => {
    const locationService = TestBed.inject(LocationService);
    locationService.resetDistances(location1);

    await fixture.whenRenderingDone();

    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-date'))).toHaveSize(31);
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-date')).nativeElement.textContent).toEqual('1. Januar 2020');
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-steps')).nativeElement.textContent).toEqual('1 - 2');
    expect(fixture.debugElement.query(By.css('mat-cell.mat-column-distance')).nativeElement.textContent).toEqual('unbekannt');
  });

});
