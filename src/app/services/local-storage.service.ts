import { Injectable, InjectionToken, inject } from '@angular/core';

export const LOCAL_STORAGE_KEY = new InjectionToken<string>('LocalStorageKey', { factory: () => 'app.Fahrtenabrechnung' });

export type ILocalStorageService = { data: string }

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements ILocalStorageService {

  #key = inject(LOCAL_STORAGE_KEY);

  get data(): string {
    return localStorage.getItem(this.#key);
  }

  set data(data: string) {
    localStorage.setItem(this.#key, data);
  }

}
