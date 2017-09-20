import { Component, OnInit } from '@angular/core';

import { Employees } from '../../models/employee/Employees';
import { EmployeesService } from '../../models/employee/employees.service';

@Component({
  selector : "page-employees",
  templateUrl : "./employees.component.html",
  providers : [EmployeesService]
})

export class EmployeesComponent implements OnInit {

  skeletorTable : any[] = [
      {key : "dni"},
      {key : "apellidos"},
      {key : "nombres"},
      {key : "cargo"},
      {key : "_id",
       element : {
        type : "routerLinkButton",
        path : "/employees/",
        headerHidden : true,
        tooltip : {
          align : "top",
          text : "visualizar"
        },
        icon : "visibility"
      }}
    ];

  employees : Employees[];

  constructor(
    private employeesService : EmployeesService
    ) {}

  ngOnInit() {}

  getEmployees(text : string) : void {
    this.employeesService.getEmployees(text)
      .subscribe(employees => this.employees = employees);
  }

}
