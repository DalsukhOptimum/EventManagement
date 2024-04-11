import { Component } from '@angular/core';
import { APICallService } from './api-call.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'EventManagement';
 
  constructor(public service:APICallService,private route:Router){
    
  }
  logout(){
  sessionStorage.clear();
  this.route.navigate(['/Login']);
  this.service.IsloggedIn = false ;

  }
}
