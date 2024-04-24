import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';
import {faTrash,faEdit,faUpload,faDownload} from '@fortawesome/free-solid-svg-icons'
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
  PublishIcon = faUpload ;
  UnPublishIcon = faDownload ;
 
  //initially Message is null and then we will store the message which is coming from Backend
  Message!: any;
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
    console.log("one more time");
    this.Message = null;

    let obj = {
      Flag: "AllEvent"
    }
    this.service.showEventOrActivity(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            this.EventData = data.ArrayOfResponse;

          }
          else if(data.ID == 0){
           this.EventData = [];
            this.Message = data.Message;
          }
          else{
            this.Message = "something went wrong";
            ;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });


  }

  //it will send the EventId for deletion and call the API.
  Operation(EventId:any,flag:string)
  {
    if(!confirm("Are you Sure???"))
    {
         return ;
    }

    
    let obj = {
      EventId:EventId,
      Flag: flag
    }
    this.service.PublishOrAddPrice(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            //here i am fetching new updated Events.
            this.EventFetch();
            
          }
          else if(data.ID == 0)
            {
              alert(data.Message);
            }
          else {
            
            alert("something went wrong");
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
