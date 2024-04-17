import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {

  constructor(private route:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
  //first check that whether user or admin is loggedin or not if not so returning it from here 
      if(!sessionStorage.getItem('IsLoggedIn'))
        {
          this.route.navigate(['/Login']);
          return false ;
        }

        // if component is for  user and login role is user so it will return true  
      if(sessionStorage.getItem('Role') == "User" && route.data['role'] == 'User')
        {
          return true ;
        }

          // if component is for  Admin  and login role is Admin so it will return true  
      if(sessionStorage.getItem('Role') == "Admin" && route.data['role'] == 'Admin')
        {
          return true ;
          
        }

        //in all other cases it will return an false and re direct it to the Admin Login
        this.route.navigate(['/Login']);
        return false ;

  }
  
}
