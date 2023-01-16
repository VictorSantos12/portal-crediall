import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppNavBarComponent } from './pages/home/components/app-nav-bar/app-nav-bar.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import { SearchResultComponent } from './pages/search-property/components/search-result/search-result.component';
import { MainService } from './shared/main.service';
import { SimulateInvestmentComponent } from './pages/simulate-investment/simulate-investment.component';

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
  ],
  providers: [MainService]
})
export class MainModule { }
