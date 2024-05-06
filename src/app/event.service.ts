import { Injectable } from '@angular/core';
import { EventEntity } from './Models/EventEntity';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }
   //this is some globally used variables
EventDataService!:EventEntity ;
ComponentName:string = "default" ;
IsloggedIn = (sessionStorage.length == 0)?false:true ; 
 
 //this is some regular expressions for validations 
NameReg = new RegExp("^[a-zA-Z ]+$");
EmailReg = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
PhoneReg = new RegExp("^((\\+91-?)|0)?[0-9]{10}$")
AddressReg = new RegExp("^[A-Za-z0-9\/ ,.-]+$")
PasswordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9@$!%*?&#]{8,14}$")

}
