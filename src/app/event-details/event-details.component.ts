import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder } from '@angular/forms';
import { EventEntity } from '../Models/EventEntity';
import { ActivityEntity } from '../Models/ActivityEntity';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  userForm:any
  Message: any;
  EventData!:EventEntity ;
  haveActivity: boolean = false;
  ActivityData!: ActivityEntity[];
  Base64Image!:string ;
  ImageType!:string ;
constructor( private service:APICallService,private formBuilder: FormBuilder)
{ 
  
}

ngOnInit(): void {
  console.log("this is about next line");
  console.log(this.service.EventDataService);
  this.EventData = this.service.EventDataService;
  this.Base64Image = this.service.EventDataService.Image;
  this.ImageType = this.service.EventDataService.ImageType ;
  console.log("this is base64" +this.Base64Image);
  let obj = {
    EventId:this.service.EventDataService.EventId,
    Flag:"ActibityShow"
  }
  
  this.service.callMethod('showEventOrActivity',obj).subscribe(
    {
     next: (data:any)=>{
       if(data.ID != 0)
       {
           this.ActivityData = data.ArrayOfResponse;
           console.log(this.ActivityData[0].Price);
           this.haveActivity = true ;
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
