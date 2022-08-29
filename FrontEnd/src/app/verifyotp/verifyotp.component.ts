import { Component, OnInit } from '@angular/core';
import { SendemailService } from '../sendemail.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  user={email:'',otp:0};
  constructor(private router:Router,private sendemail:SendemailService) { }

  ngOnInit(): void {
  }
  verifyUser(){
    const uemail=localStorage.getItem("email");
    const uotp=this.user.otp;
    // this.user.email=uemail;
    // this.user.otp=uotp;
    this.sendemail.verifyotp(uotp).subscribe((data)=>{
      if(true){
        this.router.navigate(['welcome'])
      }
      else{
        alert("Wrong OTP")
      }
      
    })
  }
}
