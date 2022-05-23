import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlightSchedule } from 'src/app/interfaces/adminInterface';
import { Login, Register, Token } from 'src/app/interfaces/commonInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.apiServiceUrl.concat('/service');

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return localStorage.getItem('data');
  }

  authenticate(login: Login) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(login);
    //console.log(body)
    let url: string = this.baseUrl.concat('/authenticate')
    //console.log(url)
    return this.http.post<any>(url, body, { 'headers': headers })
      /* .subscribe({
        next: (data: Token) => {
          //console.log(data)
          localStorage.setItem('data', JSON.stringify(data));
          if (data.role.toLowerCase().includes('admin'))
            this.router.navigate(['/admin/home'])
          else
            this.router.navigate(['/user/home'])

        },
        error: error => {
          console.error('There was an error!', error);
        }
      }) */
  }

  logout(){
    localStorage.removeItem("data");
  }

  register(register : Register){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(register);
    //console.log(body)
    let url: string = this.baseUrl.concat('/register')
    //console.log(url)
    return this.http.post<any>(url, body, { 'headers': headers })
    /*   .subscribe({
        next: (data: Token) => {
          //console.log(data)        
            this.router.navigate(['/login'])        
        },
        error: error => {
          console.error('There was an error!', error);
        }
      }) */
  }

  getScheduleByStation(schedule: FlightSchedule) {
    let url: string = this.baseUrl.concat('/scheduleByStn/')
      .concat(schedule.source)
      .concat('/')
      .concat(schedule.destination)
     return this.http.get<FlightSchedule[]>(url)
  }

}
