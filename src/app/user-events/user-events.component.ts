import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';
import { EventService } from '../event.service';
import {faBookOpenReader,faCalendarDays,faHome,faChartSimple} from '@fortawesome/free-solid-svg-icons'



@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent {

  //message for storing message which is coming from API.
  Message!: any;
  IconInfo = faBookOpenReader
  //List of Event data which is coming fom API.
  EventData:EventEntity[] = [];
  //flag which willd decide that which component to show 
  //this flag will change from HTML buttons 
  // from this we will also show the heading to the HTML page 
  Flag! :string 



  constructor(public eventServiec:EventService,private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
   console.log("mai yaha hu");
    this.Eventshow(this.eventServiec.UserEventFlag);
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
    this.service.showEventOrActivity(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            this.EventData = data.ArrayOfResponse;
          }
          else if(data.ID == 0){
           
            this.Message = data.Message;
          }
          else{
            this.Message = "soemthing went wrong ";
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
    this.eventServiec.EventDataService = this.EventData[index];
    console.log("this is in function ", this.EventData[index]);
  
    
  
    this.router.navigate(["User-Dashboard/Event-Detail-user"]);
  }













//   Message!: any;
//   EventData!: EventEntity[];



//   constructor(public eventServiec:EventService,private service: APICallService, private formBuilder: FormBuilder, private router: Router) {

//   }

//   //this is for fetching all the events which is published.
//   //right now i am not using this component i made another component for this.
//   ngOnInit(): void {
//     this.Message = null;

//     let obj = {

//       Flag: "EmployeeEvent"
//     }
//     this.service.showEventOrActivity(obj).subscribe(
//       {
//         next: (data: any) => {
//           if (data.ID != 0) {
//             this.EventData = data.ArrayOfResponse;


//             console.log(data);

//           }
//           else {
//             this.Message = data.Message;
//           }
//         },
//         Error: (err: Error) => {
//           window.alert("ENTER VALID credetails");
//         }

//       });




//   }

// //this is for viewing more about event this is redirect to the event detail page 
//   viewmore(index: any) {
//     this.eventServiec.EventDataService = this.EventData[index];
//     console.log("this is in function ", this.EventData[index]);
//     this.router.navigate(["/Event-Detail"]);
//   }

}
