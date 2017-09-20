import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';

import { IndexComponent } from './index.component';

import { HttpService } from '../../models/http.service';

import { IndexRoutingModule } from './index-routing.module';

@NgModule({
  imports : [
    BrowserModule,
    IndexRoutingModule
  ],
  declarations : [
    IndexComponent
  ],
  providers : [
    {
      provide : Http,
      useClass : HttpService
    }
  ],
  bootstrap : [IndexComponent]
})

export class IndexModule {}
