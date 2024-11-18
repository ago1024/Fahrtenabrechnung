import { TestBed } from '@angular/core/testing';

import { provideTestStorageService } from '@app/services/storage.service.testing';
import { ExportService, SAVE_AS } from './export.service';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

describe('ExportService', () => {

  let service: ExportService;
  let saveAs: jasmine.Spy<(blob: Blob, filename: string) => void>;

  beforeEach(() => {
    saveAs = jasmine.createSpy();

    TestBed.configureTestingModule({
      providers: [
        ExportService,
        provideTestStorageService(),
        { provide: SAVE_AS, useValue: saveAs },
        { provide: LOCALE_ID, useValue: 'de' },
      ]
    });
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export an empty storage', async () => {
    const expected = {'locations':[],'distances':[],'waypoints':[],'Fahrtenaberechnung_Version':'v20180930'};
    const blob = service.toBlob();
    expect(blob).toBeTruthy();
    expect(await blob.text()).toEqual(JSON.stringify(expected));
  });

  it('should export data', () => {
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'de');
    const filename = `Fahrtenabrechnung-${date}.json`;

    service.exportData();
    expect(saveAs).toHaveBeenCalledWith(new Blob([], { type: 'application/json' }), filename);
  });

  describe('isValid', () => {
    it('should reject undefined', () => {
      expect(service.isValid(undefined)).toBeFalse();
    });

    it('should reject null', () => {
      expect(service.isValid(null)).toBeFalse();
    });

    it('should reject invalid data', () => {
      expect(service.isValid({})).toBeFalse();
    });

    it('should accept valid data', () => {
      expect(service.isValid({'locations':[],'distances':[],'waypoints':[],'Fahrtenaberechnung_Version':'v20180930'})).toBeTrue();
    });

  });


});
