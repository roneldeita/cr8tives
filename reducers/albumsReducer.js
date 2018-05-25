import * as types from '../actions/actionTypes'

export default function(state = {}, payload) {
  switch(payload.type){
    case types.LOAD_ALBUMS_SUCCESS:
      return payload.albums
    default:
      return state;
  }
}
