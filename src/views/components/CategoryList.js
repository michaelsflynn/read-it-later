// Component - Category List

import React from 'react'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'

class CategoryList extends React.Component {
  render () {
    return (
      <div>
        <h3>Category List:</h3>
        <ul>
          {this.props.category.map(cat => (
            <CategoryItem
              key={cat[0]}
              {...cat}
              onClick={() => this.props.onCatClick(cat.id)}
           />
         ))}
        </ul>
      </div>)
  }
}

CategoryList.PropTypes = {
  category: PropTypes.string.isrequired
}

export default CategoryList
