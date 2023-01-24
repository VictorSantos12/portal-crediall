import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from 'src/app/modules/main/shared/models/property/property';
import { PropertyFilter } from 'src/app/modules/main/shared/models/filter/property-filter';

import { AppState } from 'src/app/modules/main/store';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() propertiesList: Property[] = [];

  @Input() filter: PropertyFilter = new PropertyFilter();

  @Output() property: EventEmitter<any> = new EventEmitter<any>;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {}

  getFormattedPercent(num: number) {
    return new Intl.NumberFormat(
      'default', { 
        style: 'percent', 
        minimumFractionDigits: 1,
    }).format(num / 100);
  }

  goToSimulator(propertyPrice: number) {
    this.router.navigateByUrl(`/simulate-investment/${propertyPrice}/${false}`, {
      state: {
        'city': this.filter.city,
        'district': this.filter.district,
        'typology': this.filter.typology,
        'price': this.filter.price,
        'area': this.filter.area,
        'rooms': this.filter.rooms,
        'parkingSpot': this.filter.rooms,
        'propertyDeveloper': this.filter.propertyDeveloper,
      },
    });
  }
  
  setPropertyData(property: Property) {
    this.property.emit(property);
  }

}  

