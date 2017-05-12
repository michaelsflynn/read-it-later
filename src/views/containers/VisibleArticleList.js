// Container
import React from 'react'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleList'

const mapStateToProps = (state) => {
  console.log(state.setArticles)
  return {
    srcFilter: state.setSources.srcFilter,
    articles: state.setArticles.articles
  }
}

const VisibleArticleList = connect(
  mapStateToProps
)(ArticleList)

export default VisibleArticleList
