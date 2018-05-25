import React from 'react'
import AlbumContainer from './container/AlbumContainer'
//redux
import {connect} from "react-redux"
import { loadAlbums } from '../../actions/albumsAction'
import { bindActionCreators } from 'redux'


class ManageMediaPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      createAlbum:false
    }
    this.toggleCreateAlbum = this.toggleCreateAlbum.bind(this)
  }
  toggleCreateAlbum = () => {
    this.setState({ createAlbum: !this.state.createAlbum, upload: false});
  }
  componentWillMount(){
    this.props.loadAlbums()
  }
  render(){
    return(
      <div>
        <AlbumContainer
          albums={this.props.albums}
          createAlbum={this.state.createAlbum}
          toggleCreateAlbum={this.toggleCreateAlbum}/>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps){
  return {
    albums: state.albums,
  }
}
function mapDispatchToProps(dispatch){
  return {
    loadAlbums: bindActionCreators(loadAlbums, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMediaPage)
