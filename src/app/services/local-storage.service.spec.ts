import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE_KEY, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const key = 'test.Fahrtenabrechnung';

  beforeEach(() => {
    localStorage.removeItem(key);

    TestBed.configureTestingModule({
      providers: [
        { provide: LOCAL_STORAGE_KEY, useValue: key },
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the data', () => {
    service.data = '{ "locations": [] }';
    expect(localStorage.getItem(key)).toEqual('{ "locations": [] }');
  });

  it('should read the data', () => {
    localStorage.setItem(key, '{ "locations": [] }');
    expect(service.data).toEqual('{ "locations": [] }');
  });

  it('should have empty data', () => {
    expect(service.data).toBeNull();
  });

});
