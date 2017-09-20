import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { EmployeeControlComponent } from './employee-control.component';
import { JioFormCreateComponent } from "../../../commons/jio-form-create/jio-form-create.component";

import { JioFormModule } from "../../../commons/jio-form/jio-form.module";
import { JioTableModule } from "../../../commons/jio-table/jio-table.module";

import { JioGridModule } from "../../../commons/jio-grid/jio-grid.module";

@NgModule({
  imports : [
    CommonModule,
    BrowserModule,
    FormsModule,
    JioFormModule,
    JioTableModule,
    JioGridModule
  ],
  declarations : [
    EmployeeControlComponent,
    JioFormCreateComponent
  ]
})

export class EmployeeControlModule {}
