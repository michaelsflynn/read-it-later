// Component - Category Item

import React from 'react'
import PropTypes from 'prop-types'

class CategoryItem extends React.Component {
  render () {
    if (this.props.active) {
      return <span>{this.props.category}</span>
    }
    return (
      <a href='#'
        onClick={this.props.onCatClick}
      >
        {this.props.category}
      </a>
    )
  }
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onCatClick: PropTypes.func.isRequired
}

export default CategoryItem
