import { NgModule } from '@angular/core';
import { PropertyResult } from "../shared/models/property/property-result";

@NgModule()
export class MyStore {
  
   propertyResult: PropertyResult = new PropertyResult;

   setNewProperties(newPorperties: PropertyResult) {
     this.propertyResult = newPorperties; 
   }

   clearProperties() {
     this.propertyResult = new PropertyResult();
   }

}

