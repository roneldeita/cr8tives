import React from 'react'
import Layout from '../components/templates/Layout'
import ManageMediaPage from '../components/media/ManageMediaPage'

class Index extends React.Component{
  render(){
    return(
      <Layout>
        <ManageMediaPage/>
      </Layout>
    )
  }
}

export default Index
