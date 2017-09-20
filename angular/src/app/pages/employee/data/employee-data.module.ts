import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { EmployeeDataComponent } from './employee-data.component';
import { JioCardUserComponent } from "../../../commons/jio-card-user/jio-card-user.component";

import { JioFormModule } from '../../../commons/jio-form/jio-form.module';

@NgModule({
  imports : [
    BrowserModule,
    FormsModule,
    JioFormModule
  ],
  declarations : [
    EmployeeDataComponent,
    JioCardUserComponent
  ]
})

export class EmployeeDataModule {}
