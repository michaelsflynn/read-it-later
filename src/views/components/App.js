// Component - Category List

import React from 'react'
import CategoryList from './CategoryList'

class App extends React.Component {
  render () {
    return (
    <div>
      <h1>Hello From React</h1>
      <CategoryList category={['Top News']} />
    </div>
    )
  }
}

export default App
