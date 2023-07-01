import { TestBed, inject } from '@angular/core/testing';
import { StorageService } from '@app/services/storage.service';

import { ExportService } from './export.service';

describe('ExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExportService,
        StorageService,
      ]
    });
  });

  it('should be created', inject([ExportService], (service: ExportService) => {
    expect(service).toBeTruthy();
  }));
});
