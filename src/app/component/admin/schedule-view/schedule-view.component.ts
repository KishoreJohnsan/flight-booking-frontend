import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit {

  scheduleId: string = ''
  schedule!: FlightSchedule;

  constructor(private scheduleService: FlightscheduleService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.scheduleId = this.config.data.id
  }

  ngOnInit(): void {

    this.scheduleService.getScheduleById(this.scheduleId).subscribe((schedule) => {
      this.schedule = schedule
    })

  }

  

}


