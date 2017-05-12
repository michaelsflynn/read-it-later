// Component - Source Item

import React from 'react'
import PropTypes from 'prop-types'

class ArticleItem extends React.Component {
  render () {

    return (
      <li>
        <a href={this.props.url} target='_blank' >
          {this.props.title}
        </a>
        {': '}{this.props.desc}
      </li>
    )
  }
}

ArticleItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.func.isRequired
}

export default ArticleItem
