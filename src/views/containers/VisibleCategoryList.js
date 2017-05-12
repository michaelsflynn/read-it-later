// Container
import { connect } from 'react-redux'
import { setCatFilter } from '../actions'
import CategoryList from '../components/CategoryList'

const mapStateToProps = (state) => {
  return {
    catFilter: state.setCategory.catFilter,
    categories: state.setCategory.categories
  }
}

const VisibleCategoryList = connect(
  mapStateToProps
)(CategoryList)

export default VisibleCategoryList
