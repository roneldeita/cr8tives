import { Form, Input, Button } from 'antd'

const Item = Form.Item
const TextArea = Input.TextArea
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10},
}

export default ({form, display, submit}) => {
  const { isFieldTouched, getFieldError, getFieldDecorator } = form
  const TitleError = getFieldError('Title')
  const DescError = getFieldError('Description')
  return(
    <div style={{display: display ? 'block' : 'none'}}>
      <Form onSubmit={submit}>
        <Item
          label="Title"
          {...formItemLayout}
          validateStatus={TitleError ? 'error' : 'success'}
          help={TitleError || ''}>
          {getFieldDecorator('Title', {
            rules: [
              { required: true }
            ],
          })(
            <Input/>
          )}
        </Item>
        <Item
          label="Description"
          {...formItemLayout}
          validateStatus={DescError ? 'error' : 'success'}
          help={DescError || ''}>
          {getFieldDecorator('Description', {
            rules: [
              { required: true }
            ],
          })(
            <TextArea/>
          )}
        </Item>
        <Item wrapperCol={{ span: 10, offset: 2}}>
          <Button type="primary" htmlType="submit">Create</Button>
        </Item>
      </Form>
    </div>
  )
}
