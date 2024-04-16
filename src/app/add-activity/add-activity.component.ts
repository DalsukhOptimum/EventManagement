import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
// import { FormBuilder, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityEntity } from '../Models/ActivityEntity';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  haveEvent: boolean = false;
  Response!: string;
  Message!: string;
  submitetd!: any;
  min!: any;
  max!: any;
  EventData!: EventEntity[]
  userForm: any;
  regex = new RegExp("^[a-zA-Z ]+$");
  constructor(public service: APICallService, private formBuilder: FormBuilder) {

  }


  chnageevent() {
    let Id = this.userForm.value.EventId;

    this.EventData.forEach(element => {
      if (element.EventId == Id) {
        this.min = element.StartDate.toString().substring(0, 10).split('-').reverse().join('-') + "T00:00";
        this.max = element.EndDate.toString().substring(0, 10).split('-').reverse().join('-') + "T00:00";
      }
    });

    console.log("this is start", this.min);
    console.log("this is end", this.max);

  }


  ngOnInit(): void {

    let obj = {
      Flag: "AdminEvents"
    }
    this.service.callMethod('showEventOrActivity', obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID != 0) {
            this.EventData = data.ArrayOfResponse;
            this.haveEvent = true;
            console.log(data);

          }
          else {
            this.Message = data.Message;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });





    this.userForm = this.formBuilder.group({
      EventId: ['', Validators.required],
      Name: ['', [Validators.required, Validators.pattern(this.regex)]],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],

    });


  }
  submitForm(): void {
    this.submitetd = true;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);





    // console.log(this.userForm);
    let at = new ActivityEntity();
    at.Name = this.userForm.value.Name
    at.Description = this.userForm.value.Description
    at.StartDate = this.userForm.value.StartDate
    at.EndDate = this.userForm.value.EndDate
    at.Name = this.userForm.value.Name
    at.EventId = this.userForm.value.EventId



    let startYear: number = this.userForm.value.StartDate.substring(0, 4);
    let startMonth: number = this.userForm.value.StartDate.substring(5, 7);
    let startDate: number = this.userForm.value.StartDate.substring(8, 10);
    console.log(startMonth);


    let endtYear: number = this.userForm.value.EndDate.substring(0, 4);
    let endtMonth: number = this.userForm.value.EndDate.substring(5, 7);
    let endtDate: number = this.userForm.value.EndDate.substring(8, 10);
    console.log(endtMonth);

    if (((startDate > endtDate) && (startMonth <= endtDate) && (startYear <= endtYear)) || ((startMonth > endtMonth) && (startYear >= endtYear))) {
      console.log("aaya chhu");
      this.userForm.get('EndDate').setErrors(null);
      this.userForm.get('StartDate').setErrors(null);
      this.userForm.get('EndDate').setErrors({ InvalidDateRange: true });
    }





    if (this.userForm?.valid) {

      //   console.log('Form data:', this.userForm.value);
      //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
      this.service.callMethod('AddActivity', at).subscribe(
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
