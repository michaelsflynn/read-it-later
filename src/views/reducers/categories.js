// Reducers for Categories

const setCategory = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAT_FILTER':
      return Object.assign({}, state, {
        catFilter: action.catFilter
      })
    default:
      return state
  }
}

export default setCategory
