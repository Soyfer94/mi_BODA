import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RsvpComponent } from './rsvp/rsvp.component'; // si existe este componente




@NgModule({
  
  imports: [
    BrowserModule,
    HttpClientModule, // <-- AGREGALO AQUÍ
    FormsModule, // si usás [(ngModel)]
    AppComponent,  // IMPORTÁ y NO declares
    RsvpComponent,  // IMPORTÁ y NO declares
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
