import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { JioGridComponent } from "./jio-grid.component";

@NgModule({
  imports : [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  declarations : [
    JioGridComponent
  ],
  exports : [
    JioGridComponent
  ]
})

export class JioGridModule {}
