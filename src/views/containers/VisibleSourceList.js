// Container
import { connect } from 'react-redux'
import SourceList from '../components/SourceList'

const mapStateToProps = (state) => {
  console.log('VS State: ', state.setSources.srcFilter)
  return {
    srcFilter: state.setSources.srcFilter,
    sources: getVisibleSources(state.setSources.sources, state.setCategory.catFilter)
  }
}

const VisibleSourceList = connect(
  mapStateToProps
)(SourceList)

// Helper Function
const getVisibleSources = (sources, filter) => {
  return sources.filter(s => s.category === filter)
}

export default VisibleSourceList
