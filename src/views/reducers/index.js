// Reducers index.js to combine Reducers

import { combineReducers } from 'redux'
import setCategory from './categories'
import setSources from './sources'

const appReducers = combineReducers({
  setCategory,
  setSources
})

export default appReducers
