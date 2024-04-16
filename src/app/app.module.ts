import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { PublishComponent } from './publish/publish.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddEventComponent,
    AddActivityComponent,
    AddPriceComponent,
    PublishComponent,
    AdminDashboardComponent,
    UserEventsComponent,
    EventDetailsComponent,
    AdminEventsComponent,
    UpdateEventComponent,
    UserDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
