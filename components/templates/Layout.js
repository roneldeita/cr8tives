import React from 'react'
import Head from 'next/head'
import { Layout, Menu, Icon } from 'antd'
const { Header, Footer, Sider, Content } = Layout

class PageLayout extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      cpllapsed:false
    }
  }
  toggle = () => {
   this.setState({
     collapsed: !this.state.collapsed,
   });
 }
  render(){
    return(
      <div>
        <Head>
          <link rel="stylesheet" href="http://cdn.bootcss.com/antd/3.3.0/antd.min.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"/>
        </Head>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{minHeight:'100vh'}}
          >
            <div className="logo"><Icon type="camera"/></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="video-camera"/>
                <span>Manage Media</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff',}}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content className="container">{this.props.children}</Content>
          </Layout>
        </Layout>
        <style jsx global>{`
          html, body{
            font-family: 'Roboto', sans-serif;
          }
          .container{
            padding:30px;
          }
          .border{
            border: 1px solid #000000
          }
          .logo {
            height: 32px;
            background: rgba(255,255,255,.2);
            margin: 16px;
            font-size:20px;
            color: #ffffff;
            text-align:center
          }
        `}
        </style>
      </div>
    )
  }
}

export default PageLayout
