import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide an initial state', inject([StorageService], (service: StorageService) => {
    const expected = { 'locations': [], 'distances': [], 'waypoints': [] };
    expect(service.data).toEqual(expected);
  }));

});
