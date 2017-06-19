import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'grommet/components/Select'

class SelectCategory extends Component {
  render () {
    const catOptions = this.props.categories.map(el => el.category)
    return (
      <Select
        value={this.props.input.value}
        options={catOptions}
        onChange={this.props.input.onChange}
        onBlur={() => this.props.input.onBlur(this.props.input.value)}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    categories: state.setCategory.categories
  }
}

export default connect(mapStateToProps)(SelectCategory)
