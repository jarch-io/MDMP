import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Employee } from '../../models/employee/Employee';
import { EmployeeService } from '../../models/employee/employee.service';

@Component({
  selector: 'page-employee',
  templateUrl: './employee.component.html',
  providers : [EmployeeService]
})

export class EmployeeComponent implements OnInit{

  employee : Employee;

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private employeeService : EmployeeService
    ) {}

  ngOnInit() : void {
    
  }

}
