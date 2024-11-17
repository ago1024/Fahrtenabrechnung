import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { WaypointService } from '@app/services/waypoint.service';

import { provideTestStorageService } from '@app/services/storage.service.spec';
import { DayViewComponent } from './day-view.component';

describe('DayViewComponent', () => {
  let component: DayViewComponent;
  let fixture: ComponentFixture<DayViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        DayViewComponent,
      ],
      providers: [
        LocationService,
        IdHelperService,
        WaypointService,
        provideTestStorageService(),
        MapsService,
      ]
    })
      .overrideComponent(DayViewComponent, {
        add: {
          providers: [
            MonthEditComponent,
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
