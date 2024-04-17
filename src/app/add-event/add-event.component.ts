import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  //setting up date here for min and max date in date input
  d = new Date().toISOString().slice(0, 10);
  Base64!: string;

  

  //this is the function for converting image to base64
  submit(event: any) {
    console.log(event);
    const file = event.target.files[0];
    this.userForm.get('Image').setErrors(null);
    console.log(file);
    //checking Imaeg Type 
    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" || event.target.files[0].type == "image/svg+xml") {

      if (event.target.files[0].size > 5000) {
        const reader = new FileReader();

        reader.onload = () => {
          const base64: string = reader.result as string;
          console.log("i am inside");



          console.log(base64.split(',')[1]);
          this.Base64 = base64.split(',')[1];
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
  
      //ifnot in prefered size so set an error
      else {
        this.userForm.get('Image').setErrors({ sizeExceeded: true });
        alert("please select file which have size less than 500kb");

      }

    }
       //if not valid type so generating an error of invalid type
    else {
      alert("please select valid type.. Jpeg,png or svg");
      this.userForm.get('Image').setErrors({ invalidTye: true });
      this.userForm.value.image = null;
    }

    console.log("i am outside");

  }


  userForm: any;
  //message which is coming from api we will store that in this message variable 
  Message: any;
  Id!: number;


  //at the initial we set and flag as false when we wills ubit it we will set it as true 
  submitetd = false;
  constructor(private formBuilder: FormBuilder, public service: APICallService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.d);
    this.userForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern(this.service.NameReg)]],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Image: ['', Validators.required],
    });


  }


  submitForm(): void {
    console.log(this.userForm);
    this.submitetd = true;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);

    //making an object for sending in API
    let ev = new EventEntity();

    ev.Name = this.userForm.value.Name;
    ev.Description = this.userForm.value.Description;
    ev.StartDate = this.userForm.value.StartDate;
    ev.EndDate = this.userForm.value.EndDate;
    ev.Image = this.Base64
    ev.ImageType = this.userForm.value.Image.toString().split('.')[1]

   


   //checking form validation and then calling the API.
    if (this.userForm?.valid) {

      this.service.callMethod('AddEvent', ev).subscribe(
        {
          next: (data: any) => {


            this.Message = data.Message;
            this.userForm.reset();
            this.submitetd = false;

          },
          Error: (err: Error) => {
            window.alert("ENTER VALID credetails");
            this.userForm.reset(this.userForm.value);
            this.userForm.reset();
            this.submitetd = false;
          }

        }
      );

    }
  }
}

