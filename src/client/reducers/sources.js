// Reducers for Sources
const initialState = { srcFilter: 'hacker-news', sources: [] }

const setSources = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SRC_FILTER':
    return Object.assign({}, state, {
      srcFilter: action.srcFilter
    })
    default:
      return state
  }
}

export default setSources
