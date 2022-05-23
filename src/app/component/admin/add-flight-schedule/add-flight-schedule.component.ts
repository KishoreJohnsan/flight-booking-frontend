import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Airline } from 'src/app/interfaces/adminInterface';
import { Token } from 'src/app/interfaces/commonInterface';
import { AirlineService } from 'src/app/service/admin/airline.service';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';
import * as dayjs from 'dayjs'
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-flight-schedule',
  templateUrl: './add-flight-schedule.component.html',
  styleUrls: ['./add-flight-schedule.component.scss'],
  providers: [MessageService]
})
export class AddFlightScheduleComponent implements OnInit {

  scheduleForm: FormGroup;
  airlines: Airline[] = [];

  constructor(private builder: FormBuilder, private scheduleService: FlightscheduleService, private airlineService: AirlineService, private router: Router, private messageService: MessageService) {
    this.scheduleForm = this.builder.group({
      flightNumber: ['', Validators.required],
      airline: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      flightType: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      fare: ['', Validators.required],
    });
  }

  changeAirline(e: any) {
    this.scheduleForm.value.a?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void {

    let dataString = localStorage.getItem("data") || "";
    if (!dataString) {
      this.router.navigate(['/']);
    } else {
      let data: Token = JSON.parse(dataString);
      if (dayjs().isAfter(dayjs(data.expiry)))
        this.router.navigate(['/']);

      if (!data.role.includes('ADMIN'))
        this.router.navigate(['/']);
    }

    this.airlineService.getAllAirlines().subscribe((airlines) => {
      this.airlines = airlines.filter(airline => airline.isActive === 'true')
    });
  }

  onSubmit() {
    //console.log(this.scheduleForm.value)
    let date = dayjs(this.scheduleForm.get('date')?.value).format("YYYY-MM-DD")
    let time = dayjs(this.scheduleForm.get('time')?.value).format("HH:mm")
    let source = this.scheduleForm.get('source')?.value
    let destination = this.scheduleForm.get('destination')?.value
    this.scheduleForm.patchValue({ source: source.toUpperCase() });
    this.scheduleForm.patchValue({ destination: destination.toUpperCase() });
    this.scheduleForm.patchValue({ date: date });
    this.scheduleForm.patchValue({ time: time });
    this.scheduleService.addSchedule(this.scheduleForm.value)
      .subscribe({
        next: data => {
          //console.log(data)
          this.router.navigate(['/admin/schedule'])
        },
        error: error => {
          this.showToast('error', error.error.error, 'Please check and try again')
        }
      })
  }

  showToast(type: string, msg: string, detail: string) {
    this.messageService.add({ severity: type, summary: msg, detail: detail });
  }

}
