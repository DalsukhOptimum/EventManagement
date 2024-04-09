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
   regex = new RegExp("^[a-zA-Z ]+$");
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private service:APICallService,private router:Router) {}

  ngOnInit(): void {
    console.log("here i am ");
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.regex)]],
     // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Password:['', Validators.required]
    });
    console.log("i am also at end");
  }

  submitForm(): void {
    debugger
    this.submitted = true ;
    console.log("i am in submit form");
    let body = {
      "Email":"ok@gmail.com"
    };
    console.log(this.userForm);
    if (this.userForm?.valid) {
   //   console.log('Form data:', this.userForm.value);
      //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
     this.service.callMethod('RegisterUser',this.userForm.value).subscribe(
      {
        
       next: (data:any)=>{
         
            console.log(data.ID);
            this.Message = data.Message;
            // this.router.navigateByUrl(`/DashBoard?Id=${data.ID}`);
          //   this.router.navigate(["/DashBoard"], {
          //    queryParams: {Id: data.Message }
          //  });
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
