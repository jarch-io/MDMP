import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmployeeControlModule } from './control/employee-control.module';
import { EmployeeDataModule } from './data/employee-data.module';

import { EmployeeComponent } from './employee.component';

@NgModule({
  imports : [
    //CommonModule
    BrowserModule,
    FormsModule,
    RouterModule,
    EmployeeDataModule,
    EmployeeControlModule
  ],
  declarations : [
    EmployeeComponent
  ]
})

export class EmployeeModule {}
