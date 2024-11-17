import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MonthEditComponent } from '@app/month/month-edit/month-edit.component';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { MapsService } from '@app/services/maps.service';
import { WaypointService } from '@app/services/waypoint.service';
import { DayEditComponent } from './day-edit.component';
import { provideTestStorageService } from '@app/services/storage.service.spec';


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
