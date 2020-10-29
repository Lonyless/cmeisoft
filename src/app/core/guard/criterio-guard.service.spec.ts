import { TestBed } from '@angular/core/testing';

import { CriterioGuardService } from './criterio-guard.service';

describe('CriterioGuardService', () => {
  let service: CriterioGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriterioGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
