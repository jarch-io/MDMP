import { Component, Input, TemplateRef, ContentChildren, QueryList } from "@angular/core";

import { JioTemplate, SharedModule } from "../commons/shared";

@Component({
  selector : "jio-grid",
  templateUrl : "./jio-grid.component.html"
})

export class JioGridComponent {

  @Input() data;

  @ContentChildren(JioTemplate) templates : QueryList<any>;

  itemTemplate : TemplateRef<any>;

  constructor(){}

  ngAfterContentInit(){
    //this.templates.forEach((item) => this.itemTemplate = item.template);
    console.log(this);
  }

}
