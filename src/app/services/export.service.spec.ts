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

  it('should export an empty storage', inject([ExportService], async (service: ExportService) => {
    const expected = {'locations':[],'distances':[],'waypoints':[],'Fahrtenaberechnung_Version':'v20180930'};
    const blob = service.toBlob();
    expect(blob).toBeTruthy();
    expect(await blob.text()).toEqual(JSON.stringify(expected));
  }));

});
