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
   
  Base64!:string ;

  submit (event:any)
  {
    console.log(event);
    const file = event.target.files[0];
    console.log(file);
if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" || event.target.files[0].type == "image/svg")
{

  if(event.target.files[0].size == 500)
    {
      const reader = new FileReader();

      reader.onload = () =>{
        const base64:string = reader.result as string ;
        console.log("i am inside");
    
    
    
        console.log(base64.split(',')[1]);
        this.Base64 = base64.split(',')[1];
      };
    
      if(file)
      {
        reader.readAsDataURL(file);
      }
    }

    else{
      this.userForm.get('Image').invalid = true ;
      alert("please select file which have size less than 500kb");
    
    }

}
else{
    alert("please select valid type.. Jpeg,png or svg");
    this.userForm.get('Image').invalid = true ;
    this.userForm.value.image = null;
}
   
    console.log("i am outside");

  }


   userForm: any;
  Message:any;
  Id!:number;

  Flag:boolean= false ;
  submitetd = false ;
  constructor(private formBuilder: FormBuilder,private service:APICallService,private route:ActivatedRoute,private router:Router) 
  {
    // this.Flag = this.service.flag ;

    // if(!this.Flag)
    // {
    //   this.router.navigate(["/Home"]);
    // }
  }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Image :['', Validators.required],
    });
    
   
  }

   
  submitForm(): void {
    console.log(this.userForm);
    this.submitetd = true ;
    console.log("i am in submit form");
    console.log(this.userForm.value);
    console.log(this.userForm.value.Image);

    //this.userForm.Email = this.route.snapshot.paramMap.get('Id')?.slice(1)!;
  //   console.log(this.route.snapshot.paramMap.get('Id'));
  //   console.log(this.userForm.value);
  // console.log( this.route.snapshot.paramMap.get('Id')?.slice(1));
  //    this.Ex.Amount = this.userForm.Amount;
  //    this.Ex.Comment = this.userForm.Comment;
  //    this.Ex.CreditOrDebit = this.userForm.CreditOrDebit;
    // this.Ex.Email=  this.route.snapshot.paramMap.get('Id')?.slice(1);
  //   console.log( this.route.snapshot.paramMap.get('Id')?.slice(1));
  //  this.ex.Comment = this.userForm.Comment;
  //  this.ex.Amount = this.userForm.Amount ;
  //   this.ex.CreditOrDebit = this.userForm.CreditOrDebit ;
  //   this.ex.Email = this.route.snapshot.paramMap.get('Id')?.slice(1)!;

   

// console.log(this.userForm);
let ev = new EventEntity();

ev.Name = this.userForm.value.Name;
ev.Description = this.userForm.value.Description;
ev.StartDate = this.userForm.value.StartDate;
ev.EndDate = this.userForm.value.EndDate;
ev.Image = this.Base64
ev.ImageType = this.userForm.value.Image.toString().split('.')[1]

// const ev = new EventEntity(
//   0,
//   this.userForm.value.Name,
//   // this.route.snapshot.paramMap.get('Id')?.slice(1)!,
//   this.userForm.value.Description,
//   this.userForm.value.StartDate,
//   this.userForm.value.EndDate,
//   this.Base64,
//   "ok"
  
// ) 
  


   if (this.userForm?.valid) {
  
   //   console.log('Form data:', this.userForm.value);
      //this.http.post('https://localhost:44315/api/ExpenseManager/RegisterUser',this.userForm.value).subscribe((data)=>console.log(data));
     this.service.callMethod('AddEvent',ev).subscribe(
      {
       next: (data:any)=>{
       
         
           this.Message = data.Message;
           this.userForm.reset();
           this.submitetd = false ;
         
       },
       Error:(err:Error)=>
       {
         window.alert("ENTER VALID credetails");
         this.userForm.reset(this.userForm.value);
         this.userForm.reset();
           this.submitetd = false ;
       }
       
      }
       );
      
   }
  }
}

