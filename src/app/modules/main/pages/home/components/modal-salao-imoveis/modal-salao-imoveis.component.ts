import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-salao-imoveis',
  templateUrl: './modal-salao-imoveis.component.html',
  styleUrls: ['./modal-salao-imoveis.component.css']
})
export class ModalSalaoImoveisComponent {

  openLink() {
    window.open('https://www.sympla.com.br/evento/salao-de-imoveis-coren-e-caixa-clube-de-beneficios/1832241');
  }

  openLink2() {
    window.open('https://www.sympla.com.br/evento/salao-de-imoveis/1841756');
  }

  openLink3() {
    window.open('https://www.sympla.com.br/evento/salao-de-imoveis/1841756');
  }

  fecharModal(){
    localStorage.setItem('validaModal', 'false');
  }

}

