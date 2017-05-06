// Container
import { connect } from 'react-redux'
import { setCatFilter } from '../actions'
import CategoryList from '../components/CategoryList'

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCatClick: (id) => {
      dispatch(setCatFilter(id))
    }
  }
}

const VisibleCategoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default VisibleCategoryList
