import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomerConfigInterceptor } from './core/interceptors/homer/homer-config.interceptor';
import { LogbitsConfigInterceptor } from './core/interceptors/logbits/logbits-config.interceptor';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './modules/main/store';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
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
