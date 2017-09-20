import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from '../../models/employee/employees.service';

@Component({
  selector : "jio-paginator",
  templateUrl : "./jio-paginator.component.html"
})

export class JioPaginatorComponent implements OnInit {
  @Input() callback : Function;

  pages : any[];
  meta : any;

  constructor(
      private employeesService : EmployeesService
    ) {
    this.meta = {current : 0};
  }

  ngOnInit() {
    this.employeesService.getPagesAlphabet()
        .subscribe(pages => {
          this.pages = pages;
          this.meta["size"] = this.pages.length;

          this.getPages(this.pages[this.meta["current"]]["page"]);
        });
  }

  private getPages(letter : string) : void {
    this.callback(letter);

    //simulando un [].indexOf()
    this.pages.forEach((v,i) => {
      if(v.page === letter) {
        this.meta["current"] = i;
      }
    });
  }

  onSelect(letter : string) : void {
    if(letter === this.pages[this.meta["current"]]["page"]) return;

    this.getPages(letter);
  }

  onPrev() : void {
    if(this.meta["current"] > 0){
      --this.meta["current"];

      this.callback(this.pages[this.meta["current"]]["page"]);
    }
  }

  onNext() : void {
     if(this.meta["current"] < this.meta["size"] - 1){
       ++this.meta["current"];

       this.callback(this.pages[this.meta["current"]]["page"]);
     }
  }

}
