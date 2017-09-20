import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';

import { EmployeesComponent } from '../employees/employees.component';
import { JioTableModule } from '../../commons/jio-table/jio-table.module';
import { JioPaginatorComponent } from '../../commons/jio-paginator/jio-paginator.component';

@NgModule({
  imports : [
    BrowserModule,
    RouterModule,
    JioTableModule
  ],
  declarations : [
    EmployeesComponent,
    JioPaginatorComponent
  ]
})

export class EmployeesModule {}
