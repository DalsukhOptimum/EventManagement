import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  Message!: any;
  EventData!: EventEntity[];
  Flag! :string 


  constructor(private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.Eventshow("EmployeeEvent");
  }

Eventshow(flag:string)
{
  if(flag == "EmployeeEvent")
    {
      this.Flag = "AllEvents";
    }
    else{
      this.Flag = flag ;
    }

    this.Message = null;

    let obj = {
      Flag: flag 
    }
    this.service.callMethod('showEventOrActivity', obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID != 0) {
            this.EventData = data.ArrayOfResponse;


            console.log(data);

          }
          else {
            this.Message = data.Message;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");
        }

      });




  }

  viewmore(index: any) {
    this.service.EventDataService = this.EventData[index];
    console.log("this is in function ", this.EventData[index]);
    // let obj = this.EventData.find((obj:any)=>obj.EventId = Id)
  
    this.router.navigate(["/Event-Detail"]);
  }
  
}




