import { formatDate } from '@angular/common';
import { Injectable, InjectionToken, LOCALE_ID, inject } from '@angular/core';
import { saveAs } from 'file-saver';

import { StorageService } from './storage.service';
import { WaypointEntries } from './waypoint.service';

export const SAVE_AS = new InjectionToken<(blob: Blob, filename: string) => void>('SaveAs', { factory: () => (blob, filename) => saveAs(blob, filename) });

const VERIFY_KEY = 'Fahrtenaberechnung_Version';
const VERIFY_DATA = 'v20180930';


@Injectable()
export class ExportService {
  private storageService = inject(StorageService);
  private saveAs = inject(SAVE_AS);
  private localeId = inject(LOCALE_ID);


  public toBlob(): Blob {
    const data = {
      ...this.storageService.data,
      Fahrtenaberechnung_Version: VERIFY_DATA,
    };
    const blob = new Blob(['\ufeff', JSON.stringify(data)], { type: 'application/json' });
    return blob;
  }

  public exportData() {
    const blob = this.toBlob();
    const date = formatDate(new Date(), 'yyyy-MM-dd', this.localeId);
    const filename = `Fahrtenabrechnung-${date}.json`;
    this.saveAs(blob, filename);
  }

  public isValid(data: unknown): data is WaypointEntries {
    return data != null && typeof data === 'object' && VERIFY_KEY in data && data[VERIFY_KEY] === VERIFY_DATA;
  }
}
