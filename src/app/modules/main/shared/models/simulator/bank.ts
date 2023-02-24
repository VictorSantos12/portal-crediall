import { Installment } from './installment';

export interface Bank {
  valorImovel: string,
  valorFinanciado: string
  taxaJuros: string,
  rendaMinima: string,
  codigoBanco: string,
  banco: string,
  parcelas: Installment[];
}