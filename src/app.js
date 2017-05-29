// app.js in src = Entry Point/Initial Render
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './client/reducers'
import Main from './client/components/Main'

import './client/scss/index.scss'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(appReducers, preloadedState)

// Initial Render: ReactDOM.Render()
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('content')
)
