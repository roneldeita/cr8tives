import * as types from '../actions/actionTypes'

export default function(state = {}, payload) {
  switch(payload.type){
    case types.LOAD_SELECTED_ALBUM_SUCCESS:
      return payload.album
    default:
      return state;
  }
}
