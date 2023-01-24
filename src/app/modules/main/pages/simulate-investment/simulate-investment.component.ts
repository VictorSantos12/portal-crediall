import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MainService } from '../../shared/main.service';
import { Installment } from '../../shared/models/simulator/installment';
import { SimulatorResult } from '../../shared/models/simulator/simulator-result';

import Swal from 'sweetalert2';
import { ClientData } from '../../shared/models/simulator/clientData';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private mainService: MainService, 
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
  ) { 
    this.simulatorForm = this.formBuilder.group({
      propertyPrice: ['', Validators.compose([Validators.required])],
      financingPrice: ['', Validators.compose([Validators.required])],
      birthDate: ['', Validators.compose([Validators.required])],
      months: ['12'],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',  Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit(): void {

    let price = this.currentRoute.snapshot.params['propertyPrice'];
    this.form['propertyPrice'].setValue(price);

  }

  backToOrigin() {

    let origin = this.currentRoute.snapshot.params['origin']; // Determines the origin component

    if(origin === "true") {
      this.router.navigate([``]);
    } else {
      this.router.navigateByUrl(`/search-property`, {
        state: {
          'city': history.state['city'],
          'district': history.state['district'],
          'typology': history.state['typology'],
          'price': history.state['price'],
          'area': history.state['area'],
          'rooms': history.state['rooms'],
          'parkingSpot': history.state['parkingSpot'],
          'propertyDeveloper': history.state['propertyDeveloper'],
        }}   
      );
    }
  }

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

    let clientData: ClientData;
    
    clientData = {
      Nome: this.form['name'].value,
      Cpf: this.form['cpf'].value,
      DataNascimento: this.form['birthDate'].value,
      Telefone: this.form['phone'].value,
      EMail: this.form['email'].value,
      ValorImovel: parseInt(this.simulatorForm.get('propertyPrice')?.value),
      ValorFinanciado: parseInt(this.simulatorForm.get('financingPrice')?.value),
      Prazo: parseInt(this.simulatorForm.get('months')?.value)
    }

    this.mainService.simulateInvestment(clientData)
    .subscribe((data: SimulatorResult) => {
      this.installments = data.parcelas;
      this.financingPrice = data.rendaMinima;
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
  }  

}
