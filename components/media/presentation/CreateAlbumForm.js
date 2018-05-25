import { Form, Input, Button, Checkbox } from 'antd'
const Item = Form.Item
const TextArea = Input.TextArea

export default ({form, display, submit}) => {
  const { isFieldTouched, getFieldError, getFieldDecorator } = form
  const TitleError = getFieldError('Title')
  const DescError = getFieldError('Description')
  return(
    <div style={{display: display ? 'block' : 'none', marginTop:'15px'}}>
      <Form onSubmit={submit}>
        <Item
          validateStatus={TitleError ? 'error' : 'success'}
          help={TitleError || ''}>
          {getFieldDecorator('Title', {
            rules: [
              { required: true }
            ],
          })(
            <Input placeholder="Title"/>
          )}
        </Item>
        <Item
          validateStatus={DescError ? 'error' : 'success'}
          help={DescError || ''}>
          {getFieldDecorator('Description', {
            rules: [
              { required: true }
            ],
          })(
            <TextArea rows={3} placeholder="Description"/>
          )}
        </Item>
        <Item>
          {
            getFieldDecorator('Featured')
            (<Checkbox>Featured</Checkbox>)
          }
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Create Album</Button>
        </Item>
      </Form>
    </div>
  )
}
