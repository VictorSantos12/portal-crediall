import { Action } from "@ngrx/store";
import { Property } from "../../shared/models/property/property";

export enum PropertiesActionsTypes {
  GET_PROPERTIES = '[GET_PROPERTIES] get a list of properties',
  DELETE_PROPERTIES = '[DELETE_PROPERTIES] clear porpoerties from store',
}

export class getProperties implements Action {
  readonly type = PropertiesActionsTypes.GET_PROPERTIES;
  constructor(public payload: Property[]){}
}

export class deleteProperties implements Action {
  readonly type = PropertiesActionsTypes.DELETE_PROPERTIES;
  constructor(public payload: Property[]){}
}



export type PropertiesActions = getProperties | deleteProperties;