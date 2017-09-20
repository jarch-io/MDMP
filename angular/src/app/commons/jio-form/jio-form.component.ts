import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector : "jio-form",
  templateUrl : "./jio-form.component.html"
})

export class JioFormComponent implements OnInit {
  @Input() skeletor : any;
  @Input() model : any;

  //indica si el formulario es de solo lectura
  private only : boolean = false;

  private dataInit : any = {};
  private dataEnd : any = {};

  constructor() {}

  ngOnInit() : void {}

  ngOnChanges() : void {
    if(this.model){
      this.skeletor.elements.map((v,i) => {
        this.dataInit[v.key] = this.model[v.key];
      });
      this.only = true;
    }
  }

  ngDoCheck() : void {
    if(this.model && !this.model.habilitado) this.cancel();
  }

  private edit() : void {
    this.only = false;
  }

  private save() : void {
    this.skeletor.onSave(this.dataEnd,() => {
      this.dataEnd = {};
      this.model = null;
      this.only = false;
    },() => {
      for(let key in this.dataEnd) {
        this.model[key] = this.dataInit[key] = this.dataEnd[key];
      }

      this.dataEnd = {};
      this.only = true;
    });
  }

  private cancel() : void {
    for(let key in this.dataInit){
      this.model[key] = this.dataInit[key];
    }

    this.dataEnd = {};
    this.only = true;
  }

  private change(event) : void {
    let target = event.target;
    let attrName = this.getElementName(target);

    if(!this.dataEnd[attrName]) this.dataEnd[attrName] = null;

    this.dataEnd[attrName] = (target["attributes"]["ng-reflect-value"] && target["attributes"]["ng-reflect-value"]["value"]) || target.value;
  }

  private getElementName(element : Node) : string {
    let name : string = "";
    
    for(let i in element.attributes){
      let attr = element.attributes[i];

      if(attr.name === "ng-reflect-name") {
        name = attr.value;
        break;
      }
    }

    return name;
  }
}
