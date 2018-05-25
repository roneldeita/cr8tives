import React from 'react'
import CreateAlbumForm from '../presentation/CreateAlbumForm'
import { Form } from 'antd'

class CreateAlbumContainer extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event){
    this.props.form.validateFields((err, values) => {
      if (!err) {

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
        submit={this.handleSubmit}
        />
    )
  }
}

export default Form.create()(CreateAlbumContainer)
