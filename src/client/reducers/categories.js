// Reducers for Categories
const initialState = {catFilter: 'general', categories: ['general']}

const setCategory = (state = initialState, action) => {
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
