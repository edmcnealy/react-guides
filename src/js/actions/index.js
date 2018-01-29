import fetch from 'cross-fetch';
import {
  REQUEST_GUIDES,
  RECEIVE_GUIDES,
  SELECT_GUIDEPATH,
  INVALIDATE_GUIDEPATH
} from '../constants/action-types';

export function selectGuidePath(guidePath) {
  return {
    type: SELECT_GUIDEPATH,
    guidePath
  }
}

export function invalidateGuidePath(guidePath) {
  return {
    type: INVALIDATE_GUIDEPATH,
    guidePath
  }
}

function requestGuides(guidePath) {
  return {
    type: REQUEST_GUIDES,
    guidePath
  }
}

function receiveGuides(guidePath, json) {
  return {
    type: RECEIVE_GUIDES,
    guidePath,
    dirs: json.data.dirs || [],
    files: json.data.files || [],
    breadcrumbs: json.data.breadcrumbs,
    receivedAt: Date.now()
  }
}

export function fetchGuides(guidePath) {
  return dispatch => {
    dispatch(requestGuides(guidePath));

    return fetch(`http://localhost:3000/api/guides/${guidePath}`)
      .then(response => response.json())
      .then(json => dispatch(receiveGuides(guidePath, json)))
  }
}

function shouldFetchGuides(state, guidePath) {
  const guides = state.guidesByGuidePath[guidePath]
  if (!guides) {
    return true
  } else if (guides.isFetching) {
    return false
  } else {
    return guides.didInvalidate
  }
}

export function fetchGuidesIfNeeded(guidePath) {
  return (dispatch, getState) => {
    if (shouldFetchGuides(getState(), guidePath)) {
      return dispatch(fetchGuides(guidePath))
    }
  }
}