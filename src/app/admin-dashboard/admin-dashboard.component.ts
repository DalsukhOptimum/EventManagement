import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  ngOnInit():void{
    this.service.ComponentName = "default";
  }
  
  constructor(public service:APICallService,private route:Router)
  {

  }
  ComponentName! :string;
 submit(component:string)
 {
     this.ComponentName = component
 }



}
