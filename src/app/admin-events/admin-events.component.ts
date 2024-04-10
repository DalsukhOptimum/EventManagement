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
    
  }


}
