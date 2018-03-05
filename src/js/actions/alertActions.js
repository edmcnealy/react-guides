import uuid from 'uuid';
import {
  ADD_ALERT,
  UPDATE_ALERT,
  REMOVE_ALERT
} from '../constants/action-types';

function addAlert(alert) {
  return {
    type: ADD_ALERT,
    alert
  }
}
function removeAlert(alert) {
  clearTimeout(alert.token);
  return {
    type: REMOVE_ALERT,
    id: alert.id
  }
}
function updateAlert(alert) {
  return {
    type: UPDATE_ALERT,
    alert
  }
}

function createAlert(message, alertType) {
  const autoCloseTimeout = 4000;
  let progress = 0;
  let currentTime = 0;
  let intervalLoopTime = 20;

  let progressStep = 100 / (autoCloseTimeout / intervalLoopTime);

  return dispatch => {
    let id = uuid();

    let alert = {
      id,
      message,
      alertType,
      pause: false,
      progress: 0
    }
    
    alert.token = setInterval(() => {
      if (!alert.pause) {
        currentTime += intervalLoopTime;
        alert.progress += progressStep;
        dispatch(updateAlert(alert));
      }
      
      if (currentTime >= autoCloseTimeout) {
        dispatch(removeAlert(alert));
      }
    }, intervalLoopTime);
    
    dispatch(addAlert(alert));
  }
}

export function info(message) {
  return createAlert(message, 'info');
}
export function success(message) {
  return createAlert(message, 'success');
}
export function warn(message) {
  return createAlert(message, 'warn');
}
export function error(message) {
  return createAlert(message, 'error');
}

export function closeAlert(alert) {
  return dispatch => dispatch(removeAlert(alert));
}