import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { StorageService } from '@app/services/storage.service';
import { WaypointService } from '@app/services/waypoint.service';

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
        StorageService,
        ReportService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
