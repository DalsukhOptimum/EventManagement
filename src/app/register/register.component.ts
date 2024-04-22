import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  userForm: any;
  //this is for storing message coming from API.
  Message:any;
  //we will set it true in the submit form 
  submitted=false ;

  constructor(public eventServiec:EventService,private formBuilder: FormBuilder,private http:HttpClient,private service:APICallService,private router:Router) {}

  ngOnInit(): void {
   
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.eventServiec.NameReg)]],
      email: ['', [Validators.required,Validators.pattern(this.eventServiec.EmailReg)]],
      address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
      mobile: ['', [Validators.required, Validators.pattern(this.eventServiec.PhoneReg)]],
      Password:['', Validators.required]
    });
   
  }

  submitForm(): void {
   
    this.submitted = true ;
    if (this.userForm?.valid) {
  //checking the form validation and then send an APi request in API.

     this.service.RegisterUser(this.userForm.value).subscribe(
      {
        
     
        next: (data:any)=>{
         
          //setting message which is coming from API.
          if(data.ID != -1)
            {
              this.Message = data.Message;
            }
          else{
            this.Message ="something went wrong";
          }
            
           
          this.userForm.reset();
           this.submitted = false ;
         
       },
       Error:(err:Error)=>
       {
         window.alert("ENTER VALID credetails");
         this.userForm.reset(this.userForm.value);
         this.userForm.reset();
           this.submitted = false ;
       }
       
      }
       );
       
    
    }
  }





}
