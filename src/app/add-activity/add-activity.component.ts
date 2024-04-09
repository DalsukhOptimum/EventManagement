import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
// import { FormBuilder, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityEntity } from '../Models/ActivityEntity';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
   haveEvent:boolean = false;
   Response!:string ;
   Message!:string ;
   submitetd!:any ;
  EventData!:EventEntity[]
  userForm: any;
      constructor( private service:APICallService,private formBuilder: FormBuilder)
      {
        
      }


      ngOnInit(): void {

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
          Name: ['', Validators.required],
          Description: ['', Validators.required],
          StartDate: ['', Validators.required],
          EndDate: ['', Validators.required],
         
        });
        
       
      }
      submitForm(): void {
        this.submitetd = true ;
        console.log("i am in submit form");
        console.log(this.userForm.value);
        console.log(this.userForm.value.Image);
    
        //this.userForm.Email = this.route.snapshot.paramMap.get('Id')?.slice(1)!;
      //   console.log(this.route.snapshot.paramMap.get('Id'));
      //   console.log(this.userForm.value);
      // console.log( this.route.snapshot.paramMap.get('Id')?.slice(1));
      //    this.Ex.Amount = this.userForm.Amount;
      //    this.Ex.Comment = this.userForm.Comment;
      //    this.Ex.CreditOrDebit = this.userForm.CreditOrDebit;
        // this.Ex.Email=  this.route.snapshot.paramMap.get('Id')?.slice(1);
      //   console.log( this.route.snapshot.paramMap.get('Id')?.slice(1));
      //  this.ex.Comment = this.userForm.Comment;
      //  this.ex.Amount = this.userForm.Amount ;
      //   this.ex.CreditOrDebit = this.userForm.CreditOrDebit ;
      //   this.ex.Email = this.route.snapshot.paramMap.get('Id')?.slice(1)!;
    
       
    
    // console.log(this.userForm);
    let   at = new ActivityEntity();
    at.Name = this.userForm.value.Name
    at.Description = this.userForm.value.Description
    at.StartDate = this.userForm.value.StartDate
    at.EndDate = this.userForm.value.EndDate
    at.Name = this.userForm.value.Name
    at.EventId = this.userForm.value.EventId
    // const at = new ActivityEntity(
    //   0,
    //   this.userForm.value.Name,
    //   // this.route.snapshot.paramMap.get('Id')?.slice(1)!,
    //   this.userForm.value.Description,
    //   this.userForm.value.StartDate,
    //   this.userForm.value.EndDate,
    //   0,
    //   this.userForm.value.EventId ,
    //   "ok"
      
    // ) 
      
    
    
       if (this.userForm?.valid) {
      
       //   console.log('Form data:', this.userForm.value);
          //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
         this.service.callMethod('AddActivity',at).subscribe(
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
