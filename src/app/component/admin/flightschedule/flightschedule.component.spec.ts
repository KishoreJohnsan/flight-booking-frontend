import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightscheduleComponent } from './flightschedule.component';

describe('FlightscheduleComponent', () => {
  let component: FlightscheduleComponent;
  let fixture: ComponentFixture<FlightscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
