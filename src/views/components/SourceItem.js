// Component - Source Item

import React from 'react'
import PropTypes from 'prop-types'

class SourceItem extends React.Component {
  render () {
    if (this.props.active) {
      return (
        <li>
          {this.props.source}
          {': '}{this.props.desc}
        </li>
      )
    }
    return (
      <li>
        <a href='#'
          onClick={this.props.onSrcClick}
        >
          {this.props.source}
        </a>
        {': '}{this.props.desc}
      </li>
    )
  }
}

SourceItem.propTypes = {
  source: PropTypes.string.isRequired,
  onSrcClick: PropTypes.func.isRequired
}

export default SourceItem
