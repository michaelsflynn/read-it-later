import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCatFilter } from '../actions'
import Anchor from 'grommet/components/Anchor'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Title from 'grommet/components/Title'
import Sidebar from 'grommet/components/Sidebar'

const mapStateToProps = (state, ownProps) => {
  // console.log('Map State:', state)
  return {
    // active: ownProps.filter === state.setCategory.catFilter,
    // category: ownProps.category,
    catFilter: state.setCategory.catFilter,
    categories: state.setCategory.categories
  }
}

class CategoryList extends React.Component {
  constructor () {
    super()
    this._onCatClick = this._onCatClick.bind(this)
  }
  _onCatClick (val) {
    console.log('Click:', val)
    this.props.dispatch(setCatFilter(val))
  }
  render () {
    // console.log('Render Props:', this.props.categories)
    const categoryItems = this.props.categories.map(cat => (
      <Anchor
        href='#'
        key={cat.id}
        label={cat.category}
        onClick={() => this._onCatClick(cat.id)}
      />
     ))
     // console.log('Items:', categoryItems)
    return (
      <Sidebar colorIndex='neutral-3' fixed={false} size='small' >
        <Header size='small' justify='between' pad={{ horizontal: 'small' }}>
          <Title size='medium' >Select Category:</Title>
        </Header>
        <Menu fill={true} primary={true} >
          {categoryItems}
        </Menu>
      </Sidebar>
    )
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
}

const CategorySideBar = connect(mapStateToProps)(CategoryList)

export default CategorySideBar
