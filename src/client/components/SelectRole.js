import React, { Component } from 'react'
import Select from 'grommet/components/Select'

class SelectRole extends Component {
  render () {
    return (
      <Select
        value={this.props.input.value}
        options={['Member', 'Admin']}
        onChange={this.props.input.onChange}
        onBlur={() => this.props.input.onBlur(this.props.input.value)}
      />
    )
  }
}

export default SelectRole
