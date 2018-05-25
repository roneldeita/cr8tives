import * as types from './actionTypes'
import { Gallery } from '../services/api'

export function loadAlbumSuccess(album){
  return {type: types.LOAD_SELECTED_ALBUM_SUCCESS, album}
}

export function loadAlbum(id){
  return dispatch => {
    Gallery({albumId:id}).Select()
    .then(res => {
      dispatch(loadAlbumSuccess(res.data))
    })
  }
}
