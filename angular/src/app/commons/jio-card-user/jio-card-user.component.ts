import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector : "jio-card-user",
  templateUrl : "./jio-card-user.component.html"
})

export class JioCardUserComponent implements OnInit{

  @Input() data : any;

  constructor(){}

  ngOnInit() {}

}
