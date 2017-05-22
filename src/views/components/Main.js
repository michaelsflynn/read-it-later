// Component - Main App

import React from 'react'
import App from 'grommet/components/App'
import ArticleIcon from 'grommet/components/icons/base/Article'
import Button from 'grommet/components/Button'
import CloudIcon from 'grommet/components/icons/base/Cloud'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import SocialShare from 'grommet/components/SocialShare'
import Split from 'grommet/components/Split'
import Title from 'grommet/components/Title'
import CategorySideBar from '../containers/CategorySideBar'
import SourceTiles from '../containers/SourceTiles'
import ArticlesLayer from '../containers/ArticlesLayer'

class Main extends React.Component {
  render () {
    return (
      <App>
        <Header direction='row' justify='between' size='large'
          pad={{ horizontal: 'medium', between: 'small' }}>
          <Title size='large' pad={{ horizontal: 'medium' }}>
            <ArticleIcon size='large' />
            <span>Articly: Top News</span>
          </Title>
          <SocialShare type='twitter' link='www.twitter.com' />
          <SocialShare type='facebook' link='www.facebook.com' />
          <SocialShare type='linkedin' link='www.linkedin.com' />
          <Button label='Log Out' onClick={() => window.alert('Thank You')} />
        </Header>
        <Split flex='right'>
          <CategorySideBar />
          <SourceTiles />
        </Split>
        <Footer direction='row' justify='center' size='large'
          pad={{ horizontal: 'medium', between: 'small' }}>
          <Title size='medium' pad={{ horizontal: 'medium' }}>
            <CloudIcon />
            <span>Powered by newsAPI.org</span>
          </Title>
        </Footer>
        <ArticlesLayer />
      </App>
    )
  }
}

export default Main
