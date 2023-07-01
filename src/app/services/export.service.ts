import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { saveAs as importSaveAs } from 'file-saver';
import { StorageService } from './storage.service';
import { formatDate } from '@angular/common';

@Injectable()
export class ExportService {

  private VERIFY_KEY = 'Fahrtenaberechnung_Version';
  private VERIFY_DATA = 'v20180930';

  constructor(private storageService: StorageService, @Inject(LOCALE_ID) private localeId: string) { }

  public exportData() {
    const data = this.storageService.data;
    data[this.VERIFY_KEY] = this.VERIFY_DATA;
    const blob = new Blob(['\ufeff', JSON.stringify(data)], { type: 'applicationb/json' });
    const date = formatDate(new Date(), 'yyyy-MM-dd', this.localeId);
    const filename = `Fahrtenabrechnung-${date}.json`;
    importSaveAs(blob, filename);
  }

  public isValid(data: any): boolean {
    return data[this.VERIFY_KEY] === this.VERIFY_DATA;
  }
}
