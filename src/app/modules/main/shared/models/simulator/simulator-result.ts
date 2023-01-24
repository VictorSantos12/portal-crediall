import { Installment } from "./installment";

export interface SimulatorResult {
  valorImovel: string;
  valorFinanciado: string;
  taxaJuros: string;
  parcelas: Installment[];
  rendaMinima: string;
}