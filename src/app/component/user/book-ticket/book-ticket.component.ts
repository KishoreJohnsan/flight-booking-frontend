import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Token } from 'src/app/interfaces/commonInterface';
import { FlightscheduleService } from 'src/app/service/admin/flightschedule.service';
import { BookingService } from 'src/app/service/user/booking.service';
import * as dayjs from 'dayjs'
import { TicketViewComponent } from '../ticket-view/ticket-view.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss'],
  providers:[MessageService]  
})
export class BookTicketComponent implements OnInit {

  scheduleId: string = ''
  fare: any = '0'
  bookingForm: FormGroup;
  user!: string | '';
  

  constructor(private builder: FormBuilder, private bookingService: BookingService, private router: Router,
    private activatedRouter: ActivatedRoute, private scheduleService: FlightscheduleService, private messageService : MessageService) {

    this.bookingForm = this.builder.group({
      airline: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['',Validators.required],
      mealPreference: ['veg', Validators.required],
      seats: ['1', Validators.required],
      fare: ['', Validators.required],
      user:['']
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

        this.user = data.user
    }

    this.activatedRouter.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(state => {
        this.scheduleId = state && state.scheduleId;
      });


    if (this.scheduleId) {

      this.scheduleService.getScheduleById(this.scheduleId).subscribe((schedule) => {
        this.bookingForm.patchValue({
          airline: schedule.airline,         
          date:schedule.date,
          time:schedule.time,
          source: schedule.source,
          destination: schedule.destination,
          fare: schedule.fare,
        })
        this.fare = schedule.fare
        
      })
    } else {
      this.router.navigate(['/user/home']);
    }

    this.bookingForm.get('seats')?.valueChanges.subscribe(value => {
      
      let seats = this.bookingForm.get('seats')?.value
      let totalfare = seats * this.fare     
      this.bookingForm.patchValue({ fare: totalfare });
    });

  }

  hasRoute(route: string) {
    return this.router.url === route
  }

  onSubmit() {    
    this.bookingForm.patchValue({ user: this.user });    
    this.bookingService.bookTicket(this.bookingForm.value)
    .subscribe({
      next: data => {          
        this.router.navigate(['/user/history'])
      },
      error: error => {
        this.showToast('error', error.error, 'Please check and try again')
      }
    })
  }

  showToast(type:string, msg:string, detail:string) {
    this.messageService.add({ severity: type, summary: msg, detail: detail });
  }

}
