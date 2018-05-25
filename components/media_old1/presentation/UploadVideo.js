import { Form, Upload, Row, Col, Icon, Input, Button } from 'antd'

const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20},
    }
const tailFormItemLayout = {
      wrapperCol: { span: 20, offset: 4,},
    }
export default ({form, filelist, handleChange, validateFile, buttonState, buttonText, upload}) => {
  const { isFieldTouched, getFieldError, getFieldDecorator } = form
  const UploadProps = {
    fileList:filelist,
    onChange: handleChange,
    beforeUpload: (file) => {
      return false;
    },
  }
  return(
    <div>
      <Row type="flex" justify="center">
        <Col span={12}>
          <div style={{height:'200px'}}>
            <Form onSubmit={upload}>
              <Form.Item
                {...formItemLayout}
                label="Video Title"
                validateStatus={getFieldError('Video Title') ? 'error' : 'success'}
                help={getFieldError('Video Title') || ''}>
                {getFieldDecorator('Video Title', {
                  rules: [
                    { required: true }
                  ],
                })(
                  <Input placeholder="Video Title" size="large"/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Video Description"
                validateStatus={getFieldError('Video Description') ? 'error' : 'success'}
                help={getFieldError('Video Description') || ''}>
                {getFieldDecorator('Video Description', {
                  rules: [
                    { required: true }
                  ],
                })(
                  <Input.TextArea type="textarea" placeholder="Video Description" rows={4}/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="File"
                validateStatus={getFieldError('File') ? 'error' : 'success'}
                help={getFieldError('File') || ''}>
                {getFieldDecorator('File', {
                  rules: [
                    { required: true },
                    { validator: validateFile }
                  ],
                })(
                  <Upload {...UploadProps}>
                    <Button>
                      <Icon type="upload" /> Select File
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={buttonState}>{buttonText}</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <style jsx global>{`
        /*.ant-upload-list-item:hover .ant-upload-list-item-info + .anticon.anticon-cross{
          display:none !important
        }*/
      `}
      </style>
    </div>
  )
}
