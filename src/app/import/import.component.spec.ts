import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { ExportService } from '@app/services/export.service';
import { IdHelperService } from '@app/services/id-helper.service';
import { LocationService } from '@app/services/location.service';
import { StorageService } from '@app/services/storage.service';
import { WaypointService } from '@app/services/waypoint.service';

import { ImportComponent } from './import.component';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
      ],
      declarations: [ ImportComponent ],
      providers: [
        StorageService,
        WaypointService,
        LocationService,
        IdHelperService,
        ExportService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
