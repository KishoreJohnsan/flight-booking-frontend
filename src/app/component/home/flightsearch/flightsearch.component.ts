import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.scss'],
  providers: [MessageService]
})
export class FlightsearchComponent implements OnInit {

  schedules : FlightSchedule[] = []  
  flightSearchForm : FormGroup;

  constructor(private router: Router, private builder:FormBuilder, private scheduleService:FlightscheduleService,
    private messageService: MessageService) {
    this.flightSearchForm = this.builder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],        
    })

   }

  ngOnInit(): void {
  }

  hasRoute(route: string) {
    return this.router.url === route

  }

  isHome() {
    return this.router.url === '/'
  }

  isUser() {
    return this.router.url.includes('user')
  }

  onSubmit() {    
    let source = this.flightSearchForm.get('source')?.value
    let destination = this.flightSearchForm.get('destination')?.value
    this.flightSearchForm.patchValue({ source: source.toUpperCase() });
    this.flightSearchForm.patchValue({ destination: destination.toUpperCase() });
    
   /*  this.scheduleService.getScheduleByStation(this.flightSearchForm.value).subscribe((schedules) => {
      this.schedules = schedules
    })   */  

    this.scheduleService.getScheduleByStation(this.flightSearchForm.value).subscribe({
      next: data => {
        this.schedules = data
      },
      error: error => {        
        this.showToast('error', error.error, 'Flights not available for given stations')
      }
    })

    if (this.isUser())
      this.router.navigate(['/user/result']);
    else
      this.router.navigate(['/result'])
  } 

  showToast(type:string, msg:string, detail:string) {
    this.messageService.add({ severity: type, summary: msg, detail: detail });
  }

}
