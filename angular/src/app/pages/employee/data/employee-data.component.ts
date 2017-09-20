import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";

import { Employee } from '../../../models/employee/Employee';
import { EmployeeService } from '../../../models/employee/employee.service';

import { Toast } from '../../../commons/commons/Toast';

@Component({
  selector : "employee-content-data",
  templateUrl : "./employee-data.component.html",
  providers : [EmployeeService]
})

export class EmployeeDataComponent implements OnInit {

  employee : Employee;

  createUnique : boolean = true;

  skeletors : any = {
    personal : {
      title : "datos personales",
      onSave : this.saveEmployee.bind(this),
      elements : [
        {
          type : "text",
          class : "col s12 input-field",
          key : "apellidos"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "nombres"
        },
        {
          type : "text",
          class : "col s12 m6 input-field",
          key : "dni"
        },
        {
          type : "date",
          class : "col s12 m6 input-field",
          key : "fNacimiento",
          label : "Fecha Nacimiento"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "cargo"
        },
        {
          type : "radio",
          class : "col s12",
          options : [["h","hombre"],["m","mujer"]],
          key : "sexo"
        }
      ]
    },
    contacto : {
      title : "datos de contacto",
      onSave : this.saveEmployee.bind(this),
      elements : [
        {
          type : "text",
          class : "col s12 input-field",
          key : "direccion"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "distrito"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "email"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "telefonos"
        }
      ]
    },
    civil : {
      title : "registro civil",
      onSave : this.saveEmployee.bind(this),
      elements : [
        {
          type : "select",
          class : "col s12",
          options : [["s","Soltero"],["c","Casado"],["d","Divorciado"],["v","Viudo"]],
          key : "estadoCivil",
          label : "Estado Civil"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "conyuge"
        },
        {
          type : "text",
          class : "col s12 input-field",
          key : "hijos"
        }
      ]
    }
  };

  constructor(
      private employeeService : EmployeeService,
      private route : ActivatedRoute,
      private router : Router,
      private location : Location
    ) {}

  ngOnInit() {
    let params : any = this.route.params;
    if(!params.value.id) return;
    
    this.route.paramMap
              .switchMap((params : ParamMap) => this.employeeService.getEmployee(params.get("id")))
              .subscribe(emp => this.employee = emp,
                         err => this.router.navigate(["/employees/new"]));
  }

  getEmployee(id : string) : void {
    this.employeeService.getEmployee(id)
        .subscribe(employee => this.employee = employee);
  }

  saveEmployee(data : any,onSave : Function, onUpdate  : Function) : void {
    if(!this.employee) {
      this.newEmployee(data, onSave);
    } else {
      this.updateEmployee(data,onUpdate);      
    }
  }

  newEmployee(data : any, callback : Function) : void {
    this.employeeService.newEmployee(data)
        .subscribe(employee => {
          if(this.createUnique){
            //simulando la redireccion
            this.employee = employee;
            this.router.navigate(["/employees/"+(data.dni ? data.dni : this.employee._id)]);
          }else {
            new Toast(200,"El colaborador se agrego correctamente");
            callback();
          }
        });
  }

  updateEmployee(data : any, callback : Function) : void {
    this.employeeService.updateEmployee(this.employee._id,data)
        .subscribe(employee => {
          new Toast(200,"El colaborador se actualizo correctamente.");
          callback();
        });
  }

  goBack() : void {
    this.location.back();
  }

}
