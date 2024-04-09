import { Component } from '@angular/core';
import { APICallService } from '../api-call.service';
import { EventEntity } from '../Models/EventEntity';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {
  Message!: any;
  EventData!: EventEntity[];
  haveEvent: boolean = false;
  userForm: any;
  submitetd = false;
  constructor(private service: APICallService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.Message = null;

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
    });


  }

  submitForm(): void {
    this.submitetd = true;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);







    if (this.userForm?.valid) {


      // at.EventId = this.userForm.value.EventId ;
      let obj = {
        EventId: this.userForm.value.EventId,
        Flag: "Publish"
      }
      console.log("ok");
      //   console.log('Form data:', this.userForm.value);
      //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
      this.service.callMethod('PublishOrAddPrice', obj).subscribe(
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
