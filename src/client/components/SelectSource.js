import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'grommet/components/Select'

class SelectSource extends Component {
  render () {
    const srcOptions = this.props.sources.map(el => el.id)
    return (
      <Select
        value={this.props.input.value}
        options={srcOptions}
        onChange={this.props.input.onChange}
        onBlur={() => this.props.input.onBlur(this.props.input.value)}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    sources: state.setSources.sources
  }
}

export default connect(mapStateToProps)(SelectSource)
