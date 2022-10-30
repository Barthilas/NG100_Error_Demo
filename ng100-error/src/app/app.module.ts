import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AComponent, BComponent } from './app.component';

@NgModule({
  declarations: [
    AComponent,
    BComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AComponent]
})
export class AppModule { }
