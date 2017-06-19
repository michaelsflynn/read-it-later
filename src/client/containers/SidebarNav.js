import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setCatFilter, setSrcFilter, setArt } from '../actions'
import Anchor from 'grommet/components/Anchor'
import Menu from 'grommet/components/Menu'
import Sidebar from 'grommet/components/Sidebar'
import Select from 'grommet/components/Select'
import Heading from 'grommet/components/Heading'

class SidebarNav extends React.Component {
  render () {
    console.log('Sidebar Component Rendered', this.props.srcFilter)
    // const { handleSubmit } = this.props
    const sourceItems = this.props.sources.map(src => (
      <Anchor
        href='#'
        key={src.id}
        label={src.name}
        onClick={() => this.props._onSrcClick(src.id)}
      />
     ))
    const catOptions = this.props.categories.map(cat => cat.category)

    return (
      <div>
        <Heading tag='h4' >Select Category:</Heading>
        <Menu >
          <Select
            options={catOptions}
            onChange={(obj) => this.props._onCatClick(obj.value)}
            value={this.props.catFilter}
            />
        </Menu>
        <Sidebar colorIndex='neutral-3' fixed={false} size='small'>
          <Heading tag='h4' >Available Sources:</Heading>
          <Menu inline fill primary >
            {sourceItems}
          </Menu>
        </Sidebar>
      </div>
    )
  }
}

SidebarNav.propTypes = {
  categories: PropTypes.array.isRequired,
  sources: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    catFilter: state.setCategory.catFilter,
    categories: state.setCategory.categories,
    srcFilter: state.setSources.srcFilter,
    sources: getVisibleSources(state.setSources.sources, state.setCategory.catFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _onSrcClick: (val) => {
      console.log('Source Click Props:', val)
      dispatch(setSrcFilter(val))
      const url = 'https://newsapi.org/v1/articles?source=' + val + '&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
      axios.get(url)
      .then(response => dispatch(setArt(val, response.data)))
      .catch(err => console.log(err))
    },
    _onCatClick: (val) => {
      console.log('Category Click Val:', val)
      dispatch(setCatFilter(val))
    }
  }
}

// Helper Function
const getVisibleSources = (sources, filter) => {
  return sources.filter(s => s.category === filter)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
