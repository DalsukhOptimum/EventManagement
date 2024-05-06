import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';
import { EventService } from '../event.service';



@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent {
  Message!: any;
  EventData!: EventEntity[];



  constructor(public eventServiec:EventService,private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  //this is for fetching all the events which is published.
  //right now i am not using this component i made another component for this.
  ngOnInit(): void {
    this.Message = null;

    let obj = {

      Flag: "EmployeeEvent"
    }
    this.service.showEventOrActivity(obj).subscribe(
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

//this is for viewing more about event this is redirect to the event detail page 
  viewmore(index: any) {
    this.eventServiec.EventDataService = this.EventData[index];
    console.log("this is in function ", this.EventData[index]);
    this.router.navigate(["/Event-Detail"]);
  }

}
