import { TestBed } from '@angular/core/testing';

import { GoRestService } from './go-rest.service';

describe('GoRestService', () => {
  let service: GoRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
