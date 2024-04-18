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
  //we will store the message which is coming from backend 
  Message!: any;
  //array of Event object which is coming from API.
  EventData!: EventEntity[];

  //user form object for taking an data from html file 
  userForm: any;
  //setting up this to true when click on submit 
  submitetd = false;
  constructor(private service: APICallService, private formBuilder: FormBuilder) {

  }

  //it will fetch all the event which is pending to publish in ngoninit
  ngOnInit(): void {
    
   this.getEvents();
    this.userForm = this.formBuilder.group({
      EventId: ['', Validators.required],
    });


  }

  //this is function for fetching all the events
  getEvents()
  {
    this.Message = null;

    
    let obj = {
      Flag: "AdminEvents"
    }
    this.service.ApiCall('showEventOrActivity', obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID != 0) {
            //storing object of Event coming from API.
            this.EventData = data.ArrayOfResponse;
          }
          else {
            this.Message = data.Message;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });
  }

  //this is called for publish the Event
  submitForm(): void {
    this.submitetd = true;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);






  //checking form validation and then call the API.
    if (this.userForm?.valid) {


      // at.EventId = this.userForm.value.EventId ;
      let obj = {
        EventId: this.userForm.value.EventId,
        Flag: "Publish"
      }
      console.log("ok");
      this.service.ApiCall('PublishOrAddPrice', obj).subscribe(
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
