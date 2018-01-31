import { combineReducers } from 'redux';
import {
  REQUEST_GUIDES,
  RECEIVE_GUIDES,
  SELECT_GUIDEPATH,
  INVALIDATE_GUIDEPATH
} from '../constants/action-types';

function selectedGuidePath(state = '/', action) {
  switch (action.type) {
    case SELECT_GUIDEPATH:
      return action.guidePath;
    default:
      return state
  }
}

function guides(state = {
  isFetching: false,
  didInvalidate: false,
  dirs: [],
  files: [],
  breadcrumbs: [],
  markdown: null
}, action) {
  switch (action.type) {
    case INVALIDATE_GUIDEPATH:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_GUIDES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: true
      })
    case RECEIVE_GUIDES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        dirs: action.dirs,
        files: action.files,
        markdown: action.markdown,
        breadcrumbs: action.breadcrumbs,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function guidesByGuidePath(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_GUIDEPATH:
    case REQUEST_GUIDES:
    case RECEIVE_GUIDES:
      return Object.assign({}, state, {
        [action.guidePath]: guides(state[action.guidePath], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedGuidePath,
  guidesByGuidePath
})

export default rootReducer