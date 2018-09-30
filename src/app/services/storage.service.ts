import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  private key = 'app.Fahrtenabrechnung';

  get data(): any {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set data(data: any) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  constructor() {}
}
