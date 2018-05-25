import {Card, Collapse, Row, Col, Upload, Button, Icon, Modal, Tag, message } from 'antd'
const Dragger = Upload.Dragger

export default ({form, coverLoading, updateCoverLoading, upload, loading, updateLoading, renderPictures, renderAlbums, album, view, toggleView, handlePreview, handleRemove, previewVisible, previewImage, previewMimeType, handleCancel}) => {
  const Cover = (
    <div>
      <Icon type={coverLoading ? 'loading' : 'plus'}/>
      <div className="ant-upload-text">{coverLoading ? 'Uploading...': 'Upload'}</div>
    </div>
  )
  const uploadButtonDragger = (
    <div>
      <p className="ant-upload-drag-icon">
        <Icon type={loading ? 'loading' : 'upload'} />
      </p>
      <p className="ant-upload-text">{loading ? 'Uploading...' : 'Click or drag file to this area to upload'}</p>
    </div>
  )
  const UploadCoverConfig = {
    accept:'video/*,image/*',
    name:'cover',
    listType:"picture-card",
    className:"avatar-uploader",
    showUploadList:false,
    action:'http://10.10.1.223:1900/albums/'+ album.id +'/covers',
    onChange(info){
      const status = info.file.status;
      if(status === 'uploading'){
        updateCoverLoading(true)
      }
      if(status === 'done'){
        updateCoverLoading(false)
        message.success('Cover successfully updated')
        renderPictures()
        renderAlbums()
      }
    }
  }
  const UploadConfig = {
    accept:'video/*,image/*',
    name:'contents',
    multiple:true,
    action:'http://10.10.1.223:1900/albums/'+ album.id +'/contents',
    showUploadList:false,
    onChange(info){
      const status = info.file.status
      if(status === 'uploading'){
        updateLoading(true)
      }
      if(status === 'done'){
        updateLoading(false)
        message.success('Upload complete.')
        renderPictures()
      }else if (status === 'error') {
        updateLoading(false)
        message.error('file upload failed.');
      }
    }
  }
  const UploadListConfig = {
    listType:view,
    fileList:album.contents,
    onPreview:handlePreview,
    onRemove:handleRemove
  }
  console.log(album)
  return(
    <Card>
      <Collapse bordered={false}>
        <Collapse.Panel header={<div>{album.title} {album.isFeatured ? <Tag color="#87d068">Featured</Tag>: null }</div>}>
          <Upload {...UploadCoverConfig} disabled={coverLoading}>
            { album.cover && !coverLoading ? <img src={album.cover} style={{height:'200px', width:'200px', objectFit: 'cover'}}/> : Cover}
          </Upload>
          <div>{album.description}</div>
        </Collapse.Panel>
      </Collapse>
      <div style={{margin:'5px 0px', textAlign:'right'}}>
        <Button size="small" shape="circle" icon="appstore-o" style={{marginRight:'3px'}}
          data-view="picture-card"
          onClick={toggleView}/>
        <Button size="small" shape="circle" icon="bars"
          data-view="text"
          onClick={toggleView}/>
      </div>
      <Dragger {...UploadConfig} disabled={loading}>
        {uploadButtonDragger}
      </Dragger>
      <Upload {...UploadListConfig}>
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel} destroyOnClose>
        {(previewMimeType === "video/mp4") ?
          <video style={{width:'100%'}} controls autoPlay><source src={previewImage} type={previewMimeType}/></video> :
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        }
      </Modal>
      <style jsx global>{`
        .avatar-uploader > .ant-upload {
          width: 200px !important;
          height: 200px !important;
        }
        .ant-upload-list-picture-card .ant-upload-list-item{
          margin-top:10px
        }
      `}
      </style>
    </Card>
  )
}
