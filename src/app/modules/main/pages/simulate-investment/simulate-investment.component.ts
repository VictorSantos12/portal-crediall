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

  get form() {
    return this.simulatorForm.controls;
  }

  formError: boolean = false;

  constructor(private mainService: MainService,  private formBuilder: FormBuilder) { 
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
      this.simulateInvestiment();
    }
  }

  simulateInvestiment() {
    this.gettingInstallments = true;

    let propertyPrice =  parseFloat(this.simulatorForm.get('propertyPrice')?.value);
    let financingPrice = parseFloat(this.simulatorForm.get('financingPrice')?.value);
    let birthDate = this.simulatorForm.get('birthDate')?.value;
    let months = parseInt(this.simulatorForm.get('months')?.value);

    this.mainService.simulateInvestiment(propertyPrice, financingPrice, this.dateInverter(birthDate), months)
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

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

}
