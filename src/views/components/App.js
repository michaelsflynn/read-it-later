// Component - Main App

import React from 'react'
import Header from '../components/Header'
import VisibleCategoryList from '../containers/VisibleCategoryList'
import VisibleSourceList from '../containers/VisibleSourceList'
import VisibleArticleList from '../containers/VisibleArticleList'
import Footer from '../components/Footer'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <VisibleCategoryList />
        <VisibleSourceList />
        <VisibleArticleList />
        <Footer />
      </div>
    )
  }
}

export default App
