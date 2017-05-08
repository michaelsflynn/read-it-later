// Controller to Handle Initial server Render
// Uses Redux Store to provide initial data

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import appReducers from '../views/reducers'
import App from '../views/components/App'

exports.get = (req, res) => {
    // Create a new Redux store instance
  const store = createStore(appReducers)

    // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
    )

    // Grab the initial state from our Redux store
  const preloadedState = store.getState()

    // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage (html, preloadedState) {
  return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="bootstrap.min.css" />
        <title>Articly - News Your Way</title>
      </head>
        <body>
          <div id="root">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
          <script src="app.bundle.js"></script>
        </body>
      </html>
      `
}
