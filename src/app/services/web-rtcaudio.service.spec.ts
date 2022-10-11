import { TestBed } from '@angular/core/testing';

import { WebRTCAudioService } from './web-rtcaudio.service';

describe('WebRTCAudioService', () => {
  let service: WebRTCAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRTCAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
