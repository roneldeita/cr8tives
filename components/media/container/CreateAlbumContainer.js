import React from 'react'
import CreateAlbumForm from '../presentation/CreateAlbumForm'
import { Form } from 'antd'
import { Gallery } from '../../../services/api'
import {connect} from "react-redux"
import { loadAlbums } from '../../../actions/albumsAction'
import { bindActionCreators } from 'redux'

class CreateAlbumContainer extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Gallery({title:values.Title, description:values.Description, isFeatured:values.Featured}).New()
        .then(res=>{
          this.props.loadAlbums()
          this.props.form.resetFields()
        }).catch(err=>{
          console.log(err)
        })
      }else{

      }
    })
    event.preventDefault()
  }
  render(){
    return(
      <CreateAlbumForm
        display={this.props.display}
        form={this.props.form}
        submit={this.handleSubmit}/>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadAlbums: bindActionCreators(loadAlbums, dispatch),
  }
}

export default Form.create()(connect(null, mapDispatchToProps)(CreateAlbumContainer))
