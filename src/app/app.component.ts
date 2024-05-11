import { Component } from '@angular/core';
import { APICallService } from './api-call.service';
import { Route, Router } from '@angular/router';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'EventManagement';
 
  constructor(public service:APICallService,public eventServiec:EventService,private route:Router){
    
  }
  //this is for loging out when user or admin login out we clear the session storage and navigate to the Login page
  logout(){
  sessionStorage.clear();
  this.eventServiec.IsloggedIn = false ;
  this.eventServiec.UserEventFlag = "EmployeeEvent"
  this.route.navigate(['/Login']);
  }
}
