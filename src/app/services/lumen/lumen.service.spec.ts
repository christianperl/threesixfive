import { TestBed } from '@angular/core/testing';

import { LumenService } from './lumen.service';

describe('LumenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LumenService = TestBed.get(LumenService);
    expect(service).toBeTruthy();
  });
});
