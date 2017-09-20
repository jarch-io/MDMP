import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Period } from "./period";
import { json_to_string } from "../../util/Json";


@Injectable()
export class PeriodService {

  private header = new Headers({"Content-Type" : "application/x-www-form-urlencoded"});
  private fields = ["fInicio","fFin","dias","pago","cargo","regLaboral","area"];

  constructor(
      private http : Http
    ){}

  getPeriods(idEmployee : string) : Observable<Period[]> {
    return this.http.get(`employees/${idEmployee}/periods:(${this.fields.join(",")})`)
          .map(res => res.json().data.periods as Period[]);
  }

  newPeriod(idEmployee : string, data : any) : Observable<Period> {
    return this.http.post(`employees/${idEmployee}/periods`,json_to_string(data))
                .map(res => res.json().data.period as Period);
  }

}
