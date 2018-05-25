import { Form, Select, Upload, Button, Icon, Modal } from 'antd'

const Item = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10},
}

export default ({form, display, change, preview, image, handlePreview, closePreview, filelist, submit}) => {
  const { isFieldTouched, getFieldError, getFieldDecorator } = form
  const TitleError = getFieldError('Title')
  const FilesError = getFieldError('Files')
  const UploadProps = {
    fileList:filelist,
    multiple: true,
    onPreview:handlePreview,
    listType:"picture-card",
    onChange: change,
    beforeUpload: (file) => {
      return false;
    },
  }
  return(
    <div style={{display: display ? 'block' : 'none'}}>
      <Form onSubmit={submit}>
        <Item
          label="Album"
          {...formItemLayout}
          validateStatus={TitleError ? 'error' : 'success'}
          help={TitleError || ''}>
          {getFieldDecorator('Title', {
            rules: [
              { required: true }
            ],
          })(
            <Select>
              <Option value="">Select Album</Option>
              <Option value="test">Test</Option>
            </Select>
          )}
        </Item>
        <Item
          label="Files"
          wrapperCol={{span:22}}
          labelCol={{span:2}}
          validateStatus={FilesError ? 'error' : 'success'}
          help={FilesError || ''}>
          {getFieldDecorator('Files', {
            rules: [
              { required: true }
            ],
          })(
            <Upload {...UploadProps}>
              <div>
                <Icon type="picture" /> / <Icon type="play-circle-o" />
                <div className="ant-upload-text">Select</div>
              </div>
            </Upload>
          )}
        </Item>
        <Item wrapperCol={{ span: 10, offset: 2}}>
          <Button type="primary" htmlType="submit">Upload</Button>
        </Item>
      </Form>
      <Modal visible={preview} footer={null} onCancel={closePreview}>
        <img alt="example" style={{ width: '100%' }} src={image} />
      </Modal>
    </div>
  )
}
