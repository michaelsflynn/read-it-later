import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ArticleIcon from 'grommet/components/icons/base/Article'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Title from 'grommet/components/Title'
import ButtonLogOut from './ButtonLogOut'

class Head extends Component {
  render () {
    return (
      <div>
        <Header direction='row' justify='between' size='large' >
          <Title size='large' pad={{ horizontal: 'medium' }}>
            <ArticleIcon size='large' />
            <span>Articly Top News Now</span>
          </Title>
          <Heading tag='h5'>Welcome! {this.props.email}</Heading>
          <Heading tag='h5'><Link to='/admin' >Admin</Link></Heading>
          <ButtonLogOut />
        </Header>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.setAuth.email
  }
}

export default connect(mapStateToProps)(Head)
