import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  checkIcon = faCheck;
  UncheckIcon = faXmark;
  userForm: any;
  //after clicking on submit we will set it to true 
  submitted = false;

  UserExistsFlag!:string ; 

  IsOTP = false;

  OTPMessage!: string;

  OTPverifies = false;
  //Previously checked Main

  Email!: string;

  showTextfield = false;
  Message!: string;

  IsExist = false ;


  constructor(public eventServiec: EventService, private formBuilder: FormBuilder, private service: APICallService, private router: Router) {

  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.eventServiec.IsloggedIn = false;
    this.userForm = this.formBuilder.group({

      Email: ['', [Validators.required, Validators.pattern(this.eventServiec.EmailReg)]],
      Password: ['', [Validators.required, Validators.pattern(this.eventServiec.PasswordReg)]],
      OTP: ['', Validators.required]

    });

  }


  ShowInbox() {
    if ((!this.userForm?.get('Email').errors?.required) && !this.userForm?.get('Email').errors?.pattern) {
      this.showTextfield = true;
    }
    else {

      this.showTextfield = false;
    }
  }

  GenerateOTP() {

    this.IsOTP = false;
   
    console.log("in the generate method",this.IsExist);

    if(this.IsExist == false)
      {
        this.OTPMessage = "something went wrong";
        return ;
      }

    let obj = {
      "Email": this.userForm.value.Email,
      "Name": "OTP"
    }
    this.service.OTPGeneration(obj).subscribe(
      {

          
        next: (data: any) => {

          if (data.ID == 1) {
            this.IsOTP = true;

          }
          //setting message which is coming from API.
          else if (data.ID == 0) {
         
            this.IsOTP = false;
            console.log(data);
            this.OTPMessage = data.Message;
          }
          else {
            this.IsOTP = false;
            this.OTPMessage = "something went wrong";
          }
          setTimeout(() => {
            this.Message = "";
            this.OTPMessage = ""
          }, 3000);

        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      }
    );

  }

  VerifyOTP() {
    let obj = {
      "Email": this.userForm.value.Email,
      "OTP": this.userForm.value.OTP
    }
    this.service.EmailVerification(obj).subscribe(
      {


        next: (data: any) => {

          if (data.ID == 1) {

            this.OTPMessage = data.Message;
            this.OTPverifies = true;
            this.IsOTP = false;
            this.Email = this.userForm.value.Email;
          }
          //setting message which is coming from API.
          else if (data.ID == 0) {
            console.log(data);
            this.OTPMessage = data.Message;
            this.IsOTP = false;
            this.userForm.controls['OTP'].reset()
          }
          else {
            this.OTPMessage = "something went wrong";
            this.IsOTP = false;
            this.userForm.controls['OTP'].reset()


          }
          setTimeout(() => {
            this.Message = "";
            this.OTPMessage = ""

          }, 5000);;

        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      }
    );
  }

  UserExists() {

    
    //this.submitted = true;

    if ((!this.userForm?.get('Email').errors?.required) && !this.userForm?.get('Email').errors?.pattern) {
       let obj ={
         "Email":this.userForm.value.Email,
         "Flag":"UserExists"
       }
      this.service.LoginAdminOrUser(obj).subscribe(
        {
          //when user is loging in setting it's  role and isloggedin as true in session storage 
          next: (data: any) => {
            if (data.ID == 1) {
                 //this.Message = data.Message ;
                 this.IsExist = true; 
                 this.GenerateOTP();
                 console.log(`Isexist: ${this.IsExist}, "Data: ${data.ID}`)
                 
            }
            else if (data.ID == 0) {
              //this.Message = data.Message
              this.IsExist = false; 
              this.OTPMessage =data.Message;
              console.log("this is in next page");
            }
            else {
              this.IsExist = false;
              this.OTPMessage = "something went wrong";
            }

            //this.userForm.reset();
            //this.submitted = false;
          },
          Error: (err: Error) => {
            // window.alert("ENTER VALID credetails");
            // this.userForm.reset(this.userForm.value);
            // this.userForm.reset();
            this.submitted = false;

          }


        }
       
      );



    }
  }

  submitForm(): void {
   

    this.submitted = true ;

    if(!this.OTPverifies)
      {
        this.submitted = false;
        this.Message ="first verify the OTP";

        setTimeout(() => {
          this.Message = "";
        }, 3000);
        
        return;
      }

      if(this.userForm.value.Email != this.Email)
        {
          this.Message ="please don't change Email verify again";
          this.OTPverifies = false ;
          this.submitted = false;
          return;
        }

   let obj = {
    "Email":  this.userForm.value.Email,
    "Password":this.userForm.value.Password,
    "Flag":"UpdatePassword"
   }
    

    if (this.userForm?.valid) {
  //checking the form validation and then send an APi request in API.

  this.service.LoginAdminOrUser(obj).subscribe(
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
