import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { EventEntity } from '../Models/EventEntity';
import { ActivityEntity } from '../Models/ActivityEntity';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  //for storing message which is coming from backend
  Message: any;
  //event data coming from Service
  EventData!:EventEntity ;
 //list of Activity data object
  ActivityData!: ActivityEntity[];

  // for storing base64 image 
  Base64Image!:string ;
  //for storing Image type 
  ImageType!:string ;
constructor( private route:Router,public eventServiec:EventService,private service:APICallService,private formBuilder: FormBuilder)
{ 
  
}

ngOnInit(): void {
  
  //storing Event data which is in the Service 
  this.EventData = this.eventServiec.EventDataService;
  if(!this.EventData)
    {
      this.route.navigate(['/User-Dashboard'])
    }
  //taking base64 image and storing in this for showing in html file 
  this.Base64Image = this.eventServiec.EventDataService.Image;
  //storing imagetype in this for showing in HTML file 
  this.ImageType = this.eventServiec.EventDataService.ImageType ;

  let obj = {
    EventId:this.eventServiec.EventDataService.EventId,
    Flag:"ActibityShow"
  }
  //calling the API and storing that list of activity ACtivityData
  this.service.ApiCall('showEventOrActivity',obj).subscribe(
    {
     next: (data:any)=>{
       if(data.ID != 0)
       {
           this.ActivityData = data.ArrayOfResponse;
           console.log(this.ActivityData[0].Price);
   
            console.log(data);
             
       }
       else{
         this.Message = data.Message;
       }
     },
     Error:(err:Error)=>
     {
       window.alert("ENTER VALID credetails");
      
     }
     
    });
}


}
