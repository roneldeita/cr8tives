import { Card, Icon, Switch, Popover, Popconfirm, Form, Input, Button, Checkbox } from 'antd';
const Item = Form.Item
const TextArea = Input.TextArea

export default ({form, submit, toggle,  album, selected, deleteAlbum}) => {
  const albumCover = album.cover === "" ? '/static/images/notfound.png' : album.cover
  const { isFieldTouched, getFieldError, getFieldDecorator } = form
  const TitleError = getFieldError('Title')
  const DescError = getFieldError('Description')
  const handleEditForm = (visible) => {
    if(visible === false){
      form.resetFields()
    }else{
      form.setFieldsValue({'AlbumId':album.id})
      form.setFieldsValue({'Title':album.title})
      form.setFieldsValue({'Description':album.description})
      form.setFieldsValue({'Featured':album.isFeatured})
    }
  }
  const EditForm = (album) => {
    return (
      <Form onSubmit={submit} style={{width:'400px'}}>
        <Item style={{display:'none'}}>
          {getFieldDecorator('AlbumId')(<Input/>)}
        </Item>
        <Item
          validateStatus={TitleError ? 'error' : 'success'}
          help={TitleError || ''}>
          {getFieldDecorator('Title', {
            rules: [
              { required: true  }
            ]
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
            ]
          })(
            <TextArea rows={3} placeholder="Description"/>
          )}
        </Item>
        <Item style={{marginBottom:0}}>
          {getFieldDecorator('Featured', {valuePropName: 'checked'})
          (<Checkbox>Featured</Checkbox>)}
        </Item>
        <Item style={{marginBottom:0, textAlign:'right'}}>
          <Button type="primary" htmlType="submit">Save Information</Button>
        </Item>
      </Form>
    )
  }
  return(
    <Card
      hoverable
      style={{ width: '100%', marginBottom:'10px' }}
      cover={
        <img
          onClick={() => selected(album)}
          alt={albumCover}
          src={albumCover}
          style={{height:'120px',
          objectFit: 'cover'}} />}
      actions={[
        <Switch size="small" checked={album.isActive} onChange={()=> toggle(album)}/>,
        <Popover
          style={{marginBottom:'0px'}}
          trigger="click"
          placement="rightBottom"
          onVisibleChange={handleEditForm}
          content={ EditForm(album)}>
          <Icon type="edit"/>
        </Popover>,
        <Popconfirm
          placement="right"
          title="Are you sure you want to delete this album?"
          onConfirm={() => deleteAlbum(album)}
          okText="Yes"
          cancelText="No">
          <Icon type="delete"/>
        </Popconfirm>
      ]}
     >
      <Card.Meta
        title={album.title}
        description={album.description}
        onClick={() => selected(album)}
      />
      <style jsx global>{`
        .ant-card-meta-description{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}
      </style>
   </Card>
  )
}
