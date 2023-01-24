import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalaoImoveisComponent } from './modal-salao-imoveis.component';

describe('ModalSalaoImoveisComponent', () => {
  let component: ModalSalaoImoveisComponent;
  let fixture: ComponentFixture<ModalSalaoImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSalaoImoveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSalaoImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
