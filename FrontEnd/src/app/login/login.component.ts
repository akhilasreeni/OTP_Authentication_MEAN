import { Component, OnInit } from '@angular/core';
import { SendemailService } from '../sendemail.service';
import {NgToastService} from 'ng-angular-popup';
import { Router } from '@angular/router';
import { userModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = new userModel("",0);
  constructor(private sendemail: SendemailService, public router:Router,public toast:NgToastService) { }
 
  ngOnInit(): void { 
  }
  onSend(){
    this.sendemail.newUserAdd(this.newUser);
    this.toast.success({detail:"SUCCESS",summary:'OTP send to mail.',duration:6000});
    console.log("register button hit");
    this.router.navigate(['/verifyotp']);    
  }

}
