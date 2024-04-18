import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEntity } from './Models/EventEntity';


@Injectable({
  providedIn: 'root'
})
export class APICallService {

  //this is base API url for calling the API.
ApiBaseUrl:string = "https://localhost:44341/api/EventModule/" 
 
 //this is some global variables
// EventDataService!:EventEntity ;
// ComponentName:string = "default" ;
// IsloggedIn = (sessionStorage.length == 0)?false:true ;
 
//  //this is some regular expressions for validations 
// NameReg = new RegExp("^[a-zA-Z ]+$");
// EmailReg = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
// PhoneReg = new RegExp("[0-9]{10}")

constructor(private http: HttpClient) { }

  // this is method for calling API. 
  ApiCall(url: string, data: object): any {
    return this.http.post(this.ApiBaseUrl + url, data).pipe();
  }

  

}