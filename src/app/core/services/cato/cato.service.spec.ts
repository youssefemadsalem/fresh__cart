import { TestBed } from '@angular/core/testing';

import { CatoService } from './cato.service';

describe('CatoService', () => {
  let service: CatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
