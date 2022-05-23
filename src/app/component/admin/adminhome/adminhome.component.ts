import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/commonInterface';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router: Router) { }

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

  }

}
