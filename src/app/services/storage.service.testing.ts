
import { Provider } from '@angular/core';
import { StorageService } from './storage.service';

export function provideTestStorageService(): Provider {
  return { provide: StorageService, useFactory: () => ({ data: { 'locations': [], 'distances': [], 'waypoints': [] } }) };
}
