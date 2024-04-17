import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import {faCalendarPlus,faUpload,faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

   Icon = faCalendarPlus;
   uploadIcon = faUpload ;
   DashboardIcon = faHome;
  ngOnInit():void{
    this.service.ComponentName = "default";
  }
  
  constructor(public service:APICallService,private route:Router)
  {

  }
  ComponentName! :string;
  //nothing to do with this because we store this variables inj service file
 submit(component:string)
 {
     this.ComponentName = component
 }



}
