import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { select, Store } from '@ngrx/store';

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
import { deleteProperties, getProperties } from '../../store/search-property/property.actions';
import { Router } from '@angular/router';

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

  requestPropertyResult: Observable<Property[]> = new Observable<Property[]>();
  propertiesList: Property[] = [];

  propertyPrice: Subject<string> = new Subject<string>();
  propertyPriceSubscription: Subscription = new Subscription();

  get form() {
    return this.propertySearchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private store: Store<AppState>,
    private router: Router,
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
    // this.loadMap();
    
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
    // this.store.dispatch(new deleteProperties([]));
  }

  getProperties() {
    this.getCities(this.propertySearchForm.get('state')?.value);
    this.getDistrict(this.propertySearchForm.get('city')?.value, this.propertySearchForm.get('state')?.value);
    this.getPropertyTypes();
    this.getPropertyDevelopers();
    
    this.requestPropertyResult = this.store.pipe(select('properties'))
    this.requestPropertyResult.subscribe((data: Property[]) => {
      if(data.length != 0) {
        this.propertiesList = data;
      } else {
        this.getPropertiesList();    
      }
    });
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
      'maximumPrice': this.propertySearchForm.get('price')?.value.replace(',',''),
      'parkingSpots': parseInt(this.propertySearchForm.get('parking_spot')?.value),
      'propertyDeveloperId': (Number.isNaN(parseInt(this.propertySearchForm.get('property_developer')?.value))) ? null : parseInt(this.propertySearchForm.get('property_developer')?.value),
      // 'propertyStateId': 1,
      'propertyTypeId': parseInt(this.propertySearchForm.get('typology')?.value),
      'rooms': parseInt(this.propertySearchForm.get('rooms')?.value),
    }

    this.mainService.getPropertiesList(params)
    .subscribe((data: RequestPropertyResult) => {
      
      this.propertiesList = data.result?.results!;
      this.store.dispatch(new getProperties(data.result?.results!));

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

  //  MAP

  loadMap() {
    this.loader.loadCallback(e => {
      if (e) {
        console.log(e);
      } else {
        new google.maps.Map(document.getElementById("map") as HTMLAnchorElement, this.mapOptions);
      }
    });
  }

  loader = new Loader({
    apiKey: "",
    version: "weekly",
    libraries: ["places"]
  });
  
  mapOptions = {
    center: {
      lat: -22.983781298015188,
      lng: -43.3612144413545
    },
    zoom: 11
  };

}
