// Component - Source List

import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import { setSrcFilter, setArt } from '../actions'
import ArticleItem from '../components/ArticleItem'

class ArticleList extends React.Component {
  constructor (props) {
    super()
    this.props = props
    const dispatch = this.props.dispatch
    const url = 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
    fetch(url)
    .then(response => response.json())
    .then(data => dispatch(setArt(this.props.srcFilter, data)))
    .then(dispatch(setSrcFilter(this.props.srcFilter)))
    .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        <h3>Top Articles From:{' '}{this.props.srcFilter}</h3>
        <ul>
          {this.props.articles.map(art => (
            <ArticleItem
              key={art._id}
              title={art.title}
              desc={art.decsription}
              url={art.url}
              image={art.urlToImage}
            >
              {art.title}
            </ArticleItem>
         ))}
        </ul>
      </div>
    )
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
}

export default ArticleList
