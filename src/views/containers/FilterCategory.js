import { connect } from 'react-redux'
import { setCatFilter } from '../actions'
import CategoryItem from '../components/CategoryItem'

const mapStateToProps = (state, ownProps) => {
  console.log('FC State: ' + state.setCategory.catFilter + ' == ' + ownProps.filter)
  return {
    active: ownProps.filter === state.setCategory.catFilter,
    category: ownProps.category
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCatClick: () => {
      console.log('FC Meth: ', ownProps.filter)
      dispatch(setCatFilter(ownProps.filter))
    }
  }
}

const FilterCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem)

export default FilterCategory
