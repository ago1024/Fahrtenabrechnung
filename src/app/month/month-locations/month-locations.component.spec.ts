import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { ReportService } from '@app/services/report.service';
import { WaypointService } from '@app/services/waypoint.service';

import { provideTestStorageService } from '@app/services/storage.service.spec';
import { MonthLocationsComponent } from './month-locations.component';

describe('MonthLocationsComponent', () => {
  let component: MonthLocationsComponent;
  let fixture: ComponentFixture<MonthLocationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
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
    fixture = TestBed.createComponent(MonthLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
