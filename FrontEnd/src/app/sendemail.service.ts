import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor(public http:HttpClient) { }
  loginUser(userData: any) {
    return this.http.post<any>('http://localhost:3000/login',{userData});
  }
}
