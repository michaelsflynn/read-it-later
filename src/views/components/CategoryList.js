// Component - Category List

import React from 'react'
import PropTypes from 'prop-types'
import FilterCategory from '../containers/FilterCategory'

class CategoryList extends React.Component {
  render () {
    return (
      <div>
        <h3>Select Category:</h3>
        {this.props.categories.map(cat => (
          <text>
            <FilterCategory
              filter={cat.id}
              category={cat.category}
              key={cat._id}
            >
              {cat.category}
            </FilterCategory>
            {' | '}
          </text>
         ))}
      </div>)
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
}

export default CategoryList
