import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/commonInterface';
import { AirlineService } from 'src/app/service/admin/airline.service';
import * as dayjs from 'dayjs'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.scss'],
  providers: [MessageService]
})
export class AddAirlineComponent implements OnInit {

  airlineForm: FormGroup;

  constructor(private builder: FormBuilder, private airlineService: AirlineService, private router:Router,
    private messageService : MessageService) {
    this.airlineForm = this.builder.group({
      airlineName: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      isActive: ['true', Validators.required],
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
    }

  }

  onSubmit() {    
    this.airlineService.addAirline(this.airlineForm.value)
     .subscribe({
        next: data => {
          //console.log(data)
          this.showToast('success', 'Data added successfully', 'Airline Data saved')
          this.router.navigate(['/admin/airline'])
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
