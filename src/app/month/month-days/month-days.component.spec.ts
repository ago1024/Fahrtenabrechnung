import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { StorageService } from '@app/services/storage.service';
import { WaypointService } from '@app/services/waypoint.service';

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
        StorageService,
        ReportService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
