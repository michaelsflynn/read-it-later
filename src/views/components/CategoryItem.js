// Component - Category Item

import React from 'react'
import PropTypes from 'prop-types'

class CategoryItem extends React.Component {
  render () {
    return (
      <li>
        {'Cat:' + this.props.category}
      </li>
    )
  }
}

CategoryItem.propTypes = {
  category: PropTypes.string.isrequired
}

export default CategoryItem
