import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WaypointService } from '@app/services/waypoint.service';
import { LocationService } from '@app/services/location.service';
import { StorageService } from '@app/services/storage.service';
import { IdHelperService } from '@app/services/id-helper.service';
import { ExportService } from '@app/services/export.service';
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
        { provide: StorageService, useValue: { data: { 'locations': [], 'distances': [], 'waypoints': [] } } },
      ],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
