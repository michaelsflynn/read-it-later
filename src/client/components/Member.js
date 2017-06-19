import React, { Component } from 'react'
import Split from 'grommet/components/Split'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Paragraph from 'grommet/components/Paragraph'
import Head from './Head'
import Foot from './Foot'
import SidebarNav from '../containers/SidebarNav'
import ArticlesLayer from '../containers/ArticlesLayer'
import ArticlesSaved from '../containers/ArticlesSaved'

class Member extends Component {
  render () {
    console.log('Member Component Rendered')
    return (
      <div>
        <Head />
          <Tabs justify={'end'}>
            <Tab title='Top News'>
              <Split flex='right'>
                <SidebarNav />
                <ArticlesLayer />
              </Split>
            </Tab>
            <Tab title='Saved Articles'>
              <Paragraph>These are Saved Articles you have Selected</Paragraph>
              <ArticlesSaved />
            </Tab>
          </Tabs>
        <Foot />
      </div>
    )
  }
}

export default Member
