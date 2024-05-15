import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ɵafterNextNavigation } from '@angular/router';
import { APICallService } from '../api-call.service';
import { EventService } from '../event.service';
import {faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  checkIcon = faCheck;
  UncheckIcon = faXmark;
  userForm: any;
  //after clicking on submit we will set it to true 
  submitted = false;

  IsOTP= false ;

  OTPMessage!:string ;

  OTPverifies = false ;
  //Previously checked Main

  Email!:string ;

  showTextfield = false ;
  Message!: string;


  constructor(public eventServiec: EventService, private formBuilder: FormBuilder, private service: APICallService, private router: Router) {

  }

  ngOnInit(): void {
  sessionStorage.clear();
  this.eventServiec.IsloggedIn = false ;
    this.userForm = this.formBuilder.group({

      Email: ['', [Validators.required, Validators.pattern(this.eventServiec.EmailReg)]],
      Password: ['', [Validators.required, Validators.pattern(this.eventServiec.PasswordReg)]],
      Flag: ['', Validators.required],
      OTP:['', Validators.required]

    });

  }


  ShowInbox(){
    if((!this.userForm?.get('Email').errors?.required) && !this.userForm?.get('Email').errors?.pattern) 
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
       "Email":this.userForm.value.Email,
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
       "Email":this.userForm.value.Email,
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
               this.Email = this.userForm.value.Email;
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


  //calling Login API
  submitForm(): void {

   
    this.submitted = true ;

    if(!this.OTPverifies)
      {
        this.Message ="first verify the OTP";
         this.submitted = false;
        return;
      }

      if(this.userForm.value.Email != this.Email)
        {
          this.Message ="please don't change Email verify again";
          this.OTPverifies = false ;
           this.submitted = false;
          return;
        }


    if (this.userForm?.valid) {

      //calling Login API.
      this.service.LoginAdminOrUser(this.userForm.value).subscribe(
        {
          //when user is loging in setting it's  role and isloggedin as true in session storage 
          next: (data: any) => {
            if (data.ID == 1) {

              //first loging out if someone is already login 
              sessionStorage.clear();
              // if login of user so set role as admin otherwise user in session storage 
              this.eventServiec.IsloggedIn = true;
              if (this.userForm.value.Flag == "AdminLogin") {
                sessionStorage.setItem('Role', "Admin");
                sessionStorage.setItem('IsLoggedIn', String(true));
                this.router.navigate(["/AdminDashboard"]);
              }
              else {
                sessionStorage.setItem('Role', "User");
                sessionStorage.setItem('IsLoggedIn', String(true));
                this.router.navigate(["/User-Dashboard"]);
              }






            }
            else if (data.ID == 0) {
              alert(data.Message);
            }
            else {
              alert(data.Message);
            }

            this.userForm.reset();
            this.submitted = false;
          },
          Error: (err: Error) => {
            window.alert("ENTER VALID credetails");
            this.userForm.reset(this.userForm.value);
            this.userForm.reset();
            this.submitted = false;

          }


        }
      );
    }
  }

}
