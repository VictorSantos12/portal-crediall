import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MainService } from 'src/app/modules/main/shared/main.service';
import { Property } from 'src/app/modules/main/shared/models/property/property';
import { PropertyData } from 'src/app/modules/main/shared/models/contact/property-data';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  @Input() property: Property = new Property();

  chosenPorperty: PropertyData = new PropertyData();

  contactSpecialistForm: FormGroup;

  loading: boolean = false;

  get form() {
    return this.contactSpecialistForm.controls;
  }

  formError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private deviceService: DeviceDetectorService,
  ) {
    this.contactSpecialistForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  validateContactSpecialistForm() {
    if(this.contactSpecialistForm.invalid) {
      this.formError = true;
    } else {
      this.formError = false;
      this.setPropertyData();
    }
  }
  
  modalClosed() {
    this.formError = false;
    this.contactSpecialistForm.reset();
    this.contactSpecialistForm.updateValueAndValidity();
  }
  
  setPropertyData() {
    
    this.loading = true;

    this.chosenPorperty = {
      NomeCliente: this.form['name'].value,
      Telefone:  this.form['phone'].value,
      EMail: this.form['email'].value,
      NomeIncorporadora: this.property.propertyDeveloper.name,
      Empreendimento: this.property.realPropertyName,
      Endereco: this.property.location,
      Tipologia: this.property.propertyType.name,
      Apartir: this.property.price.minimumPrice,
      Quartos: this.property.size.roomsCount,
      Vagas: this.property.size.roomsCount,
    }

    this.mainService.setPropertyData(this.chosenPorperty)
    .subscribe({
      next: (() => { this.contactSpecialist(); }),
      error: (error) => { this.loading = false }
    }).add(() => {
      this.loading = false;
    });
  }

  contactSpecialist() {

    let client = this.form['name'].value;
    let propertyDeveloper = this.property.propertyDeveloper.name;
    let realPropertyName = this.property.realPropertyName;
    let address = this.property.location;
    let propertyType = this.property.propertyType.name;
    let price = this.getFormattedPrice(this.property.price.minimumPrice);
    let rooms = this.property.size.roomsCount;
    let parkingSpots = this.property.size.roomsCount;

    let message = `Ol%C3%A1!%20Sou%20${client}%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20im%C3%B3vel%20%C3%A0%20venda.%0A%0A${propertyDeveloper}%0A${realPropertyName}%0A${address}%0A${propertyType}%0AA%20partir%20de%20${price}%0A${rooms}%20quartos%0A${parkingSpots}%20vagas%0A%0AWhatsApp%20da%20especialista%3A%20Simone`;

    if(this.deviceService.isDesktop()) {
      window.open(`https://web.whatsapp.com/send?phone=552186142866/&text=${message}&app_absent=0`);
    } else {
      window.open(`https://wa.me/552186142866/?text=${message}`);
    } 

    let element: HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
  }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(price);
  }
}
