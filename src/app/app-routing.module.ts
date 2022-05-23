import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAirlineComponent } from './component/admin/add-airline/add-airline.component';
import { AddFlightScheduleComponent } from './component/admin/add-flight-schedule/add-flight-schedule.component';
import { AdminhomeComponent } from './component/admin/adminhome/adminhome.component';
import { AirlineComponent } from './component/admin/airline/airline.component';
import { FlightscheduleComponent } from './component/admin/flightschedule/flightschedule.component';
import { LoginComponent } from './component/home/login/login.component';
import { RegisterComponent } from './component/home/register/register.component';
import { ResultHomeComponent } from './component/home/result-home/result-home.component';
import { BookTicketComponent } from './component/user/book-ticket/book-ticket.component';
import { TicketViewComponent } from './component/user/ticket-view/ticket-view.component';
import { TickethistoryComponent } from './component/user/tickethistory/tickethistory.component';
import { UserhomeComponent } from './component/user/userhome/userhome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'result', component: ResultHomeComponent},
  { path: 'admin/home', component: AdminhomeComponent },
  { path: 'admin/airline', component: AirlineComponent },
  { path: 'admin/schedule', component: FlightscheduleComponent },
  { path: 'admin/airline/add', component: AddAirlineComponent },
  { path: 'admin/schedule/add', component: AddFlightScheduleComponent },
  { path: 'user/home', component: UserhomeComponent },
  { path: 'user/search', component: UserhomeComponent },
  { path: 'user/result', component: UserhomeComponent },
  { path: 'user/history', component: TickethistoryComponent },
  { path: 'user/ticket/:id', component: TicketViewComponent },
  { path: 'user/book', component: BookTicketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
