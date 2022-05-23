import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FlightsearchComponent } from './component/home/flightsearch/flightsearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminhomeComponent } from './component/admin/adminhome/adminhome.component';
import { AirlineComponent } from './component/admin/airline/airline.component';
import { FlightscheduleComponent } from './component/admin/flightschedule/flightschedule.component';
import { AddAirlineComponent } from './component/admin/add-airline/add-airline.component';
import { AddFlightScheduleComponent } from './component/admin/add-flight-schedule/add-flight-schedule.component';
import { LoginComponent } from './component/home/login/login.component';
import { RegisterComponent } from './component/home/register/register.component';
import { UserhomeComponent } from './component/user/userhome/userhome.component';
import { BookTicketComponent } from './component/user/book-ticket/book-ticket.component';
import { SearchResultComponent } from './component/home/search-result/search-result.component';
import { TickethistoryComponent } from './component/user/tickethistory/tickethistory.component';
import { TicketViewComponent } from './component/user/ticket-view/ticket-view.component';
import { ResultHomeComponent } from './component/home/result-home/result-home.component';
import { ScheduleViewComponent } from './component/admin/schedule-view/schedule-view.component';
import { ScheduleEditComponent } from './component/admin/schedule-edit/schedule-edit.component';
import { AirlineEditComponent } from './component/admin/airline-edit/airline-edit.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import {PanelModule} from 'primeng/panel';
import {ImageModule} from 'primeng/image';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InterceptorService } from './service/common/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FlightsearchComponent,
    AdminhomeComponent,
    AirlineComponent,
    FlightscheduleComponent,
    AddAirlineComponent,
    AddFlightScheduleComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    BookTicketComponent,
    SearchResultComponent,
    TickethistoryComponent,
    TicketViewComponent,
    ResultHomeComponent,
    ScheduleViewComponent,
    ScheduleEditComponent,
    AirlineEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ToastModule,
    TableModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    PasswordModule,
    TooltipModule,
    DynamicDialogModule,
    PanelModule,
    ImageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
