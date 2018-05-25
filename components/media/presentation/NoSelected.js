import { Card, Icon } from 'antd'
const NoSelected = {
  height:'65vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Content = {
  textAlign:'center',
  maxWidth: '100%'
}

export default() =>(
  <Card style={NoSelected}>
    <div style={{ fontSize:'32px', ...Content}}><Icon type="folder"/></div>
    <div style={Content}>No Album Selected</div>
  </Card>
)
