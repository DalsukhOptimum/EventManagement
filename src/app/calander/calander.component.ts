import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';


@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent {
  Message!: string;
  EventData!: EventEntity[];
  MOnthDay:any = 31 ;
  constructor(private service:APICallService)
  {

  }
  ngOnInit(): void {
   
    
    //this.EventFetch(1);
    
 
  }
  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

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

  // get_department(event: HTMLSelectElement) {
  //   var selected_box = event.target.value;
  
  //   console.log(selected_box);
  // }
  ChageYear()
  {
    // let myDiv = <HTMLElement>document.getElementById("Flag")
    var num = parseFloat((<HTMLInputElement>document.getElementById("Flag")).value);
     this.EventData = [];
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

   
}
