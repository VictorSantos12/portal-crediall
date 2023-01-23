import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainService } from '../../shared/main.service';
import { Installment } from '../../shared/models/simulator/installment';
import { SimulatorResult } from '../../shared/models/simulator/simulator-result';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-simulate-investment',
  templateUrl: './simulate-investment.component.html',
  styleUrls: ['./simulate-investment.component.css']
})
export class SimulateInvestmentComponent implements OnInit {
  
  simulatorForm: FormGroup;

  installments: Installment[] = [];

  gettingInstallments: boolean = false;

  openInstallmentsDetails: boolean[] = [];

  financingPrice: any;
  
  get form() {
    return this.simulatorForm.controls;
  }

  formError: boolean = false;

  constructor(private mainService: MainService, private formBuilder: FormBuilder) { 
    this.simulatorForm = this.formBuilder.group({
      propertyPrice: ['', Validators.compose([Validators.required])],
      financingPrice: ['', Validators.compose([Validators.required])],
      birthDate: ['', Validators.compose([Validators.required])],
      months: ['12'],
    });
  }

  ngOnInit(): void {}

  validateSimulatorFormFields() {
    if(this.simulatorForm.invalid) {
      this.formError = true;
      Swal.fire({
        title: 'Preencha os campos obrigatórios',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: '#012942',
        showCloseButton: true,
      })
    } else {
      this.formError = false;
      this.simulateInvestment();
    }
  }

  simulateInvestment() {
    this.gettingInstallments = true;

    let propertyPrice =  parseInt(this.simulatorForm.get('propertyPrice')?.value);
    let financingPrice = parseInt(this.simulatorForm.get('financingPrice')?.value);
    let birthDate = this.simulatorForm.get('birthDate')?.value;
    let months = parseInt(this.simulatorForm.get('months')?.value);

    this.mainService.simulateInvestment(propertyPrice, financingPrice, this.dateInverter(birthDate), months)
    .subscribe((data: SimulatorResult) => {
      this.installments = data.parcelas;
    }).add(() => {
      this.gettingInstallments = false;
    })
  }

  dateInverter(date: string): string {
    return date.split("-").reverse().join("-");
  }
  
  listDetails(index: number){
    this.openInstallmentsDetails[index] = !this.openInstallmentsDetails[index];
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
    
    this.simulatorForm.controls['propertyPrice'].setValue(valor);

    let value = Number(valor.replace(',', '.'));

    console.log(value);

  }

  financingPriceCurrencyMask(i: any) {
    
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
    this.simulatorForm.controls['financingPrice'].setValue(valor);
    
    let value = Number(valor.replace(',', '.'));

    console.log(value);

    this.financingPrice = value;

  }  

}
