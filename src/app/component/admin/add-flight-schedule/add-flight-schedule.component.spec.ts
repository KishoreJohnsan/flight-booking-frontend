import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightScheduleComponent } from './add-flight-schedule.component';

describe('AddFlightScheduleComponent', () => {
  let component: AddFlightScheduleComponent;
  let fixture: ComponentFixture<AddFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlightScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
