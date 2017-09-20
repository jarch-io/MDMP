import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Employee } from './Employee';

import { json_to_string } from "../../util/Json";

@Injectable()
export class EmployeeService {
  private fields = ["apellidos","nombres","dni","cargo","habilitado","fNacimiento","sexo","photo","direccion","telefonos","hijos","conyuge","email","estadoCivil"];
  private header = new Headers({"Content-Type" : "application/x-www-form-urlencoded"});

  constructor(private http : Http){}

  getEmployee(id : string) : Observable<Employee> {
    return this.http.get(`employees/${id}:(${this.fields.join(",")})`)
                .map(res => res.json().data.employee as Employee);
  }

  getEmployeeControl(id : string) : Observable<Employee> {
    return this.http.get(`employees/${id}:(habilitado,area,regLaboral,fTerContrato)`)
                .map(res => res.json().data.employee as Employee);
  }

  newEmployee(data : any) : Observable<Employee> {
    return this.http.post(`employees`,json_to_string(data), {headers : this.header})
                .map(res => res.json().data.employee);
  }

  updateEmployee(id : any, data : any) : Observable<Employee> {
    return this.http.put(`employees/${id}`,json_to_string(data), {headers : this.header})
                .map(res => res.json().data.employee);
  }
}
