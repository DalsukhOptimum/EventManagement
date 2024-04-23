import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
// import { FormBuilder, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityEntity } from '../Models/ActivityEntity';
import { startWith } from 'rxjs';
import { EventService } from '../event.service';


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  //this haveevent will check whether there is EventData or not 
  haveEvent: boolean = false;
  Response!: string;
  //this is for showing message to the user 
  Message!: string;
  //in submit form we true this variable and then we show the errors to the user
  submitetd!: any;
  //this is for showing minimum and maximum date to the user
  min!: any;
  max!: any;
  //this is event data from which user wills elect ane event 
  EventData!: EventEntity[]
  userForm: any;

  constructor(public eventServiec:EventService,public service: APICallService, private formBuilder: FormBuilder) {

  }


  //this is called when event dropdown is change first time it is called in ngoninit
  chnageevent() {
    let Id = this.userForm.value.EventId;

    //selecting an event which user select and then format it's date in yyy-mm-dd for setting min and max 
    this.EventData.forEach(element => {
      if (element.EventId == Id) {
        this.min = element.StartDate.toString().substring(0, 10).split('-').reverse().join('-') + "T00:00";
        this.max = element.EndDate.toString().substring(0, 10).split('-').reverse().join('-') + "T00:00";
      }
    });
  }


  ngOnInit(): void {
    //fetching evenets in the ngonintit and showing in dropdown
    let obj = {
      Flag: "AdminEvents"
    }
    this.service.showEventOrActivity(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            this.EventData = data.ArrayOfResponse;

          }
          else if(data.ID == 0) {
            this.Message = data.Message;
          }
          else{
            this.Message = "someting went wrong";
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });
    this.userForm = this.formBuilder.group({
      EventId: ['', Validators.required],
      Name: ['', [Validators.required, Validators.pattern(this.eventServiec.NameReg)]],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],

    });


  }
  submitForm(): void {
    this.submitetd = true;

    //making the ACtivity object and then send in the API call
    let at = new ActivityEntity();
    at.Name = this.userForm.value.Name
    at.Description = this.userForm.value.Description
    at.StartDate = this.userForm.value.StartDate
    at.EndDate = this.userForm.value.EndDate
    at.Name = this.userForm.value.Name
    at.EventId = this.userForm.value.EventId

    //check the validation for the form and the call the API.
    if (this.userForm?.valid) {

      this.service.AddActivity(at).subscribe(
        {
          next: (data: any) => {

              //setting an message wgich is coming from backend API.
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
