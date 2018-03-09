import { combineReducers } from 'redux';
import {
  ADD_DIRECTORY_REQUEST,
  ADD_DIRECTORY_SUCCESS,
  ADD_DIRECTORY_ERROR
} from '../constants/action-types';

function addDirectoryState(state = {}, action) {
  switch (action.type) {
    case ADD_DIRECTORY_REQUEST:
      return Object.assign({}, state, {
        isAddingDirectory: true,
        error: null
      })
      case ADD_DIRECTORY_SUCCESS:
      return Object.assign({}, state, {
        isAddingDirectory: false,
        wasAdded: action.wasAdded,
        error: null
      });
    case ADD_DIRECTORY_ERROR:
      return Object.assign({}, state, {
        isAddingDirectory: false,
        error: action.error
      })
    default:
      return state
  }
}

export default addDirectoryState