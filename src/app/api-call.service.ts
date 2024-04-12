import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEntity } from './Models/EventEntity';


@Injectable({
  providedIn: 'root'
})
export class APICallService {

  
   ApiBaseUrl:string = "https://localhost:44341/api/EventModule/" 
 
  showalldata:boolean = true ;
  UserEventFlag = "EmployeeEvent";
  EventDataService!:EventEntity ;
  ComponentName:string = "default" ;
  IsloggedIn = (sessionStorage.length == 0)?false:true ;
  
  flag:boolean = false;
  constructor(private http: HttpClient) { }

  callMethod(url: string, data: object): any {
    return this.http.post(this.ApiBaseUrl + url, data).pipe();
  }
}