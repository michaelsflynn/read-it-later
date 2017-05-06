// Index.js in Views = Main App Page
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './views/reducers'
import App from './views/components/App'

// let store = createStore(appReducers)

render(
//  <Provider store={store}>
    <App />,
//  </Provider>,
  document.getElementById('root')
)
