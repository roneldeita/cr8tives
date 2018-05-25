import React from 'react'
import CreateAlbumContainer from './container/CreateAlbumContainer'
import UploadContainer from './container/UploadContainer'
import { Divider, Button } from 'antd'

class ManageMediaPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      createAlbum:false,
      upload:false
    }
  }
  toggleCreateAlbum = () => {
    this.setState({ createAlbum: !this.state.createAlbum, upload: false});
  }
  toggleUpload = () => {
    this.setState({ createAlbum:false, upload: !this.state.upload});
  }
  render(){
    return(
      <div>
        <Button.Group style={{marginBottom:'20px'}}>
          <Button icon="plus" onClick={this.toggleCreateAlbum}>Create Album</Button>
          <Button icon="upload" onClick={this.toggleUpload}>Upload</Button>
        </Button.Group>
        <CreateAlbumContainer
          display={this.state.createAlbum}/>
        <UploadContainer
          display={this.state.upload}/>
        <Divider/>
      </div>
    )
  }
}
export default ManageMediaPage
