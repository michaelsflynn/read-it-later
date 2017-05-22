import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import { setSrcFilter, setArt, showArticles } from '../actions'
import Label from 'grommet/components/Label'
import Paragraph from 'grommet/components/Paragraph'
import Tile from 'grommet/components/Tile'
import Tiles from 'grommet/components/Tiles'
import ArticlesLayer from './ArticlesLayer'

const mapStateToProps = (state) => {
  return {
    srcFilter: state.setSources.srcFilter,
    sources: getVisibleSources(state.setSources.sources, state.setCategory.catFilter),
    showArticles: state.setArticles.showArticles
  }
}

class SourceList extends React.Component {
  constructor (props) {
    super()
    this._onSrcClick = this._onSrcClick.bind(this)
  }
  _onSrcClick (val) {
    this.props.dispatch(setSrcFilter(val))
    this.props.dispatch(showArticles(true))
    const url = 'https://newsapi.org/v1/articles?source=' + val + '&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
    fetch(url)
    .then(response => response.json())
    .then(data => this.props.dispatch(setArt(val, data)))
    .catch(err => console.log(err))
  }
  render () {
    const sourceItems = this.props.sources.map(src => (
      <Tile textAlign='center'
        separator='all'
        size='medium'
        key={src._id}
        onClick={() => this._onSrcClick(src.id)}
      >
        <Label>
          {src.name}
        </Label>
        <Paragraph size='medium' >
          {src.description}
        </Paragraph>
      </Tile>
    ))
    return (
      <Tiles size='small' >
        {sourceItems}
      </Tiles>
    )
  }
}

SourceList.propTypes = {
  sources: PropTypes.array.isRequired
}

// Helper Function
const getVisibleSources = (sources, filter) => {
  return sources.filter(s => s.category === filter)
}

const SourceTiles = connect(mapStateToProps)(SourceList)

export default SourceTiles
