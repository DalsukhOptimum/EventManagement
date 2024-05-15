import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEntity } from './Models/EventEntity';
import { Observable, catchError, filter, map, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { environment } from '../Environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APICallService {

  //this is base API url for calling the API.
// ApiBaseUrl:string = "https://localhost:44341/api/EventModule/" 

ApiBaseUrl:string = environment.ApiBase;

  httpHeaders= {
  'content-type': 'application/json'
};

constructor(private http: HttpClient,private router:Router) { }

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
    return this.http.post(this.ApiBaseUrl + "RegisterUser", data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
           this.router.navigate(['login']);
        }
        return throwError(error);
      })
    )
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

  Calander(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "Calander", data).pipe();
  }

  OTPGeneration(data:object):any
  {
    return this.http.post(this.ApiBaseUrl + "OTPGeneration", data).pipe();
  }

  EmailVerification(data:object):any

  
  {
    return this.http.post(this.ApiBaseUrl + "EmailVerification", data).pipe();
  }
  


}