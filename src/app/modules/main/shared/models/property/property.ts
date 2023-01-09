import { Size } from "./size";
import { Price } from "./price"
import { Media } from "./media";
import { PropertyType } from "./property-type";
import { ResponsibleUser } from "./reponsible-user";
import { PropertyDeveloper } from "./property-developer";

export interface Property {
  commission: number;
  location: string;
  price: Price;
  size: Size;
  propertyType: PropertyType;
  propertyDeveloper: PropertyDeveloper;
  realPropertyName: string;
  responsibleUser: ResponsibleUser;
  id: number,
  realPropertyId: number,
  medias: Media[];
}