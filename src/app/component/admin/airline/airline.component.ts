import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/interfaces/adminInterface';
import { AirlineService } from 'src/app/service/admin/airline.service';
import * as dayjs from 'dayjs'
import { Token } from 'src/app/interfaces/commonInterface';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AirlineEditComponent } from '../airline-edit/airline-edit.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
  providers: [DialogService, MessageService]
})
export class AirlineComponent implements OnInit {

  airlines: Airline[] = [];
  ref!: DynamicDialogRef;

  constructor(private router: Router, private airlineService: AirlineService, public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    let dataString = localStorage.getItem("data") || "";
    if (!dataString) {
      this.router.navigate(['/']);
    } else {
      let data: Token = JSON.parse(dataString);
      if (dayjs().isAfter(dayjs(data.expiry)))
        this.router.navigate(['/']);

      if (!data.role.includes('ADMIN'))
        this.router.navigate(['/']);
    }

    this.getAirlineData()

  }

  getAirlineData() {
    /*  this.airlineService.getAllAirlines().subscribe((airlines) => {
       this.airlines = airlines
     }); */
    this.airlineService.getAllAirlines().subscribe({
      next: data => {
        this.airlines = data
      },
      error: error => {
        this.showToast('error', error.error.error, 'No airlines data available')
      }
    })
  }

  show(airlineId: string) {

    this.ref = this.dialogService.open(AirlineEditComponent, {
      data: {
        id: airlineId
      },
      header: 'Edit Airline',
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((airline: Airline) => {
      if (airline) {
        this.airlineService.saveEditedAirline(airline);
        this.getAirlineData()
      }

    });

  }

  handleClick() {
    this.router.navigate(['/admin/airline/add'])
  }

  deleteAirline(airline: Airline) {
    this.airlineService.deleteAirline(airline);
    this.getAirlineData()
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
