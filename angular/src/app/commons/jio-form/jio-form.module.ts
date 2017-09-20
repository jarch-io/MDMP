import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { JioFormComponent } from "./jio-form.component";

@NgModule({
  imports : [
    BrowserModule,
    FormsModule
  ],
  declarations : [
    JioFormComponent
  ],
  exports : [JioFormComponent]
})

export class JioFormModule {}
