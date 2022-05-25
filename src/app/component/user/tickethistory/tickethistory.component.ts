import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/commonInterface';
import { Booking } from 'src/app/interfaces/userInterface';
import { BookingService } from 'src/app/service/user/booking.service';
import * as dayjs from 'dayjs'
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TicketViewComponent } from '../ticket-view/ticket-view.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.component.html',
  styleUrls: ['./tickethistory.component.scss'],
  providers: [DialogService, MessageService]
})
export class TickethistoryComponent implements OnInit {

  bookings: Booking[] = [];
  user!: string | '';
  ref!: DynamicDialogRef;
  blob: any;

  constructor(private router: Router, private bookingService: BookingService, public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {

    let dataString = localStorage.getItem("data") || "";
    if (!dataString) {
      this.router.navigate(['/']);
    } else {
      let data: Token = JSON.parse(dataString);
      if (dayjs().isAfter(dayjs(data.expiry)))
        this.router.navigate(['/']);

      if (!data.role.includes('USER'))
        this.router.navigate(['/']);

      this.user = data.user
    }

    this.getBookingData()

  }

  getBookingData() {
    /* this.bookingService.getAllBookingByUser(this.user).subscribe((bookings) => {           
      this.bookings = bookings
    }) */
    this.bookingService.getAllBookingByUser(this.user).subscribe({
      next: data => {
        this.bookings = data
      },
      error: error => {
        this.showToast('error', error.error.error, `No Booking details found for ${this.user}`)
      }
    })

  }

  show(bookingId: string) {

    this.ref = this.dialogService.open(TicketViewComponent, {
      data: {
        id: bookingId
      },
      header: 'View Ticket',
      width: '40%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  cancelTicket(bookingId: string) {
    this.bookingService.cancelTicket(bookingId);
    this.getBookingData();
    //this.ngOnInit()

  }

  deleteTicket(booking: Booking) {
    this.bookingService.deleteTicket(booking)
    this.getBookingData();
    //this.ngOnInit()
  }

  downloadTicket(bookingId: string) {
    this.bookingService.downloadTicket(bookingId).subscribe({
      next: blob => {

        const file = new Blob([blob], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank', 'width=1000, height=800');

      },
      error: error => {
        this.showToast('error', error.error.error, `Please check and try again`)
      }
    })
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



