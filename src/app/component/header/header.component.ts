import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/common/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  isHome() {
    return this.router.url === '/'
  }

  hasRoute(route: string) {
    return this.router.url === route
  }

  isAdmin(){
    return this.router.url.includes('admin')
  }

  isUser(){
    return this.router.url.includes('user')
  }

  handleLogout() {
    this.loginService.logout();
    this.router.navigate(['/'])
  }

}
