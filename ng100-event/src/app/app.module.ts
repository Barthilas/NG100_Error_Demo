import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App, BComponent } from './app.component';

@NgModule({
  declarations: [
    BComponent,
    App
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
