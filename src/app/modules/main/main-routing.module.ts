import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import { SimulateInvestmentComponent } from './pages/simulate-investment/simulate-investment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-property/:property-parameters', component: SearchPropertyComponent },
  { path: 'simulate-investiment', component: SimulateInvestmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
