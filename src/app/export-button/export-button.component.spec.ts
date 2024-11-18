import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExportService } from '@app/services/export.service';

import { MatIconModule } from '@angular/material/icon';
import { provideTestStorageService } from '@app/services/storage.service.testing';
import { ExportButtonComponent } from './export-button.component';

describe('ExportButtonComponent', () => {
  let component: ExportButtonComponent;
  let fixture: ComponentFixture<ExportButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, ExportButtonComponent],
      providers: [
        ExportService,
        provideTestStorageService(),
      ]
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
