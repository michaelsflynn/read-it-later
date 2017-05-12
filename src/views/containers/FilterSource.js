import { connect } from 'react-redux'
import fetch from 'node-fetch'
import { setSrcFilter } from '../actions'
import { setArt } from '../actions'
import SourceItem from '../components/SourceItem'

const mapStateToProps = (state, ownProps) => {
  console.log('FS State: ' + state.setSources.srcFilter + ' == ' + ownProps.filter + state.setArticles.articles)
  return {
    active: ownProps.filter === state.setSources.srcFilter,
    source: ownProps.name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSrcClick: () => {
      const url = 'https://newsapi.org/v1/articles?source=' + ownProps.filter + '&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
      fetch(url)
      .then(response => response.json())
      .then(data => dispatch(setArt(ownProps.filter, data)))
      .then(dispatch(setSrcFilter(ownProps.filter)))
      .catch(err => console.log(err))
    }
  }
}

const FilterSource = connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceItem)

export default FilterSource
