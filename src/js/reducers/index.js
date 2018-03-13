import { combineReducers } from 'redux';
import { selectedGuidePath, guidesByGuidePath } from '../reducers/guidesReducer'
import addDirectoryState from '../reducers/addDirectoryReducer'
import saveMarkdownState from '../reducers/saveMarkdownReducer'
import alertState from '../reducers/alertReducer'

const rootReducer = combineReducers({
  selectedGuidePath,
  guidesByGuidePath,
  addDirectoryState,
  saveMarkdownState,
  alertState
})

export default rootReducer