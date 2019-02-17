import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';

import { HttpService } from './http.service'
import { AppComponent } from './app.component';

import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    DetailsComponent,
    UpdateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
  HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
