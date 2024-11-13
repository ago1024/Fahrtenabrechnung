import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageService } from '@app/services/storage.service';
import { ExportService } from '@app/services/export.service';

import { ExportButtonComponent } from './export-button.component';
import { MatIconModule } from '@angular/material/icon';

describe('ExportButtonComponent', () => {
  let component: ExportButtonComponent;
  let fixture: ComponentFixture<ExportButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, ExportButtonComponent],
      providers: [ExportService, StorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
