import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Property } from 'src/app/modules/main/shared/models/property/property';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  @Input() property: Property = new Property();
  
  contactSpecialistForm: FormGroup;

  get form() {
    return this.contactSpecialistForm.controls;
  }

  formError: boolean = false;

  constructor( private formBuilder: FormBuilder) {
    this.contactSpecialistForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

  }

  validateContactSpecialistForm() {
    if(this.contactSpecialistForm.invalid) {
      this.formError = true;
    } else {
      this.formError = false;
      this.contactSpecialist();
    }
  }
  
  modalClosed() {
    this.contactSpecialistForm.reset();
  }

  contactSpecialist() {
    let element: HTMLElement = document.getElementById('close') as HTMLElement;
    element.click();
  }


}
