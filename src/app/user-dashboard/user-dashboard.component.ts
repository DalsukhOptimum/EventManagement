import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {faBookOpenReader,faCalendarDays,faHome} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  // this is Ions from fortawesome libraray
  IconInfo = faBookOpenReader;
  IconfaCalendarDays = faCalendarDays ;
  IconHome = faHome ;

  //message for storing message which is coming from API.
  Message!: any;
  //List of Event data which is coming fom API.
  EventData!: EventEntity[];
  //flag which willd decide that which component to show 
  //this flag will change from HTML buttons 
  // from this we will also show the heading to the HTML page 
  Flag! :string 


  constructor(private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.Eventshow("EmployeeEvent");
  }

  //this is when user click on any button this will set the flag and then call the api upon this and this will show event based upon that
Eventshow(flag:string)
{
  //if flag is EmployeeEvent show we want to show heading as ALl Eevnts that's why we change the flag 
  if(flag == "EmployeeEvent")
    {
      this.Flag = "All Events";
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

  //when user will click on show more this function will be called 
  // this will store that particular event to service and then redirect to the User Detail page
  viewmore(index: any) {
    this.service.EventDataService = this.EventData[index];
    console.log("this is in function ", this.EventData[index]);
  
  
    this.router.navigate(["/Event-Detail"]);
  }
  
}




