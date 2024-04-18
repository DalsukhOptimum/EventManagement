import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ɵafterNextNavigation } from '@angular/router';
import { APICallService } from '../api-call.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  userForm: any;
  // for storing message which will be coming from backend
  Message: any;
  //after clicking on submit we will set it to true 
  submitted = false;


  constructor(public eventServiec:EventService,private formBuilder: FormBuilder, private service: APICallService, private router: Router) {
   
  }

  ngOnInit(): void {
  
    this.userForm = this.formBuilder.group({

      Email: ['', [Validators.required, Validators.pattern(this.eventServiec.EmailReg)]],
      Password: ['', Validators.required],
      Flag: ['', Validators.required],

    });
  
  }

  //calling Login API
  submitForm(): void {

    this.submitted = true;
    console.log(this.userForm);

    if (this.userForm?.valid) {
      
      //calling Login API.
      this.service.ApiCall('Login', this.userForm.value).subscribe(
        {
          //when user is loging in setting it's  role and isloggedin as true in session storage 
          next: (data: any) => {
            if (data.ID != 0) {

              //first loging out if someone is already login 
              sessionStorage.clear();
                 // if login of user so set role as admin otherwise user in session storage 
               this.eventServiec.IsloggedIn = true ;
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
              this.Message = data.Message;
             
            
              this.userForm.reset();
              this.submitted = false;



            }
            else {
              this.Message = data.Message;
            }
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
