import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent {
  Message!: any;
  EventData!: EventEntity[];


  constructor(private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  //this is for fetching all the events which is published.
  ngOnInit(): void {
    this.Message = null;

    let obj = {
      Flag: this.service.UserEventFlag 
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
