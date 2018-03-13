import fetch from 'cross-fetch';
import {
  GUIDES_REQUEST,
  GUIDES_SUCCESS,
  GUIDES_ERROR,
  SELECT_GUIDEPATH,
  INVALIDATE_GUIDEPATH,
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

function guidesRequest(guidePath) {
  return {
    type: GUIDES_REQUEST,
    guidePath
  }
}
function guidesSuccess(guidePath, data) {
  return {
    type: GUIDES_SUCCESS,
    guidePath,
    guideData: data || {},
    breadcrumbs: data.breadcrumbs || [],
    receivedAt: Date.now()
  }
}
function guidesError(guidePath, error) {
  return {
    type: GUIDES_ERROR,
    guidePath,
    error
  }
}

export function fetchGuides(guidePath) {
  return dispatch => {
    dispatch(guidesRequest(guidePath));

    return fetch(`http://localhost:3000/api/guides/${guidePath}`)
      .then(response => response.json())
      .then(json => dispatch(guidesSuccess(guidePath, json.data)))
      .catch(error => dispatch(guidesError(guidePath, error.message)));
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