import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { WaypointService } from '@app/services/waypoint.service';

import { MonthLocationsComponent } from './month-locations.component';

describe('MonthLocationsComponent', () => {
  let component: MonthLocationsComponent;
  let fixture: ComponentFixture<MonthLocationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MonthLocationsComponent,
      ],
      providers: [
        WaypointService,
        LocationService,
        IdHelperService,
        provideTestStorageService(),
        ReportService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const locationService = TestBed.inject(LocationService);
    const location1 = locationService.createLocation('Waypoint 1', 'Address 1');
    const location2 = locationService.createLocation('Waypoint 2', 'Address 2');

    const waypointService = TestBed.inject(WaypointService);
    waypointService.addWaypoint('2020-01-01', location1);
    waypointService.addWaypoint('2020-01-01', location2);
    waypointService.addWaypoint('2020-01-02', location2);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthLocationsComponent);
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

    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-id'))).toHaveSize(2);
    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-id')).map<HTMLElement>(de => de.nativeElement).map(html => html.textContent)).toEqual(['1', '2']);
    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-name')).map<HTMLElement>(de => de.nativeElement).map(html => html.textContent)).toEqual(['Waypoint 1', 'Waypoint 2']);
    expect(fixture.debugElement.queryAll(By.css('mat-cell.mat-column-address')).map<HTMLElement>(de => de.nativeElement).map(html => html.textContent)).toEqual(['Address 1', 'Address 2']);
  });
});
