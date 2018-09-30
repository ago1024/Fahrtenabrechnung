import { TestBed, inject } from '@angular/core/testing';

import { IdHelperService } from './id-helper.service';

describe('IdHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdHelperService]
    });
  });

  it('should be created', inject([IdHelperService], (service: IdHelperService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should give the last id \'cz\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.lastId(Array.from(['a', 'z', 'cz', 'ac', 'b']), false)).toBe('cz');
  }));
  it('should give undefined', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.lastId(Array.from([]), false)).toBe(undefined);
  }));
  it('should give the next id \'da\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.nextId(Array.from(['a', 'z', 'cz', 'ac', 'b']), false)).toBe('da');
  }));
  it('should give \'a\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.nextId(Array.from([]), false)).toBe('a');
  }));
  
  it('should give the last id \'23\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.lastId(Array.from(['1', '8', '23', '11', '2']), true)).toBe('23');
  }));
  it('should give undefined', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.lastId(Array.from([]), true)).toBe(undefined);
  }));
  it('should give the next id \'24\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.nextId(Array.from(['1', '8', '23', '11', '2']), true)).toBe('24');
  }));
  it('should give \'1\'', inject([IdHelperService], (service: IdHelperService) => {
    expect(service.nextId(Array.from([]), true)).toBe('1');
  }));
  
  
});
