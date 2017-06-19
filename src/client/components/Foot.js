import React, { Component } from 'react'
import CloudIcon from 'grommet/components/icons/base/Cloud'
import Footer from 'grommet/components/Footer'
import Title from 'grommet/components/Title'

class Foot extends Component {
  render () {
    return (
      <div>
        <Footer direction='row' justify='center' size='large' >
          <Title size='medium' pad={{ horizontal: 'medium' }}>
            <CloudIcon />
            <span>Powered by newsAPI.org</span>
          </Title>
        </Footer>
      </div>
    )
  }
}

export default Foot
