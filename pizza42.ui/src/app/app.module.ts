import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { CallbackComponent } from './callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, OrderComponent, CallbackComponent, ProfileComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(AppRoutes), ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
