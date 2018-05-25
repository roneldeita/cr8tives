import { combineReducers } from 'redux'
import albums from './albumsReducer'
import album from './albumReducer'

const rootReducer = combineReducers({
  albums,
  album
})

export default rootReducer;
