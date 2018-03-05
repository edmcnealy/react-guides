import { combineReducers } from 'redux';
import {
  ADD_ALERT,
  UPDATE_ALERT,
  REMOVE_ALERT
} from '../constants/action-types';

function alertState(state = {
  alerts: []
}, action) {
  switch (action.type) {
    case ADD_ALERT:
      let addAlert = action.alert;
      return Object.assign({}, state, {
        alerts: [...state.alerts, addAlert]
      });

    case UPDATE_ALERT:
      let updateAlert = state.alerts.find((alert => alert.id === action.alert.id));

      return Object.assign({}, state, {
        alerts: Object.assign([], state.alerts, updateAlert)
      });

    case REMOVE_ALERT:
      let alerts = state.alerts.filter(alert => alert.id !== action.id);
      return Object.assign({}, state, {
        alerts
      })
    default:
      return state
  }
}

export default alertState