import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR G KEY',
      libraries: ['places']
    }),
    BrowserAnimationsModule
  ],
  providers: [GoogleMapsAPIWrapper, MarkerManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
