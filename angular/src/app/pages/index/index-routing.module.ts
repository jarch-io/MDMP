import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { EmployeesModule } from "../employees/employees.module";
import { EmployeeModule } from "../employee/employee.module";

import { EmployeesComponent } from '../employees/employees.component';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeDataComponent } from '../employee/data/employee-data.component';
import { EmployeeControlComponent} from "../employee/control/employee-control.component";

const routes : Routes = [
  {path : "", component : EmployeesComponent},
  {path : "employees", component : EmployeeComponent, children : [
    {path : "", redirectTo : "/employees/new", pathMatch : "full"},
    {path : "new", component : EmployeeDataComponent},
    {path : ":id", children : [
      {path : "", component : EmployeeDataComponent},
      {path : "control", component : EmployeeControlComponent}
    ]}
  ]},
  {path : "**", redirectTo : "/"}
];

@NgModule({
  imports : [
    EmployeesModule,
    EmployeeModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})

export class IndexRoutingModule {}
