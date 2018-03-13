import {
  SAVE_MARKDOWN_REQUEST,
  SAVE_MARKDOWN_SUCCESS,
  SAVE_MARKDOWN_ERROR
} from '../constants/action-types';

function saveMarkdownRequest() {
  return {
    type: SAVE_MARKDOWN_REQUEST
  }
}
function saveMarkdownSuccess(isSuccess) {
  return {
    type: SAVE_MARKDOWN_SUCCESS,
    isSuccess
  }
}
function saveMarkdownError(error) {
  return {
    type: SAVE_MARKDOWN_ERROR,
    error
  }
}

export function saveMarkdown(markdown, guidePath) {
  return dispatch => {
    dispatch(saveMarkdownRequest());

    return fetch('http://localhost:3000/api/guides', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        markdown,
        guidePath
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(json => {
              dispatch(saveMarkdownError(json.message));
            });
        } else {
          return response.json()
            .then(json => {
              dispatch(saveMarkdownSuccess(json.data));
            });
        }
      })
      .catch(error => { dispatch(saveMarkdownError(error.message)); });
  }
}