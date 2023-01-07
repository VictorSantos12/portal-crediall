import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-property/:property-parameters', component: SearchPropertyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
