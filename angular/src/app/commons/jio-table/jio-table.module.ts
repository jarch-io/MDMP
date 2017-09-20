import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { JioTableComponent } from "./jio-table.component";

@NgModule({
  imports : [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  declarations : [JioTableComponent],
  exports : [JioTableComponent]
})

export class JioTableModule {}
