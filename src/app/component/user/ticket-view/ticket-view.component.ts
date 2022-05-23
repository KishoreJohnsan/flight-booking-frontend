import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/commonInterface';
import { Booking } from 'src/app/interfaces/userInterface';
import * as dayjs from 'dayjs'
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BookingService } from 'src/app/service/user/booking.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  bookingId: string = ''
  booking!: Booking;

  constructor(private router: Router, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private bookingService: BookingService) {
    this.bookingId = this.config.data.id
  }

  ngOnInit(): void {

    this.bookingService.getAllBookingById(this.bookingId).subscribe((booking) => {
      this.booking = booking
    })

  }

}
