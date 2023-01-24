import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { MainService } from '../../shared/main.service';
import { RequestResult } from '../../shared/models/request_result';
import { PropertyType } from '../../shared/models/property-type/property-type';
import { City } from '../../shared/models/city/city';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  propertySearchForm: FormGroup;
  
  cities: City[] = [];
  propertyTypes: PropertyType[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private mainService: MainService, 
  ) {
    this.propertySearchForm = this.formBuilder.group({
      city: ['Rio de Janeiro', Validators.compose([Validators.required])],
      typology: [1, Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      rooms: ['1', Validators.compose([Validators.required])],
      parking_spot: ['1'],
    });
  }

  ngOnInit(): void {
    this.loadMap();
    this.getCities();
    this.getPropertyTypes();
  }

  getCities() {
    this.mainService.getCities('Rio de Janeiro')
    .subscribe((data: RequestResult) => {
      this.cities = data.result;
    }).add(() => {});
  }

  getPropertyTypes() {
    this.mainService.getPropertyTypes()
    .subscribe((data: RequestResult) => {
      this.propertyTypes = data.result;
    }).add(() => {});
  }

  searchProperty() {
    if(this.propertySearchForm.invalid) {
      Swal.fire({
        title: 'Preencha todos campos do formulário',
        icon: 'warning',
        iconHtml: '',
        confirmButtonText: 'ok',
        confirmButtonColor: '#012942',
        showCloseButton: true,
      })
    } else {

      let city = this.propertySearchForm.get('city')?.value;
      let typology = this.propertySearchForm.get('typology')?.value;
      let price = this.propertySearchForm.get('price')?.value;
      let rooms = this.propertySearchForm.get('rooms')?.value;
      let parking_spot = this.propertySearchForm.get('parking_spot')?.value;

      this.router.navigateByUrl(`home/search-property`, {
        state: {
          'city': city,
          'district': '',
          'typology': typology,
          'price': price,
          'area': 100,
          'rooms': rooms,
          'parkingSpot': parking_spot,
          'propertyDeveloper': '',
        }}
      );
    }
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
    
    let value = Number(valor.replace(',', '.'));

    console.log(value);

  }  

  simulateInvestment() {
    this.router.navigate([`home/simulate-investment/''/${true}`]);
  }

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
