import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'
import Menu from 'grommet/components/Menu'
import Paragraph from 'grommet/components/Paragraph'
import Head from './Head'
import Foot from './Foot'

class Admin extends Component {
  render () {
    if (this.props.role === 'Admin') {
      return (
        <div>
          <Head />
          <Heading>Refresh System Data</Heading>
          <Paragraph>Click Source to update Source data from the API. Click Category to recalculate unique categories.  All data is updated in mongoDB.</Paragraph>
          <Menu inline >
            <Button label='Update Sources' onClick={() => { window.alert('Fetching Sources from API!') }} />
            <Button label='Get Categories' onClick={() => { window.alert('Fetching Categories from Sources Data!') }} />
          </Menu>
          <Foot />
        </div>
      )
    } else {
      return (
        <div>
          <Head />
          <Heading>You have not been granted Admin access!</Heading>
          <Foot />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.setAuth.role
  }
}

export default connect(mapStateToProps)(Admin)
