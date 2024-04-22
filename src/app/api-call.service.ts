import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEntity } from './Models/EventEntity';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class APICallService {

  //this is base API url for calling the API.
ApiBaseUrl:string = "https://localhost:44341/api/EventModule/" 
 
  httpHeaders= {
  'content-type': 'application/json'
};

constructor(private http: HttpClient) { }

  // this is method for calling API. 
  // ApiCall(url: string, data: object): any {
  //   return this.http.post(this.ApiBaseUrl + url, data).pipe();
  // }

  AddEvent(data: object):any
  {
    return this.http.post(this.ApiBaseUrl + "AddEvent", data).pipe();
  }

  AddActivity(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "AddActivity", data).pipe();
  }

  RegisterUser(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "RegisterUser", data).pipe();
  }

  LoginAdminOrUser(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "Login", data).pipe();
  }

  showEventOrActivity(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "showEventOrActivity", data).pipe();
  }

  PublishOrAddPrice(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "PublishOrAddPrice", data).pipe();
  }

  UpdateEvent(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "UpdateEvent", data).pipe();
  }
}