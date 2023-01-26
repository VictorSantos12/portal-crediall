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
import { District } from '../../shared/models/district/district';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  propertySearchForm: FormGroup;
  
  districts: District[] = [];
  propertyTypes: PropertyType[] = [];
  
  validaModal = localStorage.getItem('validaModal');

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private mainService: MainService, 
  ) {
    this.propertySearchForm = this.formBuilder.group({
      city: ['Rio de Janeiro'],
      district: [''],
      typology: [1],
      price: [''],
      rooms: ['1'],
      parking_spot: ['1'],
    });
  }

  ngOnInit(): void {
    if (this.validaModal != 'false'){
      let element: HTMLElement = document.getElementById('botao-modal') as HTMLElement;
      element.click();
    }
    
    this.getDistrict('Rio de Janeiro', 'Rio de Janeiro');
    this.getPropertyTypes();
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

  searchProperty() {
    let city = this.propertySearchForm.get('city')?.value;
    let district = this.propertySearchForm.get('district')?.value;
    let typology = this.propertySearchForm.get('typology')?.value;
    let price = this.propertySearchForm.get('price')?.value;
    let rooms = this.propertySearchForm.get('rooms')?.value;
    let parking_spot = this.propertySearchForm.get('parking_spot')?.value;

    this.router.navigateByUrl(`/search-property`, {
      state: {
        'city': city,
        'district': district,
        'typology': typology,
        'price': price,
        'area': 10,
        'rooms': rooms,
        'parkingSpot': parking_spot,
        'propertyDeveloper': '',
      }}
    );
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

  simulateInvestment() {
    this.router.navigate([`/simulate-investment/''/${true}`]);
  }

  openLink() {
    window.open('https://www.sympla.com.br/evento/salao-de-imoveis-coren-e-caixa-clube-de-beneficios/1832241');
  }

  openLink2() {
    window.open('https://www.sympla.com.br/evento/salao-de-imoveis/1841756?token=170b68551743b567e3fb18bd3d31304b');
  }

  linkdin() {
    window.open('https://www.linkedin.com/in/crediall-solu%C3%A7%C3%B5es-em-cr%C3%A9dito-49a6681ba/?originalSubdomain=br');
  }
  
  facebook() {
    window.open('https://www.facebook.com/credialltechoficial');
  }

  instagram() {
    window.open('https://www.instagram.com/credialltechoficial/');
  }

}
