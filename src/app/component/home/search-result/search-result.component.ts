import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { Booking, Result } from 'src/app/interfaces/userInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input()
  results: FlightSchedule[] = [];

  schedule: FlightSchedule | any;

  constructor(private router: Router, private scheduleService: FlightscheduleService) {

  }
  ngOnInit(): void {
    
  }

  hasRoute(route: string) {
    return this.router.url === route
  }

  bookTicket(schedule: FlightSchedule) {

    let dataString = localStorage.getItem("data") || "";
    if (!dataString) {
      this.router.navigate(['/']);
    }

    this.schedule = schedule

    let url: string = this.router.url;

    if (url === '/user/result')
      this.router.navigate(['/user/book'], {state : {scheduleId : this.schedule.scheduleId}})
    else
      this.router.navigate(['/login'])

  }

}
