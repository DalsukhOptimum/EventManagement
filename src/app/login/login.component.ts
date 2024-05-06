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
  //after clicking on submit we will set it to true 
  submitted = false;


  constructor(public eventServiec: EventService, private formBuilder: FormBuilder, private service: APICallService, private router: Router) {

  }

  ngOnInit(): void {
  sessionStorage.clear();
  this.eventServiec.IsloggedIn = false ;
    this.userForm = this.formBuilder.group({

      Email: ['', [Validators.required, Validators.pattern(this.eventServiec.EmailReg)]],
      Password: ['', [Validators.required, Validators.pattern(this.eventServiec.PasswordReg)]],
      Flag: ['', Validators.required],

    });

  }

  //calling Login API
  submitForm(): void {

    this.submitted = true;


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
