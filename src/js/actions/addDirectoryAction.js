import fetch from 'cross-fetch';
import {
  ADD_DIRECTORY_REQUEST,
  ADD_DIRECTORY_SUCCESS,
  ADD_DIRECTORY_ERROR
} from '../constants/action-types';
import { invalidateGuidePath, fetchGuidesIfNeeded } from '../actions';

function addDirectoryRequest(wasAdded) {
  return {
    type: ADD_DIRECTORY_REQUEST
  }
}
function addDirectorySuccess(wasAdded) {
  return {
    type: ADD_DIRECTORY_SUCCESS,
    wasAdded
  }
}
function addDirectoryError(error) {
  return {
    type: ADD_DIRECTORY_ERROR,
    error
  }
}

export function createDirectory(directoryName, guidePath) {
  return dispatch => {
    dispatch(addDirectoryRequest());

    return fetch('http://localhost:3000/api/guides/section', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sectionPath: `${guidePath}${directoryName}`
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(json => {
              dispatch(addDirectoryError(json.message))
            });
        } else {
          return response.json()
            .then(json => {
              dispatch(addDirectorySuccess(json.data));
              dispatch(invalidateGuidePath(guidePath));
              dispatch(fetchGuidesIfNeeded(guidePath));
            });
        }
      })
      .catch(error => { dispatch(addDirectoryError(error.message)); console.log(error) });
  }
}
