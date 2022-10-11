import { TestBed } from '@angular/core/testing';

import { WebRTCStreamService } from './web-rtcstream.service';

describe('WebRTCStreamService', () => {
  let service: WebRTCStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRTCStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
