// Container
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { showArticles } from '../actions'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Layer from 'grommet/components/Layer'
import Paragraph from 'grommet/components/Paragraph'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'

const mapStateToProps = (state) => {
  return {
    srcFilter: state.setSources.srcFilter,
    showArticles: state.setArticles.showArticles,
    articles: state.setArticles.articles
  }
}

class ArticleList extends React.Component {
  constructor (props) {
    super()
    this._onClose = this._onClose.bind(this)
    this._goURL = this._goURL.bind(this)
  }
  _onClose () {
    this.props.dispatch(showArticles(false))
  }
  _goURL (url) {
    window.open(url)
  }
  render () {
    if (this.props.showArticles) {
      const articles = this.props.articles.map(art => (
        <Tile textAlign='center'
          separator='all'
          size='medium'
          key={art._id}
          onClick={() => this._goURL(art.url)}
        >
          <Image src={art.urlToImage} />
          <Label>{art.title}</Label>
          <Paragraph>{art.description}</Paragraph>
        </Tile>
      ))
      return (
        <Layer size='large' closer onClose={() => this.props.dispatch(showArticles(false))} >
          <Tiles size='large'>
            {articles}
          </Tiles>
        </Layer>
      )
    } else {
      return null
    }
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
}

const ArticlesLayer = connect(mapStateToProps)(ArticleList)

export default ArticlesLayer
