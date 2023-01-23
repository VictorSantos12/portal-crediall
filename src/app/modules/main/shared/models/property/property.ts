import { Size } from "./size";
import { Price } from "./price"
import { Media } from "./media";
import { PropertyType } from "./property-type";
import { ResponsibleUser } from "./reponsible-user";
import { PropertyDeveloper } from "./property-developer";

export class Property {
  commission: number = 0;
  location: string = '';
  price: Price = new Price();
  size: Size = new Size();
  propertyType: PropertyType = new PropertyType();
  propertyDeveloper: PropertyDeveloper = new PropertyDeveloper();
  realPropertyName: string = '';
  responsibleUser: ResponsibleUser = new ResponsibleUser();
  id: number = 0;
  realPropertyId: number = 0;
  medias: Media[] = []
}