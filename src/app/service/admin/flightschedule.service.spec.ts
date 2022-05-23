import { TestBed } from '@angular/core/testing';

import { FlightscheduleService } from './flightschedule.service';

describe('FlightscheduleService', () => {
  let service: FlightscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
