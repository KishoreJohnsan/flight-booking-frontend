import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/common/login.service';
import { MessageService } from 'primeng/api';
import { Token } from 'src/app/interfaces/commonInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private builder: FormBuilder, private loginService: LoginService, private messageService: MessageService) {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submitLogin(formdata: any) {

    if (formdata.username) {
      if (formdata.username === 'admin')
        this.router.navigate(['/admin/home']);
      else
        this.router.navigate(['/user/home']);
    } else
      this.router.navigate(['/'])
  }

  onSubmit() {
    this.loginService.authenticate(this.loginForm.value)
    .subscribe({
      next: (data: Token) => {
        //console.log(data)
        localStorage.setItem('data', JSON.stringify(data));
        if (data.role.toLowerCase().includes('admin'))
          this.router.navigate(['/admin/home'])
        else
          this.router.navigate(['/user/home'])

      },
      error: error => {
        console.log(error)
        if(error.status === 401)
          this.showToast('error', 'UserName/Password Incorrect', 'Please check and try again')
        if(error.status === 503)
          this.showToast('error', 'Internal Server Error', 'Please try again later')
      }
    })
  }

  showToast(type:string, msg:string, detail:string) {
    this.messageService.add({ severity: type, summary: msg, detail: detail });
  }


}
