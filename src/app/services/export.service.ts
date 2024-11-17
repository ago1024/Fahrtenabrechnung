import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { saveAs as importSaveAs } from 'file-saver';
import { StorageService } from './storage.service';
import { WaypointEntries } from './waypoint.service';
import { formatDate } from '@angular/common';

@Injectable()
export class ExportService {
  private storageService = inject(StorageService);
  private localeId = inject(LOCALE_ID);


  private VERIFY_KEY = 'Fahrtenaberechnung_Version';
  private VERIFY_DATA = 'v20180930';

  public toBlob(): Blob {
    const data = {
      ...this.storageService.data,
      Fahrtenaberechnung_Version: this.VERIFY_DATA,
    };
    const blob = new Blob(['\ufeff', JSON.stringify(data)], { type: 'application/json' });
    return blob;
  }

  public exportData() {
    const blob = this.toBlob();
    const date = formatDate(new Date(), 'yyyy-MM-dd', this.localeId);
    const filename = `Fahrtenabrechnung-${date}.json`;
    importSaveAs(blob, filename);
  }

  public isValid(data: unknown): data is WaypointEntries {
    return typeof data === 'object' && data[this.VERIFY_KEY] === this.VERIFY_DATA;
  }
}
