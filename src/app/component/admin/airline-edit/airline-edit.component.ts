import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/interfaces/adminInterface';
import { AirlineService } from 'src/app/service/admin/airline.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.scss']
})
export class AirlineEditComponent implements OnInit {

  airlineId: string = ''
  //airline!: Airline;
  airlineEditForm: FormGroup;

  constructor(private airlineService: AirlineService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private builder: FormBuilder) {
    this.airlineId = this.config.data.id

    this.airlineEditForm = this.builder.group({
      airlineId:['', Validators.required],
      airlineName: ['', Validators.required],
      address: ['', Validators.required],
      contact: [''],
      isActive: [''],    
    });
  }

  ngOnInit(): void {

    this.airlineService.getAirlineById(this.airlineId).subscribe((airline) => {
      
      this.airlineEditForm.patchValue({
        airlineId:airline.airlineId,
        airlineName: airline.airlineName,       
        address: airline.address,
        contact: airline.contact,
        isActive: airline.isActive,
      })
    })

  }

  onSaveEdit(){
    this.ref.close(this.airlineEditForm.value)
  }

}
