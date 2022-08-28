import { Component, OnInit } from '@angular/core';
import { SendemailService } from '../sendemail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = {email:''}
  constructor(private sendemail: SendemailService, public router:Router) { }
 
  ngOnInit(): void { 
  }
  onSend(){
    console.log("Login TS file");
    console.log(this.newUser.email);
    this.sendemail.newUserAdd(this.newUser.email);
    localStorage.setItem("email",this.newUser.email)
    this.router.navigate(['/verifyotp']);    
  }

}
