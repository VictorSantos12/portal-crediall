import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import { AppNavBarComponent } from './pages/home/components/app-nav-bar/app-nav-bar.component';
import { SimulateInvestmentComponent } from './pages/simulate-investment/simulate-investment.component';
import { SearchResultComponent } from './pages/search-property/components/search-result/search-result.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule} from 'ngx-mask';

import { MainService } from './shared/main.service';


@NgModule({
  declarations: [
    HomeComponent,
    AppNavBarComponent,
    SearchPropertyComponent,
    SearchResultComponent,
    SimulateInvestmentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    MainService,
  ]
})
export class MainModule { }
