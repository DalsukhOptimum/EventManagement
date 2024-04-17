import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ɵafterNextNavigation } from '@angular/router';
import { APICallService } from '../api-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: any;
  Message: any;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private service: APICallService, private router: Router) {
    this.service.flag = false;
  }

  ngOnInit(): void {
    console.log("here i am ");
    this.userForm = this.formBuilder.group({

      Email: ['', [Validators.required, Validators.pattern(this.service.EmailReg)]],
      Password: ['', Validators.required],
      Flag: ['', Validators.required],

    });
    console.log("i am also at end");
  }

  submitForm(): void {
    console.log("i am in submit form");
    this.submitted = true;
    console.log(this.userForm);

    if (this.userForm?.valid) {
      
      this.service.callMethod('Login', this.userForm.value).subscribe(
        {
          //when user is loging in setting it's  role and isloggedin as true in session storage 
          next: (data: any) => {
            if (data.ID != 0) {
              sessionStorage.clear();

               this.service.IsloggedIn = true ;
              console.log(data.ID);
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
             
              this.service.flag = true;
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
