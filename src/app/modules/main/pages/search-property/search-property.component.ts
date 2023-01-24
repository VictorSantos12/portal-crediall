import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../../shared/main.service';
import { RequestResult } from '../../shared/models/request_result';
import { State } from '../../shared/models/state/state';
import { City } from '../../shared/models/city/city';
import { District } from '../../shared/models/district/district';
import { PropertyType } from '../../shared/models/property-type/property-type';
import { PropertyDeveloper } from '../../shared/models/property/property-developer';
import { RequestPropertyResult } from '../../shared/models/property/request-property-result';
import { Property } from '../../shared/models/property/property';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { PropertyFilter } from '../../shared/models/filter/property-filter';
import { Router } from '@angular/router';
import { PropertyResult } from '../../shared/models/property/property-result';
import { MyStore } from '../../store/my-store';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {
  
  propertySearchForm: FormGroup;

  property: Property = new Property();

  filter: PropertyFilter = new PropertyFilter();

  district: string = '';
  typology: string = '';
  price: string = '';
  area: number = 0;
  rooms: number = 0;
  parkingSpot: number = 0;
  propertyDeveloper: string = '';
  
  states: State[] = [];
  cities: City[] = [];
  districts: District[] = [];
  propertyTypes: PropertyType[] = [];
  propertyDevelopers: PropertyDeveloper[] = [];

  gettingPropertiesList: boolean = false;

  propertyResult: Observable<PropertyResult> = new Observable<PropertyResult>();
  propertiesList: Property[] = [];

  propertyPrice: Subject<string> = new Subject<string>();
  propertyPriceSubscription: Subscription = new Subscription();

  get form() {
    return this.propertySearchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private myStore: MyStore,
  ) {
    this.propertySearchForm = this.formBuilder.group({
      state: ['Rio de Janeiro'],
      city: [''],
      district: [''],
      typology: [''],
      price: [''],
      area: [100],
      rooms: [0],
      parking_spot: [0],
      property_developer: [''],
    });
  }

  ngOnInit(): void {
    
    this.form['city'].setValue(history.state['city']);
    this.form['district'].setValue(history.state['district']);
    this.form['typology'].setValue(history.state['typology']);
    this.form['price'].setValue(history.state['price']);
    this.form['area'].setValue(history.state['area']);
    this.form['rooms'].setValue(history.state['rooms']);
    this.form['parking_spot'].setValue(history.state['parkingSpot']);
    this.form['property_developer'].setValue(history.state['propertyDeveloper']);
    
    this.filter = {
      city: this.propertySearchForm.get('city')?.value,
      district: this.propertySearchForm.get('district')?.value,
      typology: this.propertySearchForm.get('typology')?.value,
      price: this.propertySearchForm.get('price')?.value,
      area: this.propertySearchForm.get('area')?.value,
      rooms: this.propertySearchForm.get('rooms')?.value,
      parkingSpot: this.propertySearchForm.get('parking_spot')?.value,
      propertyDeveloper: this.propertySearchForm.get('property_developer')?.value,  
    }
    
    this.getProperties();
    
    this.propertyPriceSubscription = this.propertyPrice
    .pipe(
      debounceTime(1000),
    ).subscribe(() => {
      if(this.form['price'].value != '') {
        this.getPropertiesList();
      }
    });
  }

  backToOrigin() {
    this.router.navigate([``]);
    this.myStore.clearProperties();
  }

  getProperties() {
    this.getCities(this.propertySearchForm.get('state')?.value);
    this.getDistrict(this.propertySearchForm.get('city')?.value, this.propertySearchForm.get('state')?.value);
    this.getPropertyTypes();
    this.getPropertyDevelopers();
    
     if(this.myStore.propertyResult.results.length != 0) {
       this.propertiesList = this.myStore.propertyResult.results;
     } else {
       this.getPropertiesList();    
     }
  }
   
  // GET ROUTINES

  getStates() {
    this.mainService.getStates()
    .subscribe((data: RequestResult) => {
      this.states = data.result;
    }).add(() => {});
  }

  getCities(state: string) {
    this.mainService.getCities(state)
    .subscribe((data: RequestResult) => {
      this.cities = data.result;
    }).add(() => {});
  }

  getDistrict(city: string, state: string) {
    this.mainService.getDistricts(city, state)
    .subscribe((data: RequestResult) => {
      this.districts = data.result;
    }).add(() => {});
  }

  getPropertyTypes() {
    this.mainService.getPropertyTypes()
    .subscribe((data: RequestResult) => {
      this.propertyTypes = data.result;
    }).add(() => {});
  }

  getPropertyDevelopers() {
    this.mainService.getPropertyDevelopers()
    .subscribe((data: RequestResult) => {
      this.propertyDevelopers = data.result;
    }).add(() => {});
  }
 

  propertyPriceCurrencyMask(i: any) {
  
    var valor = i.value

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
    
    this.propertySearchForm.controls['price'].setValue(valor);
    
  }

  // SEARCH ROUTINES

  getPropertiesList() {
    
    this.gettingPropertiesList = true;
    
    let params = {
      'limit': 20,
      'offset': 0,
      'area': parseInt(this.propertySearchForm.get('area')?.value),
      'state': this.propertySearchForm.get('state')?.value,
      'city': this.propertySearchForm.get('city')?.value,
      'district': this.propertySearchForm.get('district')?.value,
      'minimumPrice': 500000,
      'maximumPrice': (this.propertySearchForm.get('price')?.value ? this.propertySearchForm.get('price')?.value.replace(',','') : '1000000000'),
      'parkingSpots': parseInt(this.propertySearchForm.get('parking_spot')?.value),
      'propertyDeveloperId': (Number.isNaN(parseInt(this.propertySearchForm.get('property_developer')?.value))) ? null : parseInt(this.propertySearchForm.get('property_developer')?.value),
      'propertyTypeId': parseInt(this.propertySearchForm.get('typology')?.value),
      'rooms': parseInt(this.propertySearchForm.get('rooms')?.value),
    }

    this.mainService.getPropertiesList(params)
    .subscribe((data: RequestPropertyResult) => {
      
      this.myStore.setNewProperties(data.result);
      this.propertiesList = data.result.results;

    }).add(() => {
      this.filter = {
        city: this.propertySearchForm.get('city')?.value,
        district: this.propertySearchForm.get('district')?.value,
        typology: this.propertySearchForm.get('typology')?.value,
        price: this.propertySearchForm.get('price')?.value,
        area: this.propertySearchForm.get('area')?.value,
        rooms: this.propertySearchForm.get('rooms')?.value,
        parkingSpot: this.propertySearchForm.get('parking_spot')?.value,
        propertyDeveloper: this.propertySearchForm.get('property_developer')?.value,  
      }
      this.gettingPropertiesList = false;
    })
  }
  
  // CHANGE ROUTINES

  cityChanged() {

    this.getDistrict(
      this.propertySearchForm.get('city')?.value, 
      this.propertySearchForm.get('state')?.value,
    );
    this.propertySearchForm.controls['district'].setValue('');
    
    this.getPropertiesList();

  }

  priceChanged() {
    this.propertyPrice.next('');
  }

  emitProperty(property: Property) {
    this.property = property;
  }

}
