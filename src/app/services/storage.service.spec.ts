import { TestBed } from '@angular/core/testing';

import { ILocalStorageService, LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';

export { provideTestStorageService } from './storage.service.testing';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provider: LocalStorageService, useValue: { data: null } satisfies ILocalStorageService },
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(StorageService);
    expect(service).toBeTruthy();
  });

  it('should provide an initial state', () => {
    const service = TestBed.inject(StorageService);
    const expected = { 'locations': [], 'distances': [], 'waypoints': [] };
    expect(service.data).toEqual(expected);
  });

  it('should store the new data', () => {
    const service = TestBed.inject(StorageService);
    const localStorageService = TestBed.inject(LocalStorageService);
    service.data = { 'locations': [], 'distances': [], 'waypoints': [] };
    expect(localStorageService.data).toEqual('{"locations":[],"distances":[],"waypoints":[]}');
  });

});
