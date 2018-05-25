import React from 'react'
import ReactS3 from '../../lib/react-s3-master'
import axios from 'axios'
import { camelCase } from 'lodash'
import UploadVideo from './presentation/UploadVideo'
import Gallery from './presentation/Gallery'
import { Form, Divider } from 'antd'

class MediaContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      buttonState:false,
      buttonText:'Start Upload',
      fileList:[]
    }
    this.validateFile = this.validateFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }
  validateFile = (rule, value, callback) => {
    //console.log(value)
    if(value !== undefined){
      value.fileList.map(file => {
        if(file.type !== 'video/mp4'){
          callback('I can only accept .mp4 file')
        }
      })
      if(value.fileList.length > 1){
        callback('You can only select no more than one file')
      }
      if(value.fileList.length === 0){
        callback('File is required')
      }
    }

    callback()
  }
  clearForm(){
    this.props.form.resetFields()
    this.setState({fileList:[]})
  }
  handleChange(info){
    let {fileList} = info
    this.setState({fileList});
  }
  buttonStateDefault(){
    setTimeout(()=>{
      this.setState({buttonState:false})
      this.setState({buttonText:'Start Upload'})
    }, 500)
  }
  handleUpload(event){
    this.setState({buttonState:true})
    this.setState({buttonText:'Uploading File'})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const config = {
          bucketName: 'gprsv2',
          albumName: 'creatives',
          region: 'ap-southeast-1',
          accessKeyId: 'AKIAJYS7YQXKNVYMW4FA',
          secretAccessKey: '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',
        }
        ReactS3.upload(this.state.fileList[0], config)
        .then((res) => {
          this.setState({buttonText:'Creating Record'})
          const Data = {}
          Object.entries(values).forEach(([index, value])=>{
            if(index === 'Video Title'){
              index = 'title'
            }
            if(index === 'Video Description'){
              index = 'description'
            }
            if(index === 'File'){
              index = 'Location'
              value = res.location
            }
            Data[camelCase(index)]=value
          })
          axios.post('http://103.16.170.117:1300/videos', Data, {headers:{token:'thisisawesomeasfuck'}})
          .then((res)=>{
            console.log(res)
            this.clearForm()
            this.setState({buttonState:false})
            this.setState({buttonText:'Start Upload'})
          })
          .catch((err)=>{
            this.setState({buttonState:false})
            this.setState({buttonText:'Start Upload'})
          })
        })
        .catch((err) => {
          this.setState({buttonState:false})
          this.setState({buttonText:'Start Upload'})
        })
      }else{
        this.setState({buttonState:false})
        this.setState({buttonText:'Start Upload'})
      }
    })
    event.preventDefault()
  }
  render(){
    return(
      <div>
        <UploadVideo
          form={this.props.form}
          filelist={this.state.fileList}
          validateFile={this.validateFile}
          handleChange={this.handleChange}
          buttonState={this.state.buttonState}
          buttonText={this.state.buttonText}
          upload={this.handleUpload}
          />
        <Divider/>
        <Gallery/>
      </div>
    )
  }
}

export default Form.create()(MediaContainer)
