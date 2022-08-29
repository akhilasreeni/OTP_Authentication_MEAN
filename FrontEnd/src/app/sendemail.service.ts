import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor(public http:HttpClient) { }
  newUserAdd(email: any) {
    console.log("Service file");
    return this.http.post('http://localhost:3000/login',email);
  }
  verifyotp(uotp: number){
    console.log("Service file");
    return this.http.post('http://localhost:3000/verifyotp',uotp);
  }
}
