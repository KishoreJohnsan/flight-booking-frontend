import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { Booking } from 'src/app/interfaces/userInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //private baseUrl: string = environment.apiBaseUrl.concat('/bookings');
  private baseUrl: string = environment.apiUserUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getAllBookingByUser(user: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl.concat('/bookingByUser/').concat(user));
  }

  getAllBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(this.baseUrl.concat('/bookingById/').concat(bookingId));
  }

  getScheduleById(scheduleId: string) {
    let url: string = this.baseUrl.concat('/scheduleById/')
      .concat(scheduleId)

    return this.http.get<FlightSchedule>(url)
  }

  bookTicket(booking: Booking) {
    //this.http.post<Booking>(this.baseUrl.concat('/booking'), booking);
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(booking);
    let url: string = this.baseUrl.concat('/booking')
    return this.http.post<any>(url, body, { 'headers': headers })
    /*  .subscribe({
       next: data => {          
         this.router.navigate(['/user/history'])
       },
       error: error => {
         console.error('There was an error!', error);
       }
     }) */
  }

  cancelTicket(bookingId: string) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(bookingId);

    let url: string = this.baseUrl.concat('/cancelBooking/').concat(bookingId)
    this.http.put<any>(url, body, { 'headers': headers })
      .subscribe({
        next: data => {
          //console.log(data)
          //this.router.navigate(['/user/home'])

        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
  }

  deleteTicket(booking: Booking) {
    let url: string = this.baseUrl.concat('/booking')
    const body = JSON.stringify(booking);
    //console.log(body) 
    const options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      body: body
    }
    this.http.delete<any>(url, options)
      .subscribe({
        next: data => {
          //console.log(data)
          //this.router.navigate(['/user/home'])
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })

  }


  downloadTicket(bookingId: string) {
    /*  const httpOptions = {
       responseType: 'blob' as 'json'
     }; */

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<any>(this.baseUrl.concat('/downloadTicket/').concat(bookingId), { headers: headers, responseType: 'blob' as 'json' });

  }


}
