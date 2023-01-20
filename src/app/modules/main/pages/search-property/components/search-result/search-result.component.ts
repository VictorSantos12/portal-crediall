import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from 'src/app/modules/main/shared/models/property/property';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  @Input() propertiesList: Property[] = [];
  
  @Output() property: EventEmitter<any> = new EventEmitter<any>;

  constructor() { }

  ngOnInit(): void {}

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
  
  setPropertData(property: Property) {
    this.property.emit(property);
  }

}  

