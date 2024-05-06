import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { publishFacade } from '@angular/compiler';
import { PublishComponent } from './publish/publish.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MyAuthGuard } from './my-auth.guard';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { CalanderComponent } from './calander/calander.component';

// sending roles accourding to the component if it is user's component so send user and if admin component so sending admin
const routes: Routes = [
  {
    path:"",component:HomeComponent, 
   },
{
 path:"Register",component:RegisterComponent, 
},
{
  path:"Login",component:LoginComponent, 
},
{
  path:"AddEvent",component:AddEventComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"AddActivity",component:AddActivityComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"AddPrice",component:AddPriceComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"Publish",component:PublishComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"AdminDashboard",component:AdminDashboardComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"User-Events",component:UserEventsComponent
},
{
  path:"Event-Detail",component:EventDetailsComponent, canActivate:[MyAuthGuard],data: { role: 'UserAdmin'}
},
{
  path:"Admin-Event",component:AdminEventsComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"Update-Event",component:UpdateEventComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' }
},
{
  path:"User-Dashboard",component:UserDashboardComponent, canActivate:[MyAuthGuard],data: { role: 'User' }
},
{
  path:"Home",component:HomeComponent,
},

{ path: "calander", component:CalanderComponent, canActivate:[MyAuthGuard],data: { role: 'Admin' } },

{ path: "**", redirectTo: "Login" },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
