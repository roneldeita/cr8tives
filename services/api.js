import axios from 'axios'
const HOST = 'http://35.200.155.233'

export function Gallery(data, header) {
  return {
    All: () => axios.get(HOST + '/albums'),
    New: () => axios.post(HOST + '/albums', data),
    Select: ()=> axios.get(HOST + '/albums/' + data.albumId),
    Delete: () => axios.delete(HOST + '/albums/'+data.albumId+'/contents/' + data.contentId),
    DeleteAlbum: () => axios.delete(HOST + '/albums/' + data.albumId),
    UpdateAlbum: () => axios.put(HOST + '/albums/' + data.albumId, data)
  }
}
