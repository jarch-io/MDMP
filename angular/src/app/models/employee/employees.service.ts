import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import { Employees } from './Employees';

@Injectable()
export class EmployeesService {
  private fields = ["apellidos","nombres","dni","cargo"];

  constructor (private http : Http) {}

  getEmployees(text : string) : Observable<Employees[]> {
    return this.http.get(`employees:habilitado(true):(${this.fields.join(',')}):apellidos(${text})`)
                .map(res => res.json().data.employees as Employees[]);
  }

  getPagesAlphabet() : Observable<any> {
    return this.http.get(`employees:habilitado(true):(pages)`)
                .map(res => res.json().data.pages);
  }
}
