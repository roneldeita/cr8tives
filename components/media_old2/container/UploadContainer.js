import React from 'react'
import UploadForm from '../presentation/UploadForm'
import { Form } from 'antd'

class UploadContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileList:[],
      preview: false,
      image:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.closePreview = this.closePreview.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(info){
    let {fileList} = info
    this.setState({fileList});
  }
  handlePreview = (file) => {
    this.setState({
      image: file.url || file.thumbUrl,
      preview: true,
    });
  }
  closePreview = () => {
    this.setState({preview:false})
  }
  handleSubmit(event){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }else{

      }
    })
    event.preventDefault()
  }
  render(){
    return(
      <UploadForm
        filelist={this.state.fileList}
        preview={this.state.preview}
        image={this.state.image}
        handlePreview={this.handlePreview}
        closePreview={this.closePreview}
        change={this.handleChange}
        display={this.props.display}
        form={this.props.form}
        submit={this.handleSubmit}
        />
    )
  }
}

export default Form.create()(UploadContainer)
