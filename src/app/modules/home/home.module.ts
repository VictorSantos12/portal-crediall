import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home/home.component';
import { BannersCarrosselComponent } from './components/banners-carrossel/banners-carrossel.component';
import { PesquisaImoveisComponent } from './components/pesquisa-imoveis/pesquisa-imoveis.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannersCarrosselComponent,
    PesquisaImoveisComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
