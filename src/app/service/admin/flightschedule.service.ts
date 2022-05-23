import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightscheduleService {

  //private baseUrl: string = environment.apiBaseUrl.concat('/schedules');
  private baseUrl: string = environment.apiAdminUrl;
  
  constructor(private http: HttpClient, private router:Router) { }

  getAllSchedules(): Observable<FlightSchedule[]> {
    return this.http.get<FlightSchedule[]>(this.baseUrl.concat('/schedule'));
  }

  addSchedule(schedule: FlightSchedule) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(schedule);
    let url:string = this.baseUrl.concat('/schedule')    
    return this.http.post<any>(url, body, {'headers' : headers})
   /*  .subscribe({
      next: data => {
        //console.log(data)
        this.router.navigate(['/admin/schedule'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    }) */
  }

  deleteSchedule(schedule: FlightSchedule) {   
    let url: string = this.baseUrl.concat('/schedule')    
    const body = JSON.stringify(schedule);    
    const options = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      }),
      body:body
    }
    this.http.delete<any>(url, options)
      .subscribe({
        next: data => {
          //console.log(data)
          //this.router.navigate(['/admin/schedule'])
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
  }

  getScheduleById(scheduleId: string) {
    let url: string = this.baseUrl.concat('/scheduleById/')
      .concat(scheduleId)
      
     return this.http.get<FlightSchedule>(url)
  }

  saveEditedSchedule(schedule : FlightSchedule){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(schedule);
    //console.log(body)
    let url:string = this.baseUrl.concat('/schedule')    
    this.http.put<any>(url, body, {'headers' : headers})
    .subscribe({
      next: data => {
        //console.log(data)
        //this.router.navigate(['/admin/schedule'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

 
}
