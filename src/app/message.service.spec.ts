import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.get(MessageService);
  });

  it('should add message', () => {
    service.add('Test Message');
    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toBe('Test Message');
  });

  it('should clear messages', () => {
    service.add('Test Message');
    expect(service.messages.length).toBe(1);
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
