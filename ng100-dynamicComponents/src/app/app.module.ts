import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { App, BComponent } from "./app.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App, BComponent ],
  entryComponents: [ BComponent ],
  bootstrap: [ App ]
})
export class AppModule {}
