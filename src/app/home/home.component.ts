import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  val=1 ;
  constructor(private router:Router)
  {

  }

  //this is for going in the Login page
  nextpage(){
    this.router.navigate(['/Login']);
  }

}
