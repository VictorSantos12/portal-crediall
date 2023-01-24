import { Property } from '../../shared/models/property/property';

import * as PropertiesActions from './property.actions';

export const initialState: Property[] = [];

export function reducer(state=initialState, action: PropertiesActions.PropertiesActions) {
  switch(action.type) {
    case PropertiesActions.PropertiesActionsTypes.GET_PROPERTIES:
     state = initialState;
     return action.payload
    case PropertiesActions.PropertiesActionsTypes.DELETE_PROPERTIES:
      state = []
      return state;
    default:
     return state;
  }
}
