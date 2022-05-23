import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Token } from 'src/app/interfaces/commonInterface';
import { LoginService } from 'src/app/service/common/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[MessageService]
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private builder : FormBuilder, private loginService : LoginService, private router : Router, private messageService : MessageService) { 
    this.registerForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordCnfm:['', Validators.required]        
    },{validator: this.checkIfMatchingPassword('password', 'passwordCnfm')})
  }

  ngOnInit(): void {
  }

  checkIfMatchingPassword(password: string, passwordCnfm: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
          passwordConfirmationInput = group.controls[passwordCnfm];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  onSubmit(){
    this.loginService.register(this.registerForm.value)
    .subscribe({
      next: (data: Token) => {
        //console.log(data)        
          this.router.navigate(['/login'])        
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
