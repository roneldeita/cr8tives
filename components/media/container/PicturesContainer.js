import React from 'react'
import Pictures from '../presentation/Pictures'
//services
import { Gallery } from '../../../services/api'
//lodash
import { isEmpty } from 'lodash'
//redux
import {connect} from "react-redux"
import { loadAlbums } from '../../../actions/albumsAction'
import { loadAlbum } from '../../../actions/albumAction'
import { bindActionCreators } from 'redux'


class PicturesContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      view:'picture-card',
      previewVisible: false,
      previewImage: '',
      previewMimeType:'',
      album:{},
      coverLoading:false,
      loading: false
    }
    this.toggleView = this.toggleView.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.renderPictures = this.renderPictures.bind(this)
    this.renderAlbums = this.renderAlbums.bind(this)
    this.updateLoading = this.updateLoading.bind(this)
    this.updateCoverLoading = this.updateCoverLoading.bind(this)
  }
  updateLoading(state){
    this.setState({loading:state})
  }
  updateCoverLoading(state){
    this.setState({coverLoading:state})
  }
  toggleView(event){
    this.setState({view:event.target.dataset.view})
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handleRemove = (file) => {
    Gallery({albumId:this.props.album.id, contentId:file.id}).Delete()
    .then(res=>{
      if(res.status === 200){
        this.renderPictures()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      previewMimeType: file.mimeType
    });
  }
  renderAlbums(){
    this.props.loadAlbums()
  }
  renderPictures(){
    this.props.loadAlbum(this.props.selected.id)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.selected.id != this.props.album.id){
      this.renderPictures()
    }
  }
  componentWillMount(){
    this.renderPictures()
  }
  render(){
    //console.log(this.props)
    return(
      <Pictures
        album={this.props.album}
        renderPictures={this.renderPictures}
        renderAlbums={this.renderAlbums}
        view={this.state.view}
        toggleView={this.toggleView}
        handlePreview={this.handlePreview}
        handleRemove={this.handleRemove}
        previewVisible={this.state.previewVisible}
        previewImage={this.state.previewImage}
        previewMimeType={this.state.previewMimeType}
        handleCancel={this.handleCancel}
        loading={this.state.loading}
        updateLoading={this.updateLoading}
        coverLoading={this.state.coverLoading}
        updateCoverLoading={this.updateCoverLoading}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  return {
    album: state.album,
  }
}
function mapDispatchToProps(dispatch){
  return {
    loadAlbums: bindActionCreators(loadAlbums, dispatch),
    loadAlbum: bindActionCreators(loadAlbum, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesContainer)
