import {
  GUIDES_REQUEST,
  GUIDES_SUCCESS,
  GUIDES_ERROR,
  SELECT_GUIDEPATH,
  INVALIDATE_GUIDEPATH,
} from '../constants/action-types';

export function selectedGuidePath(state = '/', action) {
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
  guideData: {},
  breadcrumbs: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_GUIDEPATH:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case GUIDES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: true
      })
    case GUIDES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        guideData: action.guideData,
        breadcrumbs: action.breadcrumbs,
        lastUpdated: action.receivedAt
      })
    case GUIDES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

export function guidesByGuidePath(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_GUIDEPATH:
    case GUIDES_REQUEST:
    case GUIDES_SUCCESS:
    case GUIDES_ERROR:
      return Object.assign({}, state, {
        [action.guidePath]: guides(state[action.guidePath], action)
      })
    default:
      return state
  }
}
