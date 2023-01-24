import { ActionReducerMap } from "@ngrx/store";
import { Property } from "../shared/models/property/property";

import { RequestPropertyResult } from '../shared/models/property/request-property-result';

import * as fromProperties from './search-property/property.reducer';

export interface AppState {
  properties: Property[];
};

export const appReducers: ActionReducerMap<AppState, any> = {
  properties: fromProperties.reducer
};