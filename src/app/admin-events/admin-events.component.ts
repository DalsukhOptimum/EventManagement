import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent {
  Message!: null;
  EventData!: EventEntity[];



  constructor(private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.EventFetch();


  }

  EventFetch()
  {
    this.Message = null;

    let obj = {
      Flag: "EmployeeEvent"
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

  Delete(EventId:any)
  {
    let obj = {
      EventId:EventId,
      Flag: "DeleteEvent"
    }
    this.service.callMethod('PublishOrAddPrice', obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID != 0) {
            this.EventFetch();
          //  this.EventData = data.ArrayOfResponse;


            console.log(data);

          }
          else {
            alert(data.Message);
          //  this.Message = data.Message;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });
  }

  Update(Index:any)
  {
    this.service.EventDataService = this.EventData[Index];

    this.service.ComponentName = 'Update-Event'
  }


}
