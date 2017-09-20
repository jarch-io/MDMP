import { NgModule, Directive, Input, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Directive({
  selector : "[jioTemplate]"
})
export class JioTemplate {
  @Input() type : string;

  @Input("jioTemplate") name : string;

  constructor(public template : TemplateRef<any>) {}

  getType() : string {
    return this.name;
  }
}

@NgModule({
  imports : [CommonModule],
  exports : [JioTemplate],
  declarations : [JioTemplate]
})
export class SharedModule {}
