import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Airline } from 'src/app/interfaces/adminInterface';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private baseUrl: string = environment.apiBaseUrl.concat('/airlines');

  constructor(private http: HttpClient, private router: Router) { }

  getAllAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.baseUrl.concat('/airline'));
  }

  getAirlineById(airlineId: string) {
    let url: string = this.baseUrl.concat('/airlineById/').concat(airlineId)
    return this.http.get<Airline>(url)
  }

  addAirline(airline: Airline) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(airline);
    let url: string = this.baseUrl.concat('/airline')
    return this.http.post<any>(url, body, { 'headers': headers })
     /*  .subscribe({
        next: data => {
          //console.log(data)
          this.router.navigate(['/admin/airline'])
        },
        error: error => {
          console.error('There was an error!', error);
        }
      }) */
  }

  deleteAirline(airline: Airline) {
    let url: string = this.baseUrl.concat('/airline')
    const body = JSON.stringify(airline);
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
          //this.router.navigate(['/admin/airline'])
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
  }

  saveEditedAirline(airline : Airline){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(airline);
    let url:string = this.baseUrl.concat('/airline')    
    this.http.put<any>(url, body, {'headers' : headers})
    .subscribe({
      next: data => {
        //console.log(data)
        //this.router.navigate(['/admin/airline'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }


}
