// app.js in src = Entry Point/Initial Render
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import cookie from 'react-cookies'
import reducers from './reducers'
import { AUTH_USER, setCatFilter, setSrcFilter } from './actions'
import Main from './components/Main'

// This is the grommet css link, change the file referenced below to use a different theme/style
import './scss/index.scss'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers, preloadedState)

// Check for auth cookie and update store/state if a valid token is present
const token = cookie.load('token')
const user = cookie.load('user')

if (token) {
  store.dispatch(setCatFilter(user.category))
  store.dispatch(setSrcFilter(user.source))
  store.dispatch({ type: AUTH_USER, email: user.email })
}

// Initial Render: ReactDOM.Render()
render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('content')
)
