// Reducers index.js to combine Reducers

import { combineReducers } from 'redux'
import setCategory from './categories'
import setSources from './sources'
import setArticles from './articles'

const appReducers = combineReducers({
  setCategory,
  setSources,
  setArticles
})

export default appReducers
