import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import {faCalendarPlus,faUpload,faHome,faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { EventService } from '../event.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
 
  //Icons from fortawesome library
  ok = "hello from here";
   Icon = faCalendarPlus;
   uploadIcon = faUpload ;
   DashboardIcon = faHome;
   calanderIcon = faCalendarAlt ;
  ngOnInit():void{
    console.log("i am in ngonintit");
    this.eventServiec.ComponentName = "default";
  }
  
  constructor(public eventServiec:EventService,public service:APICallService,private route:Router)
  {
   console.log("i am in dashboard")
  }
  //nothing to do with this because we store this variables in service file
}
