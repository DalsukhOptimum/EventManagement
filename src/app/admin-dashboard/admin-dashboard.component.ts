import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import {faCalendarPlus,faUpload,faHome} from '@fortawesome/free-solid-svg-icons';
import { EventService } from '../event.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  //Icons from fortawesome library
   Icon = faCalendarPlus;
   uploadIcon = faUpload ;
   DashboardIcon = faHome;
  ngOnInit():void{
    this.eventServiec.ComponentName = "default";
  }
  
  constructor(public eventServiec:EventService,public service:APICallService,private route:Router)
  {

  }
  //nothing to do with this because we store this variables in service file
}
