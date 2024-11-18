import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';

import { By } from '@angular/platform-browser';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { MonthDaysComponent } from './month-days.component';

describe('MonthDaysComponent', () => {
  let component: MonthDaysComponent;
  let fixture: ComponentFixture<MonthDaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MonthDaysComponent,
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
    fixture = TestBed.createComponent(MonthDaysComponent);
    fixture.componentRef.setInput('year', 2020);
    fixture.componentRef.setInput('month', 0);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the locations', async () => {
    await fixture.whenRenderingDone();

    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-date'))).toHaveSize(31);
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(1) mat-cell.mat-column-date')).nativeElement.textContent).toEqual('1. Januar 2020');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(1) mat-cell.mat-column-steps')).nativeElement.textContent).toEqual('1 - 2');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(1) mat-cell.mat-column-distance')).nativeElement.textContent).toEqual('123 km');

    expect(fixture.debugElement.query(By.css('mat-row:nth-child(2) mat-cell.mat-column-date')).nativeElement.textContent).toEqual('2. Januar 2020');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(2) mat-cell.mat-column-steps')).nativeElement.textContent).toEqual('2 - 1');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(2) mat-cell.mat-column-distance')).nativeElement.textContent).toEqual('unbekannt');

    expect(fixture.debugElement.query(By.css('mat-row:nth-child(3) mat-cell.mat-column-date')).nativeElement.textContent).toEqual('3. Januar 2020');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(3) mat-cell.mat-column-steps')).nativeElement.textContent).toEqual('');
    expect(fixture.debugElement.query(By.css('mat-row:nth-child(3) mat-cell.mat-column-distance')).nativeElement.textContent).toEqual('0 km');
  });

});
