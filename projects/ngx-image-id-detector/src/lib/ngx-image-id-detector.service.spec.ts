import { TestBed } from '@angular/core/testing';

import { NgxImageIdDetectorService } from './ngx-image-id-detector.service';

describe('NgxImageIdDetectorService', () => {
  let service: NgxImageIdDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxImageIdDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
