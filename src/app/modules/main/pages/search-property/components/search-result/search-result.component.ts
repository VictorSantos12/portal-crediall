import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/modules/main/shared/models/property/property';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  @Input()
  propertiesList: Property[] = [];
  
  openInstallmentsDetails: boolean[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', 'notation': 'scientific' }).format(price);
  }
  
  getFormattedPercent(num: number) {
    return new Intl.NumberFormat(
      'default', { 
        style: 'percent', 
        minimumFractionDigits: 1,
    }).format(num / 100);
  }
  
  propertyPriceCurrencyMask(i: any) {
  
    var valor = i;

    valor = valor + '';

    valor = valor.replace(/[\D]+/g,'');

    if(valor.trim() != ''){
      valor = parseFloat(valor);
    }
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 13) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return valor;
    
  }

}  

