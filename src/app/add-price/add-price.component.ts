import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEntity } from '../Models/EventEntity';
import { ActivityEntity } from '../Models/ActivityEntity';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})
export class AddPriceComponent {
       Message!:any ;
       EventData!:EventEntity[];
       ActivityData!:any;
       haveEvent:boolean  = false ;
      userForm: any;
       submitetd!:any ;
       haveActivity:boolean = false ;
      

       constructor( private service:APICallService,private formBuilder: FormBuilder)
       {
         
       }

  ngOnInit(): void {
    this.Message = null ;
    console.log(this.ActivityData);

    let obj = {
      Flag:"AdminEvents"
    }
    this.service.callMethod('showEventOrActivity',obj).subscribe(
    {
     next: (data:any)=>{
       if(data.ID != 0)
       {
           this.EventData = data.ArrayOfResponse;
            this.haveEvent = true ;
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

    this.userForm = this.formBuilder.group({
      EventId:['', Validators.required],
      ActivityId: ['', Validators.required],
      Price: ['', Validators.required],
    });
    

  }


  EventChange()
  {
    this.ActivityData = null;
    this.Message = null;
  console.log("aaya chhe");

  let obj = {
    EventId:this.userForm.value.EventId ,
    Flag:"ActibityShow"
  }

  this.service.callMethod('showEventOrActivity',obj).subscribe(
    {
     next: (data:any)=>{
       if(data.ID != 0)
       {
           this.ActivityData = data.ArrayOfResponse;
           this.haveActivity = true ;
            console.log(data);
             
       }
       else{
         this.Message = data.Message;
         this.userForm.reset(this.userForm.value);
         this.userForm.reset();
      
       }
     },
     Error:(err:Error)=>
     {
       window.alert("ENTER VALID credetails");
      
     }
     
    });



      
  }

  submitForm(): void {
    this.submitetd = true ;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);

   if (this.userForm?.valid) {
  

    let at = new ActivityEntity();

   // at.EventId = this.userForm.value.EventId ;
    let obj = {
      ActivityId:this.userForm.value.ActivityId ,
      Price:this.userForm.value.Price,
      Flag:"AddPrice"
    }
  console.log("ok");
   //   console.log('Form data:', this.userForm.value);
      //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
     this.service.callMethod('PublishOrAddPrice',obj).subscribe(
      {
       next: (data:any)=>{
       
         
           this.Message = data.Message;
           this.userForm.reset();
           this.submitetd = false ;
           
         
       },
       Error:(err:Error)=>
       {
         window.alert("ENTER VALID credetails");
         this.userForm.reset(this.userForm.value);
         this.userForm.reset();
           this.submitetd = false ;
       }
       
      }
       );
      
   }

  }
}  


