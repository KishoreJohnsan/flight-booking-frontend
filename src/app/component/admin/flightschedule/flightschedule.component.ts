import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { Token } from 'src/app/interfaces/commonInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';
import * as dayjs from 'dayjs'
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleViewComponent } from '../schedule-view/schedule-view.component';
import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-flightschedule',
  templateUrl: './flightschedule.component.html',
  styleUrls: ['./flightschedule.component.scss'],
  providers: [DialogService, MessageService]
})
export class FlightscheduleComponent implements OnInit {

  schedules: FlightSchedule[] = [];
  ref!: DynamicDialogRef;

  constructor(private router: Router, private scheduleService: FlightscheduleService, public dialogService: DialogService, private messageService: MessageService) {
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

    this.getScheduleData()

  }

  getScheduleData() {
    /* this.scheduleService.getAllSchedules().subscribe((schedules) => {      
      this.schedules = schedules
    }); */
    this.scheduleService.getAllSchedules().subscribe({
      next: data => {
        this.schedules = data
      },
      error: error => {
        this.showToast('error', error.error.error, 'No Flight Schedule data available')
      }
    })
  }

  show(scheduleId: string) {

    this.ref = this.dialogService.open(ScheduleViewComponent, {
      data: {
        id: scheduleId
      },
      header: 'View Schedule',
      width: '40%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  showEdit(scheduleId: string) {

    this.ref = this.dialogService.open(ScheduleEditComponent, {
      data: {
        id: scheduleId
      },
      header: 'Edit Schedule',
      width: '45%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((schedule: FlightSchedule) => {
      if (schedule) {

        schedule.date = dayjs(schedule.date).format("YYYY-MM-DD")
        schedule.time = dayjs(schedule.time).format("HH:mm")
        //console.log(schedule.time)        
        this.scheduleService.saveEditedSchedule(schedule);
        this.getScheduleData()
      }

    });
  }

  handleClick() { this.router.navigate(['/admin/schedule/add']) }

  deleteSchedule(schedule: FlightSchedule) {
    this.scheduleService.deleteSchedule(schedule);
    this.getScheduleData()
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  showToast(type: string, msg: string, detail: string) {
    this.messageService.add({ severity: type, summary: msg, detail: detail });
  }

}
