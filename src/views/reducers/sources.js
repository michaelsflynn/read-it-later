// Reducers for Sources

const setSources = (state = [], action) => {
  switch (action.type) {
    case 'SET_SRC_FILTER':
      return state.map(src =>
        setSelectedSources(src, action)
      )
    default:
      return state
  }
}

export default setSources

const setSelectedSources = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SRC_FILTER':
      if (state.id === action.srcFilter)
        return Object.assign({}, state, {
          fetchdata: true
        })
        return state
    default:
      return state
  }
}
