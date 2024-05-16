import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  checkIcon = faCheck;
  UncheckIcon = faXmark;
  userForm: any;
  //this is for storing message coming from API.
  Message:any;
  //we will set it true in the submit form 
  submitted=false ;
  //Is Otp field to show
  IsOTP= false ;

  OTPMessage!:string ;

  OTPverifies = false ;
  //Previously checked Main

  Email!:string ;

  showTextfield = false ;

  constructor(public eventServiec:EventService,private formBuilder: FormBuilder,private http:HttpClient,private service:APICallService,private router:Router) {}


 

  ngOnInit(): void {
   
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.eventServiec.NameReg)]],
      email: ['', [Validators.required,Validators.pattern(this.eventServiec.EmailReg)]],
      address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100),Validators.pattern(this.eventServiec.AddressReg)]],
      mobile: ['', [Validators.required, Validators.pattern(this.eventServiec.PhoneReg)]],
      Password:['', [Validators.required, Validators.pattern(this.eventServiec.PasswordReg)]],
      OTP:['', Validators.required]
    });
   
  }

  ShowInbox(){
   if((!this.userForm?.get('email').errors?.required) && !this.userForm?.get('email').errors?.pattern) 
    {
          this.showTextfield = true ;
    }
    else{

      this.showTextfield = false ;
    }
  }

  GenerateOTP(){
    this.IsOTP=false ;
    let obj = {
      "Email":this.userForm.value.email,
      "Name":"OTP"
    }
    this.service.OTPGeneration(obj).subscribe(
      {
        
       
        next: (data:any)=>{
         
          if(data.ID == 1)
            {
              this.IsOTP = true ;
              
            }
          //setting message which is coming from API.
          else if(data.ID == 0)
            {
              this.IsOTP = false ;
              console.log(data);
              this.OTPMessage = data.Message;
            }
          else{
            this.IsOTP = false ;
            this.OTPMessage ="something went wrong";
          }
          setTimeout(() => {
            this.Message = "";
            this.OTPMessage= ""
          }, 3000);
         
       },
       Error:(err:Error)=>
       {
         window.alert("ENTER VALID credetails");
    
       }
       
      }
       );
   
  }

  VerifyOTP()
  {
    let obj = {
      "Email":this.userForm.value.email,
      "OTP":this.userForm.value.OTP
    }
    this.service.EmailVerification(obj).subscribe(
      {
        
        
        next: (data:any)=>{
         
          if(data.ID == 1)
            {
              
              this.OTPMessage = data.Message;
              this.OTPverifies = true ;
              this.IsOTP = false ;
              this.Email = this.userForm.value.email;
            }
          //setting message which is coming from API.
          else if(data.ID == 0)
            {
              console.log(data);
              this.OTPMessage = data.Message;
              this.IsOTP = false ;
              this.userForm.controls['OTP'].reset()
            }
          else{
            this.OTPMessage ="something went wrong";
            this.IsOTP = false ;
             this.userForm.controls['OTP'].reset()
           
          }
          setTimeout(() => {
            this.Message = "";
            this.OTPMessage= ""
           
          }, 5000);;
            
       },
       Error:(err:Error)=>
       {
         window.alert("ENTER VALID credetails");
    
       }
       
      }
       );
  }

  submitForm(): void {
   
    this.submitted = true ;

    if(!this.OTPverifies)
      {
        this.submitted = false;
        this.Message ="first verify the Email";
        
        return;
      }

      if(this.userForm.value.email != this.Email)
        {
          this.Message ="please don't change Email verify again";
          this.OTPverifies = false ;
          this.submitted = false;
          return;
        }
    

    if (this.userForm?.valid) {
  //checking the form validation and then send an APi request in API.

  this.service.RegisterUser(this.userForm.value).subscribe(
    {
      
   
      next: (data:any)=>{
       
        //setting message which is coming from API.
        if(data.ID != -1)
          {
            console.log(data);
            this.Message = data.Message;
          }
        else{
          this.Message ="something went wrong";
        }
        setTimeout(() => {
          this.Message = "";
        }, 3000);
          
         
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
