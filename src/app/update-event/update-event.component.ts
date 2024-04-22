import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APICallService } from '../api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEntity } from '../Models/EventEntity';
import { EventService } from '../event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {

  //this is for storing Event object coming from Service
  EventDataFromService!: EventEntity;
  //this is for storing base64 string 
  Base64!: string;
  //this is for storing minimum and maximum dates 
  d = new Date().toISOString().slice(0, 10);

  userForm: any;
  //this is for stroing message comming from API.
  Message: any;
  Id!: number;

//we will set it yrue after clicking on submit button 
  submitetd = false;

  //for converting image to base64
  submit(event: any) {
    console.log(event);
    const file = event.target.files[0];
    this.userForm.get('Image').setErrors(null);
    console.log(file);
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

      else {
        //if size is above 5000kb so we will set an Error
        this.userForm.get('Image').setErrors({ sizeExceeded: true });
        alert("please select file which have size less than 500kb");

      }

    }
    else {
      //if image type is not valid we will show an error
      alert("please select valid type.. Jpeg,png or svg");
      this.userForm.get('Image').setErrors({ invalidTye: true });
      this.userForm.value.image = null;
    }

    console.log("i am outside");

  }


  
  constructor(public eventServiec:EventService,private formBuilder: FormBuilder, public service: APICallService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.userForm);

    this.EventDataFromService = this.eventServiec.EventDataService;
    if(!this.EventDataFromService)
      {
        this.router.navigate(['/AdminDashboard"']);
      }
    

    this.userForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern(this.eventServiec.NameReg)]],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Image: [],
    });
 
      //setting up an Event Start And End Date before updated for that converting Date formats
    this.userForm.get('StartDate').setValue(this.eventServiec.EventDataService.StartDate.substring(0, 10).split('-').reverse().join('-'));
    this.userForm.get('EndDate').setValue(this.eventServiec.EventDataService.EndDate.toString().substring(0, 10).split('-').reverse().join('-'));
  }


  submitForm(): void {
    console.log(this.userForm);
    this.submitetd = true;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);


    // making event entity for sending in an API.
    let ev = new EventEntity();
    ev.EventId = this.EventDataFromService.EventId;
    ev.Name = this.userForm.value.Name;
    ev.Description = this.userForm.value.Description;
    ev.StartDate = this.userForm.value.StartDate;
    ev.EndDate = this.userForm.value.EndDate;
    ev.Image = (this.userForm.value.image == null) ? this.EventDataFromService.Image : this.Base64
    ev.ImageType = (this.userForm.value.image == null) ? this.EventDataFromService.ImageType : this.Base64.toString().split('.')[1]




  
    if (this.userForm?.valid) {
      this.service.UpdateEvent(ev).subscribe(
        {
          next: (data: any) => {
           if(data.ID != -1)
            {
              this.Message = data.Message;
            }
            else{
              this.Message = "somethng went wrong";
            }

            
            //reseeting the form after clicking 
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
  chnage()

  {
    alert("");
  }
}
