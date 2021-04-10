import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule,JwtModuleOptions } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import {  ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';

import { AlertsModule } from 'angular-alert-module';
const JWT_Module_Options: JwtModuleOptions = {
  config: {

  }
};
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_Module_Options),
        AlertsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
