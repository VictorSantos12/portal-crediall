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

  constructor() { }

  ngOnInit(): void {

  }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }
  
  getFormattedPercent(num: number) {
    return new Intl.NumberFormat(
      'default', { 
        style: 'percent', 
        minimumFractionDigits: 1,
    }).format(num / 100);
  }

}  

