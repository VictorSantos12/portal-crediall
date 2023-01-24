import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomerConfigInterceptor } from './core/interceptors/homer/homer-config.interceptor';
import { LogbitsConfigInterceptor } from './core/interceptors/logbits/logbits-config.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HomerConfigInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LogbitsConfigInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
