// Reducers index.js to combine Reducers

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import setCategory from './categories'
import setSources from './sources'
import setArticles from './articles'
import setAuth from './authentication'

const reducers = combineReducers({
  form,
  setCategory,
  setSources,
  setArticles,
  setAuth
})

export default reducers
