import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector : "jio-form-create",
  templateUrl : "./jio-form-create.component.html"
})

export class JioFormCreateComponent implements OnInit {
  @Input() skeletor : any;
  
  constructor(){}

  ngOnInit(){}

}
