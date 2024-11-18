import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';

import { MonthEditComponent } from './month-edit.component';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { LocationService } from '@app/services/location.service';
import { IdHelperService } from '@app/services/id-helper.service';
import { WaypointService } from '@app/services/waypoint.service';
import { MapsService } from '@app/services/maps.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MonthEditComponent', () => {
  let component: MonthEditComponent;
  let fixture: ComponentFixture<MonthEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        MonthEditComponent,
        NoopAnimationsModule,
      ],
      providers: [
        provideTestStorageService(),
        LocationService,
        IdHelperService,
        WaypointService,
        MapsService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthEditComponent);
    fixture.componentRef.setInput('year', 2020);
    fixture.componentRef.setInput('month', 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
