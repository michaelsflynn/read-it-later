// Component - Source List

import React from 'react'
import PropTypes from 'prop-types'
import FilterSource from '../containers/FilterSource'

class SourceList extends React.Component {
  render () {
    return (
      <div>
        <h3>Available Sources:</h3>
        <ul>
          {this.props.sources.map(src => (
            <FilterSource
              key={src._id}
              id={src.id}
              filter={src.id}
              name={src.name}
              desc={src.description}
              url={src.url}
              onClick={this.props.onSrcClick}
            >
              {src.name}
            </FilterSource>
         ))}
        </ul>
      </div>)
  }
}

SourceList.propTypes = {
  sources: PropTypes.array.isRequired
}

export default SourceList
