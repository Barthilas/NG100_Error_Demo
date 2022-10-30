import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App, BComponent } from './app.component';

@NgModule({
  declarations: [
    App,
    BComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
