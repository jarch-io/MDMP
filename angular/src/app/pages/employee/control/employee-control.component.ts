import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Employee } from '../../../models/employee/Employee';
import { Period } from '../../../models/period/period';

import { EmployeeService } from '../../../models/employee/employee.service';
import { PeriodService } from "../../../models/period/period.service";

import { Toast } from '../../../commons/commons/Toast';

@Component({
  selector : "page-control-body",
  templateUrl : "./employee-control.component.html",
  providers : [PeriodService]
})

export class EmployeeControlComponent implements OnInit{

  employee : Employee;
  periods : Period[];

  skeletors : any = {
    contrato : {
      title : "datos personales",
      onSave : this.saveEmployee.bind(this),
      elements : [
        {
          type : "select",
          class : "col s12 m6",
          options : [["l","Locador"],["c","CAS"]],
          key : "regLaboral",
          label : "Regimen Laboral"
        },
        {
          type : "text",
          class : "col s12 m6 input-field",
          key : "fTerContrato",
          label : "Termino"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "area"
        }
      ]
    },
    period : {
      title : "Periodo de pago",
      onSave : "",
      elements : [
        {
          type : "text",
          class : "col s12 m6 input-field",
          key : "inicio"
        },
        {
          type : "text",
          class : "col s12 m6 input-field",
          key : "fin"
        },
        {
          type : "text",
          class : "col s12 m4 input-field",
          key : "dias"
        },
        {
          type : "text",
          class : "col s12 m4 input-field",
          key : "sueldo"
        },
        {
          type : "text",
          class : "col s12 m4 input-field",
          key : "total"
        }
      ]
    }
  };

  constructor(
      private employeeService : EmployeeService,
      private periodService : PeriodService,
      private route : ActivatedRoute,
      private router : Router
    ){}

  ngOnInit(){
    let params : any = this.route.params;
    if(!params.value.id) this.router.navigate(["/employees/new"]);

    this.route.paramMap
              .switchMap((params : ParamMap) => this.employeeService.getEmployeeControl(params.get("id")))
              .subscribe(emp => {
                        this.employee = emp;
                        this.getPeriods();
                      },
                        err => this.router.navigate(["/employees/new"]));
  }

  getPeriods() : void {
    this.periodService.getPeriods(this.employee._id)
                      .subscribe(periods => this.periods = periods);
  }

  saveEmployee(data : any, OnSave : Function, onUpdate : Function) : void {
    this.updateEmployee(data,onUpdate);
  }

  updateEmployee(data : any, callback : Function) : void {
    this.employeeService.updateEmployee(this.employee._id,data)
        .subscribe(employee => {
          new Toast(200,"El colaborador se actualizo correctamente.");
          callback();
        });
  }
}
