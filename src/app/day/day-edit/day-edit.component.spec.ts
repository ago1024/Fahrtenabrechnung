import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { StorageService } from '@app/services/storage.service';
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
      ],
      declarations: [ DayEditComponent ],
      providers: [
        LocationService,
        IdHelperService,
        WaypointService,
        StorageService,
        MapsService,
      ]
    })
    .overrideComponent(DayEditComponent, {
      add: {
        providers: [
          MonthEditComponent,
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
