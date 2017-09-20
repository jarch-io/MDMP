import { Component, OnInit, Input} from '@angular/core';

interface IBody {
  key : String;
}

@Component({
  selector : "jio-table",
  templateUrl : "./jio-table.component.html"
})

export class JioTableComponent implements OnInit {

  @Input() skeletor : any[];
  @Input() rows : any;

  constructor() {}

  ngOnInit() {}
}
