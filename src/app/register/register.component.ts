import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APICallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  userForm: any;
  Message:any;
  submitted=false ;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private service:APICallService,private router:Router) {}

  ngOnInit(): void {
   
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.service.NameReg)]],
     // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required,Validators.pattern(this.service.EmailReg)]],
      address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
      mobile: ['', [Validators.required, Validators.pattern(this.service.PhoneReg)]],
      Password:['', Validators.required]
    });
   
  }

  submitForm(): void {
   
    this.submitted = true ;
    console.log("i am in submit form");
    let body = {
      "Email":"ok@gmail.com"
    };
    console.log(this.userForm);
    if (this.userForm?.valid) {
  //checking the form validation and then send an APi request in API.

     this.service.callMethod('RegisterUser',this.userForm.value).subscribe(
      {
        
     
        next: (data:any)=>{
         
          //setting message which is coming from API.
            console.log(data.ID);
            this.Message = data.Message;
           
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
