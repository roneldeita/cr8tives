import * as types from './actionTypes'
import { Gallery } from '../services/api'

export function loadAlbumsSuccess(albums){
  return {type: types.LOAD_ALBUMS_SUCCESS, albums}
}

export function loadAlbums(){
  return dispatch => {
    Gallery().All()
    .then(res => {
      dispatch(loadAlbumsSuccess(res.data))
    })
  }
}
