import { Component, OnInit } from '@angular/core';
import { SendemailService } from '../sendemail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sendemail: SendemailService, public router:Router) { }
  userData = {email:''};
 

  ngOnInit(): void {
  }
  onlogin() {
    this.sendemail.loginUser(this.userData);
    this.router.navigate(['verifyOTP']);
  }

}
