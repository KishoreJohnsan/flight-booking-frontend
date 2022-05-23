import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs'
import { Token } from 'src/app/interfaces/commonInterface';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  constructor(private router: Router) { }

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

}
