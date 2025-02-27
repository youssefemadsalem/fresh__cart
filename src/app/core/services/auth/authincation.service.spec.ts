import { TestBed } from '@angular/core/testing';

import { AuthincationService } from './authincation.service';

describe('AuthincationService', () => {
  let service: AuthincationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthincationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
