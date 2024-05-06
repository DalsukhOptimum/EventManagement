import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
import { EventService } from '../event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent {
  Message!: string;
  EventData!: EventEntity[];

  //for how many boxes to show based upon selected month
  MOnthDay:any = 31 ;
  constructor(private service:APICallService,private eventServiec:EventService,private router:Router)
  {

  }
  ngOnInit(): void {
   
    
    //this.EventFetch(1);
    
 
  }
  //return an array of number till the number we pass to this
  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  //fetching the Event of particular month 
  EventFetch(month:number)
  {

    this.Message = "";

    let obj = {
      Month:month
    }
    this.service.Calander(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            this.EventData = data.ArrayOfResponse;
            console.log(this.EventData);

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

 
  //fetching an month from drop down and call the API for fetching that particular month data and also set month days based on selected month
  ChageYear()
  {
    
    var num = parseFloat((<HTMLInputElement>document.getElementById("Flag")).value);
     this.EventData = [];
     //for february
     if(num == 2 )
      {
        this.MOnthDay = 29 ;
      }
    else if(num == 1 || num == 3 || num == 5 || num == 7 ||  num == 8 ||   num == 10 ||  num == 12)
      {
        this.MOnthDay = 31 ;
      }
      else{
        this.MOnthDay = 30 ; 
      }
      
     this.EventFetch(num);



  }

  toNumber(day:string):number
  {
    return parseInt(day.slice(0,2))
  }

  load(index:number)
  {
    this.eventServiec.EventDataService = this.EventData[index];
    console.log("this is in function ", this.EventData[index]);
  
    // if(!confirm("You are User? If not user and click on yes you will be logged out"))
    //   {
    //        return ;
    //   }
  
    this.router.navigate(["/Event-Detail"]);
  }

   
}
