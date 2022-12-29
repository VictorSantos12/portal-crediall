import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaImoveisComponent } from './pesquisa-imoveis.component';

describe('PesquisaImoveisComponent', () => {
  let component: PesquisaImoveisComponent;
  let fixture: ComponentFixture<PesquisaImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaImoveisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
