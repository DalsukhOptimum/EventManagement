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
   

      if(!sessionStorage.getItem('IsLoggedIn'))
        {
          this.route.navigate(['/Login']);
          return false ;
        }

      if(sessionStorage.getItem('Role') == "User" && route.data['role'] == 'User')
        {
          return true ;
        }

        
      if(sessionStorage.getItem('Role') == "Admin" && route.data['role'] == 'Admin')
        {
          return true ;
          
        }

        this.route.navigate(['/Login']);
        return false ;

  }
  
}
