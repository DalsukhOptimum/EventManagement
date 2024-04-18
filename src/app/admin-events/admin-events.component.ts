import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import { EventService } from '../event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent {
  //Icons
  Icon = faTrash;
  editIcon = faEdit ;
  //initially Message is null and then we will store the message which is coming from Backend
  Message!: null;
  //in this we will store the EventList come from backend
  EventData!: EventEntity[];



  constructor(public eventServiec:EventService,private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.EventFetch();


  }

  //it will fetch all the events  for update and delete
  EventFetch()
  {
    this.Message = null;

    let obj = {
      Flag: "AllEvent"
    }
    this.service.ApiCall('showEventOrActivity', obj).subscribe(
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

  //it will send the EventId for deletion and call the API.
  Delete(EventId:any)
  {
    let obj = {
      EventId:EventId,
      Flag: "DeleteEvent"
    }
    this.service.ApiCall('PublishOrAddPrice', obj).subscribe(
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

  //this will call the API for deletion and sending an index for finding 9in event array
  Update(Index:any)
  {
    this.eventServiec.EventDataService = this.EventData[Index];

    this.eventServiec.ComponentName = 'Update-Event'
  }


}
