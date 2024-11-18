import { TestBed, waitForAsync } from '@angular/core/testing';
import { ExportService } from '@app/services/export.service';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { WaypointService } from '@app/services/waypoint.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
      ],
      providers: [
        WaypointService,
        LocationService,
        IdHelperService,
        ExportService,
        provideTestStorageService(),
      ],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
