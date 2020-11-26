import { TestBed } from '@angular/core/testing';

import { PrimaryEventBusService } from './primary-event-bus.service';

describe('EventBusService', () => {
  let service: PrimaryEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
