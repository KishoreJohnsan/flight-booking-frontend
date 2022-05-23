import { Component, OnInit } from '@angular/core';
import { Airline, FlightSchedule } from 'src/app/interfaces/adminInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from 'src/app/service/admin/airline.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {

  scheduleId: string = ''
  schedule!: FlightSchedule;
  scheduleEditForm: FormGroup;
  airlines: Airline[] = [];

  constructor(private scheduleService: FlightscheduleService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private builder: FormBuilder, private airlineService : AirlineService) {
    this.scheduleId = this.config.data.id

    this.scheduleEditForm = this.builder.group({
      scheduleId: ['', Validators.required],
      airline: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      flightNumber: ['', Validators.required],
      flightType: ['',Validators.required],
      fare: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.scheduleService.getScheduleById(this.scheduleId).subscribe((schedule) => {
      //this.schedule = schedule
      this.scheduleEditForm.patchValue({
        scheduleId: schedule.scheduleId,
        airline: schedule.airline,
        source: schedule.source,
        destination: schedule.destination,
        date: schedule.date,
        time: schedule.time,
        flightNumber: schedule.flightNumber,
        flightType: schedule.flightType,
        fare: schedule.fare
      })
    })

    this.airlineService.getAllAirlines().subscribe((airlines) => {      
      this.airlines = airlines.filter(airline => airline.isActive === 'true')
    });

  }

  changeAirline(e: any) {
    this.scheduleEditForm.value.a?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSaveEdit() {
    //console.log(this.scheduleEditForm.value)
    this.ref.close(this.scheduleEditForm.value)
  }

}
