import { TestBed } from '@angular/core/testing';

import { ChatModelService } from './chat-model.service';

describe('ChatModelService', () => {
  let service: ChatModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
