import { TestBed } from '@angular/core/testing';

import { LoadingServiceTsService } from './loading.service.ts.service';

describe('LoadingServiceTsService', () => {
  let service: LoadingServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
