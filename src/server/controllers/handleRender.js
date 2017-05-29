// Controller to Handle Initial server Render
// Uses Redux Store to provide initial data

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import appReducers from '../../client/reducers'
import Main from '../../client/components/Main'
import Categories from '../models/categories'
import Sources from '../models/sources'

exports.get = (req, res) => {
  // Get Initial State for the Store
  setInitialState(['setCategory', 'setSources'])
  .then((initialState) => {
    // Create a new Redux store instance
    const store = createStore(appReducers, initialState)

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <Main />
      </Provider>
      )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
  })
  .catch(err => err)
}

// ************************************************************
// Helper Functions to Render Page and Setting Initial State
// ************************************************************

function renderFullPage (html, preloadedState) {
  return `
  <!DOCTYPE html>
  <html lang="en-US">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta charset="UTF-8">
    <title>Articly - News Your Way</title>
    <meta name="description" content="" />
    <meta name="fragment" content="!" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" type="image/png" href="/img/shortcut-icon.png" />
    <link rel="apple-touch-icon" sizes="196x196" type="image/png" href="/img/mobile-app-icon.png">
    <link rel="stylesheet" type="text/css" href="/index.css">
    <style>
      body.loading {margin: 0px; width: 100vw; height: 100vh;
        background-image: radial-gradient(circle at 50% 15%, #fff, #fff 30%, #ccc);
      }
      body.loading #content {
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 0px;
      }
      body.loading #logo {
        position: absolute; display: block; width: 140px; height: 140px;
        top: calc(50vh - 70px); left: calc(50vw - 70px);
      }
      div.t {
        display: inline-block;
        box-sizing: border-box;
        margin: 0px;
        width: 10vw;
        height: 10vh;
        background-color: #e2e2e2;
      }
      div.t.on {
        -webkit-animation: pulse 3s infinite linear alternate;
        -moz-animation: pulse 3s infinite linear alternate;
        animation: pulse 3s infinite linear alternate;
      }
      div.t.on:hover {
        -webkit-animation: none;
        background-color: #ccc;
      }
      @-webkit-keyframes pulse {
        100% { background-color: #fff; }
      }
      @-moz-keyframes pulse {
        100% { background-color: #fff; }
      }
      @keyframes pulse {
        100% { background-color: #fff; }
    </style>
  </head>
  <body class="loading">
    <div id="content" tabindex="-1" style="outline: none;">
      ${html}
    </div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/app.bundle.js"></script>
  </body>
  </html>
 `
}

function setInitialState (arr) {
  return new Promise(
    function (resolve, reject) {
      const output = []
      Categories.find().select('id category')
      .then(catData => {
        output.push(catData)
      }) // then
      .then(() => {
        return Sources.find().select('id name category description url').exec()
      }) // then
      .then(srcData => {
        output.push(srcData)
        const initialState = {
          setCategory: {catFilter: 'technology', categories: output[0]},
          setSources: {srcFilter: 'hacker-news', sources: output[1]},
          setArticles: {showArticles: false, articles: []}
        }
        resolve(initialState)
      }) // then
      .catch(err => reject(err))
  }) // promise
}
