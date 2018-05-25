import React from 'react'
import { Form, Row, Col, Pagination, Divider, Icon, Button } from 'antd'
//container
import PicturesContainer from '../container/PicturesContainer'
import CreateAlbumContainer from '../container/CreateAlbumContainer'
//presentation
import AlbumCard from '../presentation/AlbumCard'
import NoSelected from '../presentation/NoSelected'
//lodash
import { first, isEmpty, isEqual } from 'lodash'
//redux
import {connect} from "react-redux"
import { loadAlbums } from '../../../actions/albumsAction'
import { loadAlbum } from '../../../actions/albumAction'
import { bindActionCreators } from 'redux'
//services
import { Gallery } from '../../../services/api'

class AlbumContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current: 1,
      total:0,
      page_count:0,
      items_per_page: 6,
      albums_per_page:[],
      albums:[],
      selected_card:[]
    }
    this.selectedCard = this.selectedCard.bind(this)
    this.deleteAlbum = this.deleteAlbum.bind(this)
    this.updateAlbum = this.updateAlbum.bind(this)
    this.toggleAlbum = this.toggleAlbum.bind(this)
  }
  toggleAlbum(album){
    Gallery({albumId:album.id, isActive: !album.isActive}).UpdateAlbum()
    .then(res=>{
      console.log(res)
      this.props.loadAlbums()
    }).catch(err=>{
      console.log(err)
    })
  }
  updateAlbum(event){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const NewDetails = {
          albumId:values.AlbumId,
          title:values.Title,
          description:values.Description,
          isFeatured:values.Featured
        }
        Gallery(NewDetails).UpdateAlbum()
        .then(res => {
          this.props.loadAlbums()
        }).catch(err=>{
          console.log(err)
        })
      }else{

      }
    })
    event.preventDefault()
  }
  renderAlbums(){
    return this.state.albums_per_page.map((album,index) => (
      <Col key={index} className="gutter-row" span={8}>
        <AlbumCard
          form={this.props.form}
          submit={this.updateAlbum}
          album={album}
          toggle={this.toggleAlbum}
          selected={this.selectedCard}
          deleteAlbum={this.deleteAlbum}/>
      </Col>
    ))
  }
  goToPage = (page, pageSize) =>{
    const end =  page * pageSize
    const start = end - pageSize
    this.setState({current: page})
    this.renderPaginate(start, end)
  }
  renderPaginate(start, end){
    const Slice = this.state.albums.slice(start, end)
    this.setState({albums_per_page:Slice})
  }
  deleteAlbum(album){
    Gallery({albumId:album.id}).DeleteAlbum()
    .then(res=>{
      if(res.status === 200){
        this.props.loadAlbums()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  selectedCard(album){
    this.setState({selected_card:album})
  }
  initializeAlbums(paginate){
    this.setState({total:Object.keys(this.state.albums).length})
    this.setState({page_count:Math.round(Object.keys(this.state.albums).length / this.state.items_per_page)})

    // if(paginate){
    //   this.renderPaginate(0, this.state.items_per_page)
    // }else{
    const end =  this.state.current * this.state.items_per_page
    const start = end - this.state.items_per_page
    this.renderPaginate(start, end)
    //}

  }
  componentDidMount(){
    this.setState({selected_card:this.props.album})
  }
  componentWillReceiveProps(nextProps){
    //console.log(nextProps)
    if(nextProps){
      if(!isEqual(nextProps.albums, this.props.albums)){
        setTimeout(()=>{
          this.setState({albums:nextProps.albums})
          this.initializeAlbums(false)
        },500)
      }
      // if(nextProps.albums.length != this.props.albums.length){
      //   setTimeout(()=>{
      //     this.setState({albums:nextProps.albums})
      //   //  this.initializeAlbums(true)
      //   }, 500)
      // }
    }
  }
  render(){
    //console.log(this.props)
    return(
      <div>
        <Row gutter={15}>
          <Col span={9}>
            <div>
              <div>
                <Button
                  ghost
                  icon={this.props.createAlbum? 'minus-circle-o' : 'plus-circle-o'}
                  type={this.props.createAlbum? 'danger' : 'primary'}
                  onClick={this.props.toggleCreateAlbum}>{this.props.createAlbum ? 'Close Form' : 'Create Album'}</Button>
              </div>
              <CreateAlbumContainer display={this.props.createAlbum}/>
              <Divider/>
            </div>
            <Row gutter={15}>
              {this.renderAlbums()}
            </Row>
            <Pagination
              size="small"
              showQuickJumper
              current={this.state.current}
              pageSize={this.state.items_per_page}
              total={this.state.total}
              onChange={this.goToPage}
              onShowSizeChange={this.pageSizeChange, this.pageSizeChange}
              style={{marginBottom:'20px'}}/>
          </Col>
          <Col span={15}>
            {
              isEmpty(this.state.selected_card) ?
              <NoSelected/> :
              <PicturesContainer selected={this.state.selected_card}/>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

// function mapStateToProps(state, ownProps){
//   return {
//     album: state.album,
//   }
// }
function mapDispatchToProps(dispatch){
  return {
    loadAlbums: bindActionCreators(loadAlbums, dispatch),
    loadAlbum: bindActionCreators(loadAlbum, dispatch),
  }
}

export default Form.create()(connect(null, mapDispatchToProps)(AlbumContainer))
