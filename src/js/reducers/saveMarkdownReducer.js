import {
  SAVE_MARKDOWN_REQUEST,
  SAVE_MARKDOWN_SUCCESS,
  SAVE_MARKDOWN_ERROR
} from '../constants/action-types';

function saveMarkdownState(state = {}, action) {
  switch (action.type) {
    case SAVE_MARKDOWN_REQUEST:
      return Object.assign({}, state, {
        isSavingMarkdown: true,
        error: null
      })
      case SAVE_MARKDOWN_SUCCESS:
      return Object.assign({}, state, {
        isSavingMarkdown: false,
        isSuccess: action.isSuccess,
        error: null
      });
    case SAVE_MARKDOWN_ERROR:
      return Object.assign({}, state, {
        isSavingMarkdown: false,
        error: action.error
      })
    default:
      return state
  }
}

export default saveMarkdownState