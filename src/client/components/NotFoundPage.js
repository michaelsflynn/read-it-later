import React, { Component } from 'react'
import Headline from 'grommet/components/Headline'
import Paragraph from 'grommet/components/Paragraph'

class NotFoundPage extends Component {

  render () {
    return (
      <div>
        <Headline>404: Page Not Found</Headline>
        <Paragraph>We're sorry, the page you were looking for cannot be found! Please try another page.</Paragraph>
      </div>
    )
  }
}
export default NotFoundPage
